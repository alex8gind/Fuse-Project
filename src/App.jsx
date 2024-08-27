import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Navigation from './components/Navigation'

function App() {
    return (
        <div className='App'>
          <Header />
          <Outlet />
          <Navigation />
        </div>
    )
}

export default App;