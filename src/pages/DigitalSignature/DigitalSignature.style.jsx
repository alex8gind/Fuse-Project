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
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;