import styled from 'styled-components';
import { ChevronRight } from 'lucide-react';

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
  gap: 20px;
  overflow-y: auto;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 85%;
    padding: 2em;
    margin: 30px auto;
  }
`;

export const Title = styled.h2`
  margin: 0;
  padding: 1em;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.navigation_clicked_button};
`;

export const SettingsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 65%;
    padding: 1em;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    width: 45%;
    padding: 1em;
  }
`;

export const SettingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.navigation_bg};
  }
`;

export const SettingIcon = styled.div`
  margin-right: 15px;
  color: ${props => props.theme.colors.icons};
`;

export const SettingText = styled.span`
  font-size: 1rem;
  flex-grow: 1;
`;

export const ChevronIcon = styled(ChevronRight)`
  color: ${props => props.theme.colors.icons};
`;

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
`;