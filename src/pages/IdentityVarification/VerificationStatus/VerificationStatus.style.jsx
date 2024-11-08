import styled from 'styled-components';

export const StatusContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.header};
  border-radius: 8px;
`;

export const StatusTitle = styled.h3`
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.aqua};
  margin-bottom: 0.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.25rem;
  }
`;

export const StatusSubtitle = styled.p`
  color: ${props => props.theme.colors.icons};
  font-size: 0.75rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.main};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.875rem;
  }
`;

export const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.navigation_bg};
  opacity: ${props => props.isComplete && !props.isSelected ? 0.5 : 1};
  transition: all 0.2s ease;

  ${props => !props.isComplete && `
    &:hover {
      background-color: ${props.theme.colors.header};
    }
  `}
`;

export const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.isSelected 
    ? props.theme.colors.primaryOrange
    : props.theme.colors.icons};
  transition: background-color 0.3s ease;
`;

export const StatusText = styled.span`
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
  font-family: ${props => props.theme.fonts.main};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;
