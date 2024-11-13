import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux'; 
import { store } from './store/store';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import { router } from './routes/main.routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>  
    <Provider store={store}>  
        <ThemeProvider theme={theme}>
            <HelmetProvider>
              <GlobalStyle />
              <RouterProvider router={router} />
            </HelmetProvider>
        </ThemeProvider>
    </Provider>
  // </React.StrictMode>
)