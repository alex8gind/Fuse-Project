import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';


function App() {
    return (
        <div>
        <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&display=swap" rel="stylesheet" />
        </Helmet>
         <ThemeProvider theme={theme}>
            <GlobalStyle />
            <div className='App'>
                <Header />
                <Outlet />
                <Navigation />
            </div>
        </ThemeProvider>
        </div>
    )
}

export default App;