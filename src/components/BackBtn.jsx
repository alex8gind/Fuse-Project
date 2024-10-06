import styled from 'styled-components';
import { ChevronLeft} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = styled.button`
  align-self: flex-start;
  padding: .1rem 2rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

export default function BackBtn() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

 return (
    <BackButton onClick={handleClick}>
      <ChevronLeft />
    </BackButton>
  );
}