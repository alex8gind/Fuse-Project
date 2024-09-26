import { createGlobalStyle } from 'styled-components';
import CustomFont from '../assets/fonts/aqua.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'aqua';
    src: url(${CustomFont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {   
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch; 
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.colors.background};
    /* background-color: purple; */
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.main};
  }
`;

export default GlobalStyle;