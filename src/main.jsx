import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import ContextProvider from './contexts/context.provider.jsx'
import UserProvider from './contexts/user.context.jsx'
import { router } from './routes/main.routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
    <RouterProvider router={router} />  
  </React.StrictMode>
)