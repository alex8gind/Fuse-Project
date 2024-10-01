import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 95%;
  min-height: calc(86vh - 100px);
  margin: 105px auto;
  background-color: ${props => props.theme.colors.navigation_bg};
  color: ${props => props.theme.colors.text};
  border-radius: 20px;
  padding: 1em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2em;
  overflow-y: auto;
  /* background-color: purple; */

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 2em;
    max-width: 85%;
    min-height: 86vh;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 3em;
    margin: 30px auto;
  }
`;


export const UserPhoto = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 9em;
  width: 9em;
  border: 2px solid white;
  border-radius: 100vh;
  outline: 2px solid ${props => props.theme.colors.navigation_button};
  margin: 0;
  background-color: ${props => props.theme.colors.background};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    height: 12em;
    width: 12em;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    height: 15em;
    width: 15em;
  }
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em .3em;
  /* background-color: blue; */

`;


export const Field = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1em 2em;
  /* background-color: yellow; */
`;


export const EditField = styled.input`
  width: 100%; 
  flex-grow: 1;
  font-size: 1rem;
  padding: 0.5em;
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.icons};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  /* background-color: yellowgreen; */

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.1rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.2rem;
  }
`;

export const FieldIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: .5em;
  color: ${props => props.theme.colors.icons};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    /* margin-right: 20px; */
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    /* margin-right: 25px; */
  }
`;

export const GenderIcon = styled.img`
  width: 1.5em;
  height: 1.5em;
  filter: invert(34%) sepia(0%) saturate(1%) hue-rotate(157deg) brightness(94%) contrast(87%);
`;

export const PasswordField = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  /* background-color: yellow; */
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.icons};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.3em;
  width: 100%;
  padding: 1em .3em;
  /* background-color: blue; */
`;


export const Button = styled.button`
  background-color: ${props => props.theme.colors.primaryOrange};
  color: ${props => props.theme.colors.navigation_bg};
  border: none;
  border-radius: 3vh;
  padding: 0.6em 2em;
  font-size: 1rem;
  cursor: pointer;


  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.2rem;
    padding: 0.8em 2em;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.3rem;
    padding: 0.9em 2.3em;
  }
`;

export const PhotoUploadButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
 
  svg {
    margin-right: 0.5em;
  }
`;

export const SaveButton = styled(Button)`
  /* background-color: ${props => props.theme.colors.primaryOrange}; */
`;

export const CancelButton = styled(Button)`
  /* background-color: ${props => props.theme.colors.error}; */

`;

