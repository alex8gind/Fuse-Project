import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const BackButton = styled(Link)`
  color: #000;
  text-decoration: none;
  font-size: 1.5rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.75rem;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const InstructionText = styled.p`
  color: #4b5563;
  margin: 0;
  font-size: 0.9rem;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;


export const InstructionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
`;

export const InstructionItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const InstructionIcon = styled.span`
  margin-right: 1rem;
  color: #6366f1;
  flex-shrink: 0;
`;

export const ContinueButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4f46e5;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #4f46e5;
  }

  &:disabled {
    background-color: #a5a6f6;
    cursor: not-allowed;
  }

  svg {
    margin-right: 0.5rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }
`;

export const OrDivider = styled.div`
  display: flex;
  align-items: center;
  color: #6b7280;
  margin: 0.5rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #d1d5db;
  }

  &::before {
    margin-right: 0.5rem;
  }

  &::after {
    margin-left: 0.5rem;
  }
`;

export const LoadingBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e5e7eb;
  border-radius: 2px;
  margin-bottom: 0.5rem;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    width: ${props => props.$progress}%;
    height: 100%;
    background-color: #6366f1;
    transition: width 0.3s ease;
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const WebcamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CaptureButton = styled(ActionButton)`
  background-color: #10B981;
  margin-top: 1rem;
  &:hover {
    background-color: #059669;
  }
`;
