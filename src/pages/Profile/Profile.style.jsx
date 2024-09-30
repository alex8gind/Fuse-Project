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
  align-items: center;
  gap: 2em;
  overflow-y: auto;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 2em;
    margin: 30px auto;
    max-width: 85%;
    min-height: 86vh;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 3em;
    margin: 30px auto;
    max-width: 85%;
    min-height: 86vh;
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

export const EditButton = styled.button`
  background-color: ${props => props.theme.colors.primaryOrange};
  color: ${props => props.theme.colors.navigation_bg};
  border: none;
  border-radius: 4vh;
  padding: 0.5em 2.5em;
  font-size: 1.1rem;
  cursor: pointer;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.2rem;
    padding: 0.6em 3em;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.3rem;
    padding: 0.7em 3.6em;
  }
`;

export const FieldsContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    gap: 20px;
    width: 65%;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    gap: 20px;
    width: 40%;
  }
`;

export const Field = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.icons};


  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 15px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 20px;
  }
`;

export const FieldIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: ${props => props.theme.colors.icons};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-right: 20px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    margin-right: 25px;
  }
`;

export const GenderIcon = styled.img`
  width: 1.5em;
  height: 1.5em;
  filter: invert(34%) sepia(0%) saturate(1%) hue-rotate(157deg) brightness(94%) contrast(87%);
`;

export const FieldContent = styled.span`
  flex-grow: 1;
  font-size: 1rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.1rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.2rem;
  }
`;

export const PasswordToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.icons};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: transparent;
  color: ${props => props.theme.colors.primaryOrange};
  border: none;
  padding: 1em;
  font-size: 1rem;
  cursor: pointer;
  margin-top: auto;

  svg {
    margin-right: 10px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.1rem;
    padding: 1.3em;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.2rem;
    padding: 1.5em;
  }
`;