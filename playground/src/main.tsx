import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import routes from '~pages'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={createBrowserRouter(routes)} />,
)
