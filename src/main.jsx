import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import ContextProvider from './contexts/context.provider.jsx'
import UserProvider from './contexts/user.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ContextProvider providers={[UserProvider]}> */}
    <Router>
      <App />
    </Router>
    {/* </ContextProvider> */}
  </React.StrictMode>
)