import styled from 'styled-components';

export const UploaderContainer = styled.div`
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
    margin: 30px auto;
    max-width: 85%;
    min-height: 86vh;
    padding: 2em;
  }
`;


export const DropZone = styled.div`
/* background-color: green; */
  display: block;
  border: 2px dashed ${props => props.theme.colors.primaryOrange};
  border-radius: 10px;
  padding: 2.5em;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 4em;
  }
`;


export const UploadIcon = styled.div`
  color: ${props => props.theme.colors.primaryOrange};
  padding: 1em;
  padding-bottom: 0.2em;
`;

export const DropText = styled.p`
  color: ${props => props.theme.colors.text};
  padding-bottom: .3em;
  font-size: 1.2em;
`;

export const BrowseButton = styled.button`
  background-color: ${props => props.theme.colors.primaryOrange};
  color: ${props => props.theme.colors.navigation_bg};
  border: none;
  padding: .5em 1em;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryOrange}dd;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.3em;
  }
`;

export const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

export const FileItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.navigation_bg};
  padding: .3em;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const FileName = styled.span`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  flex-grow: 1;
  padding: .3em;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

export const FileSize = styled.span`
  color: ${props => props.theme.colors.icons};
  font-size: 0.8rem;
  padding: .3em;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.9rem;
  }
`;

export const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.colors.error};
  cursor: pointer;
  padding: .3em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProgressBar = styled.div`
  width: 100px;
  height: 5px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-inline: 10px;

  &::after {
    content: '';
    display: block;
    width: ${props => props.progress}%;
    height: 100%;
    background-color: ${props => props.theme.colors.primaryOrange};
    transition: width 0.3s ease;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 150px;
  }
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
  background-color: ${props => props.theme.colors.navigation_bg};
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  width: 300px;
`;

export const PopupMessage = styled.p`
  text-align: center;
  margin-bottom: 1.5em;
  color: ${props => props.theme.colors.text};
`;

export const PopupButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
`;

export const PopupButton = styled.button`
  padding: 0.5em 1.5em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  background-color: ${props => props.$delete ? props.theme.colors.error : props.theme.colors.primaryOrange};
  color: white;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const SuccessPopupContent = styled(PopupContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;
`;

export const SuccessMessage = styled(PopupMessage)`
  color: ${props => props.theme.colors.primaryOrange};
  font-weight: 500;
`;

export const SuccessButton = styled(PopupButton)`
  background-color: ${props => props.theme.colors.primaryOrange};
  min-width: 100px;
`;