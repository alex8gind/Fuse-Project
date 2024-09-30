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