// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import styled from 'styled-components';

// const BackgroundContainer = styled.div`
//   width: 95%;
//   min-height: calc(86vh - 100px);
//   margin: 105px auto;
//   background-color: ${props => props.theme.colors.navigation_bg};
//   color: ${props => props.theme.colors.text};
//   border-radius: 20px;
//   padding: 1em;
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 2em;
//   overflow-y: auto;

//   @media (min-width: ${props => props.theme.breakpoints.md}) {
//     padding: 2em;
//     margin: 30px auto;
//     max-width: 85%;
//     min-height: 86vh;
//   }

//   @media (min-width: ${props => props.theme.breakpoints.lg}) {
//     padding: 3em;
//     margin: 30px auto;
//     max-width: 85%;
//     min-height: 86vh;
//   }
// `;

// const Background = () => {
//   return (
//     <>
//       {/* Your header, navigation, etc. */}
//       <BackgroundContainer>
//         <Outlet />
//       </BackgroundContainer>
//       {/* Your footer, etc. */}
//     </>
//   );
// };

// export default Background;