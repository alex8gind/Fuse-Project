import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 12px 12px;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  gap: 12px;
  /* background-color: yellow; */
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 80px 40px 40px;
    gap: 16px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 100px 60px 60px;
  }
`;

export const ContentWrapper = styled.div`
  background-color: ${props => props.theme.colors.navigation_bg};
  border-radius: 16px;
  padding: 4em 2em;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-out;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 24px;
    max-width: 90%;
    border-radius: 20px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 32px;
    max-width: 1200px;
  }
`;

export const ConnectionsHeader = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  padding-bottom: 1em;
  font-size: 2rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 24px;
  }
`;

export const SearchContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 16px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 600px;
    margin: 0 auto 32px;
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 90px 10px 40px;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  font-size: 0.95rem;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primaryOrange};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryOrange}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
    padding: 14px 120px 14px 48px;
    border-radius: 12px;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  transition: color 0.3s ease;

  ${SearchInputWrapper}:focus-within & {
    color: ${props => props.theme.colors.primaryOrange};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    left: 12px;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  padding: 6px 12px;
  background-color: ${props => props.theme.colors.primaryOrange};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryOrangeDark};
    transform: translateY(-50%) scale(1.02);
  }

  &:active {
    transform: translateY(-50%) scale(0.98);
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    right: 6px;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
  }
`;

export const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 250px;
  overflow-y: auto;
  z-index: 10;
  animation: ${slideUp} 0.2s ease-out;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    top: calc(100% + 8px);
    max-height: 300px;
    border-radius: 12px;
  }
`;

export const SearchResultItem = styled.div`
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  font-size: 0.9rem;
  
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${props => props.theme.colors.primaryOrange}10;
    color: ${props => props.theme.colors.primaryOrange};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 12px 16px;
    font-size: 1rem;
  }
`;

export const NoResultsMessage = styled.div`
  padding: 12px;
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-style: italic;
  font-size: 0.9rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 16px;
    font-size: 1rem;
  }
`;

export const FilterContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  padding: 0 4px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 24px;
  }
`;

export const FilterButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
  margin-top: 8px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-top: 12px;
  }
`;

export const FilterButton = styled.button`
  padding: 8px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.85rem;
  
  ${props => {
    const baseColor = props.isActive ? 
      props.theme.colors.primaryOrange : 
      props.theme.colors.background;
    
    return `
      background-color: ${baseColor};
      color: ${props.isActive ? 'white' : props.theme.colors.text};
      border: 2px solid ${props.theme.colors.primaryOrange};
    `;
  }}

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 12px;
    font-size: 1rem;
    border-radius: 10px;
  }
`;

export const ConnectionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 12px 4px;
  animation: ${fadeIn} 0.3s ease-out;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    gap: 16px;
    padding: 24px 4px;
  }
`;

export const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
  padding: 12px 0;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.8rem;
    padding: 16px 0;
  }
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 12px;
  animation: ${fadeIn} 0.2s ease-out;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 16px;
  }
`;

export const PopupContent = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 20px;
  border-radius: 12px;
  width: 95%;
  max-width: 320px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.3s ease-out;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 32px;
    max-width: 400px;
    border-radius: 16px;
  }
`;

export const PopupTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  font-weight: 600;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
    margin: 0 0 16px 0;
  }
`;

export const PopupText = styled.p`
  margin: 0 0 20px 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.4;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0 0 24px 0;
  }
`;

export const PopupButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    gap: 12px;
  }
`;

const BaseButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 12px 24px;
    font-size: 1rem;
    border-radius: 8px;
  }
`;

export const ConfirmButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.primaryOrange};
  color: white;
  border: none;

  &:hover {
    background-color: ${props => props.theme.colors.primaryOrangeDark};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const CancelButton = styled(BaseButton)`
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.border};

  &:hover {
    background-color: ${props => props.theme.colors.backgroundHover};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.backgroundHover};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    top: 16px;
    right: 16px;
  }
`;