import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import router from './router/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
<Provider store={store}>
  <RouterProvider router={router} />
</Provider>
)
