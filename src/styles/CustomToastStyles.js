import { createGlobalStyle } from 'styled-components';

export const CustomToastStyles = createGlobalStyle`
  .custom-toast-container {
    font-size: 14px;
    background-color: blue;
    
    @media (min-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 16px;
    }

    .Toastify__toast {
      padding: 10px;
      background-color: red;
      
      @media (min-width: ${props => props.theme.breakpoints.sm}) {
        padding: 15px;
      }
    }

    .Toastify__toast-icon {
      width: 20px;
      height: 20px;
      background-color: purple;
      
      @media (min-width: ${props => props.theme.breakpoints.sm}) {
        width: 24px;
        height: 24px;
      }
    }

    .Toastify__close-button {
      font-size: 16px;
      background-color: yellow;
      
      @media (min-width: ${props => props.theme.breakpoints.sm}) {
        font-size: 20px;
      }
    }
  }
`;