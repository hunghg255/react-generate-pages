import type { Plugin } from 'vite'
import { Route } from './route'

function pagesPlugin(baseDir: string = 'src/pages'): Plugin {
  const virtualModuleId = '~pages'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`
  baseDir = baseDir.replace(/^\/+|\/+$/g, '')
  return {
    enforce: 'pre',
    name: 'vite-plugin-react-pages', // required, will show up in warnings and errors
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const route = new Route(baseDir)
        const data = route.getRouteData()

        return `export default [${data}]`
      }
    },
    configureServer({ watcher, moduleGraph }) {
      const reloadVirtualModule = (moduleId: string) => {
        const module = moduleGraph.getModuleById(moduleId)
        if (module) {
          moduleGraph.invalidateModule(module)
          watcher.emit('change', moduleId)
        }
      }
      watcher.on('add', () => {
        reloadVirtualModule(resolvedVirtualModuleId)
      })
    },
  }
}

export default pagesPlugin
