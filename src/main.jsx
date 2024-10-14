import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux'; // Add this import
import { store } from './store/store'; // Add this import
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import { router } from './routes/main.routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>  
    <Provider store={store}> {/* Add this wrapper */}
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  // </React.StrictMode>
)