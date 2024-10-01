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
  /* background-color: purple; */

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

export const SearchInput = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 5px;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};

  &::placeholder {
    color: ${props => props.theme.colors.navigation_button};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 65%;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    width: 40%;
  }
`;

export const ConnectionsList = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
  /* background-color: green; */

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    gap: 20px;
    width: 65%;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    gap: 20px;
    width: 40%;
  }
`;

