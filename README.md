<p align="center">
<a href="https://www.npmjs.com/package/react-generate-pages" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/solar:routing-line-duotone.svg?color=%238a7aff" alt="logo" width='100'/></a>
</p>

<p align="center">
  A plugin generates pages for React applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-generate-pages" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/react-generate-pages.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/react-generate-pages" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/react-generate-pages.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=react-generate-pages" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/react-generate-pages" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/react-generate-pages/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/react-generate-pages/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/react-generate-pages" alt="License" /></a>
</p>

## 📦 Installation

```bash
npm install react-generate-pages -D
```

## 🦄 Usage

### Configuration Vite

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import pages from 'react-generate-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pages()],
})
```

## Overview

By default a page is a
[React Router lazy component](https://reactrouter.com/en/main/route/lazy)
exported from a `.tsx`, `.jsx`, `.ts`, `.js` file in the `src/pages` directory.

You can access the generated routes by importing the `~pages` module in your
application.

```tsx
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import routes from '~pages'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={createBrowserRouter(routes)} />
)
```

**Type**

```ts
// vite-env.d.ts
/// <reference types="react-generate-pages/client" />
```

## Route Style

- `layout.{tsx,jsx,ts,js}` => layout page
- `page.{tsx,jsx,ts,js}` => index page
- `404.{tsx,jsx,ts,js}` => not found page
- `_lib` => private folder (underscore prefix)
- `(layout)` =>
  [Layout Routes](https://reactrouter.com/en/main/route/route#layout-routes)
- `[id]` => `:id`
  [Dynamic Segments](https://reactrouter.com/en/main/route/route#dynamic-segments)
- `[[id]]` => `:id?`
  [Optional Segments](https://reactrouter.com/en/main/route/route#optional-segments)
- `[...slug]` => `*`
  [Splats](https://reactrouter.com/en/main/route/route#splats)
- `{task}` => `task?`
  [Optional Static Segments](https://reactrouter.com/en/main/route/route#dynamic-segments)

**Example:**

[exmaple](/playground)

```bash
# folder structure
src/pages/
├── (dashboard)
│   ├── [...slug]
│   │   └── page.tsx
│   ├── posts
│   │   ├── [id]
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── about
│   └── [[lang]]
│       └── page.tsx
├── 404.tsx
├── layout.tsx
└── page.tsx
```
