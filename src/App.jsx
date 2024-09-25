import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&display=swap" rel="stylesheet" />
                </Helmet>
                <div className='App'>
                    <Header />
                    <Outlet />
                    <Navigation />
                </div>
            </div>
        </HelmetProvider>
    )
}

export default App;

