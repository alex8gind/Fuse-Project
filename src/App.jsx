import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
// import Background from './components/Background'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { use } from 'framer-motion/client'



function App() {
    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&display=swap" rel="stylesheet" />
                </Helmet>
                <div className='App'>
                    <Header />
                    {/* <Background> */}
                        <Outlet />
                    {/* </Background> */}
                    <Navigation />
                </div>
            </div>
        </HelmetProvider>
    )
}

export default App;

