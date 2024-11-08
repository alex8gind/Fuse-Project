import styled from 'styled-components';


export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background-color: ${props => props.theme.colors.navigation_bg};
  box-sizing: border-box;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 400px;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 2rem;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.navigation_button};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:active {
    color: ${props => props.theme.colors.navigation_clicked_button};
  }
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  text-align: center;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.aqua};
  margin: 0;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    gap: 2rem;
  }
`;

export const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primaryOrange};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 64px;
    height: 64px;
  }
`;

export const MessageContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.5rem;
`;

export const Heading = styled.h3`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.main};
  margin: 0;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.25rem;
  }
`;

export const Description = styled.p`
  color: ${props => props.theme.colors.icons};
  font-family: ${props => props.theme.fonts.main};
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.4;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

export const NotificationBox = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 1.25rem;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 1.5rem;
  }
`;

export const NotificationText = styled.p`
  color: ${props => props.theme.colors.icons};
  font-family: ${props => props.theme.fonts.main};
  font-size: 0.875rem;
  margin: 0;
  margin-bottom: 0.5rem;
  line-height: 1.4;

  &:last-child {
    margin-bottom: 0;
  }
`;