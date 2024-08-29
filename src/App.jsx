import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Navigation from './components/Navigation'
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';


function App() {
    return (
        <div className='App'>
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