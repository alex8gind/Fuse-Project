import styled from 'styled-components';
import { Cloud, TreePine } from 'lucide-react';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 1rem;
`;

export const Content = styled.div`
  text-align: center;
`;

export const SceneContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

export const CloudIcon = styled(Cloud)`
  color: #d1d5db;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const SceneElements = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

export const Dinosaur = styled.div`
  font-size: 2rem;
  margin-right: 2rem;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 3rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 4rem;
  }
`;

export const TreeIcon = styled(TreePine)`
  color: #059669;
`;

export const Ground = styled.div`
  border-top: 1px solid #d1d5db;
  margin-top: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.75rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

export const Suggestion = styled.p`
  color: #4b5563;
  margin-bottom: 2rem;
`;

export const Action = styled.p`
  font-size: 1.25rem;
  font-weight: 600;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }
`;