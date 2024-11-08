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
  /* gap: 2em; */
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

export const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  /* background-color: green; */
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;


export const SearchInput = styled.input`
   width: 100%;
  padding: 10px 100px 10px 40px; // Increased right padding to accommodate the button
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primaryOrange};
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: ${props => props.theme.colors.primaryOrangeDark};
  }
`;

export const SearchResults = styled.div`
 position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 5px;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;


export const SearchResultItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.backgroundHover};
  }
`;

export const NoResultsMessage = styled.div`
  padding: 10px;
  color: ${props => props.theme.colors.textSecondary};
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

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const FilterButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => {
    if (props.isActive) {
      switch(props.filterType) {
        case 'accepted':
          return 'background-color: #10B981; color: white;';
        case 'pending':
          return 'background-color: #cf4018; color: white;';
        default:
          return 'background-color: #3B82F6; color: white;';
      }
    }
    return 'background-color: #E5E7EB; color: #374151;';
  }}

  &:hover {
    opacity: 0.9;
  }
`;

export const ConnectionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContent = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
`;

export const PopupTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 15px;
`;

export const PopupText = styled.p`
  margin-bottom: 20px;
`;

export const PopupButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const PopupButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

export const ConfirmButton = styled(PopupButton)`
  background-color: ${props => props.theme.colors.primaryOrange};
  color: white;

  &:hover {
    background-color: ${props => props.theme.colors.primaryOrangeDark};
  }
`;

export const CancelButton = styled(PopupButton)`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    background-color: ${props => props.theme.colors.backgroundHover};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
`;

