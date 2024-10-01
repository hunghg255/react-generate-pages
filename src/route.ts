import fs from 'node:fs'
import path from 'node:path/posix'

export class RouteData {
  path?: string
  lazy?: string
  index?: boolean
  children?: RouteData[]

  constructor(options: {
    path?: string
    lazy?: string
    index?: boolean
    children?: RouteData[]
  }) {
    const { path, lazy, index, children } = options
    this.path = path
    this.lazy = lazy
    this.index = index
    this.children = children
  }

  toString() {
    const res: string[] = []
    res.push('{')
    if (this.path) {
      res.push(`path: "${this.path}",`)
    }
    if (this.lazy) {
      res.push(`lazy: () => import("${this.lazy}"),`)
    }
    if (this.index) {
      res.push(`index: ${this.index},`)
    }
    if (this.children) {
      res.push(`children: [${this.children}],`)
    }
    res.push('}')
    return res.join('\n')
  }
}

export class Route {
  path: string
  page?: string
  layout?: string
  notFound?: string
  children: Route[] = []

  get isPathless(): boolean {
    return /^\(.+\)$/.test(this.path)
  }

  constructor(baseDir: string, pathName: string = '/') {
    this.path = pathName
    const dirents = fs.readdirSync(baseDir, {
      withFileTypes: true,
    })
    for (const dirent of dirents) {
      const filePath = path.join(baseDir, dirent.name)
      if (dirent.isDirectory() && !dirent.name.startsWith('_')) {
        const pathName = dirent.name.trim().toLowerCase()
          .replace(/^\[(\.{3}.+)\]$/, '*')
          .replace(/^\[\[(.+)\]\]$/, ':$1?')
          .replace(/^\[(.+)\]$/, ':$1')
          .replace(/^\{(.+)\}$/, '$1?')

        this.children.push(new Route(filePath, pathName))
      }
      else if (/^layout\./i.test(dirent.name)) {
        this.layout = `/${filePath}`
      }
      else if (/^page\./i.test(dirent.name)) {
        this.page = `/${filePath}`
      }
      else if (/^404\./.test(dirent.name)) {
        this.notFound = `/${filePath}`
      }
    }
  }

  getRouteData(): RouteData {
    if (this.path === '*') {
      const data = new RouteData({
        path: this.path,
        lazy: this.page,
      })
      return data
    }

    const children = this.children.map(item => item.getRouteData())
    if (this.page) {
      children.push(new RouteData({
        index: true,
        lazy: this.page,
      }))
    }
    if (this.notFound) {
      children.push(new RouteData({
        path: '*',
        lazy: this.notFound,
      }))
    }
    const data = new RouteData({
      path: this.isPathless ? '' : this.path,
      lazy: this.layout,
      children,
    })
    return data
  }
}
