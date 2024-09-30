import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 95%;
  min-height: calc(86vh - 100px); // Adjust 100px to match your Navigation height
  margin: 105px auto;
  background-color: ${props => props.theme.colors.navigation_bg};
  color: ${props => props.theme.colors.text};
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 3em;
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


export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.navigation_button};
  padding-inline: 1em;
  margin: 0;
  /* background-color: blue; */

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
  }
`;

export const DocumentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  margin-bottom: .5em;
  background-color: ${props => props.theme.colors.primaryOrange};
  color: ${props => props.theme.colors.navigation_bg};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    margin-right: 0.5rem;
    font-size: 1.5rem;
  }

  &:hover {
    background-color: ${props => props.theme.colors.primaryOrange}dd;
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    /* height: 200px; */
    font-size: 1.2rem;
    padding: 2rem 1rem;

    svg {
      margin-right: 0;
      margin-bottom: 1rem;
      font-size: 3rem;
    }
  }
`;