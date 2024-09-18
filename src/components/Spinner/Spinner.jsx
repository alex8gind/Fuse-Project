import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  animation: ${spin} 1s linear infinite;
`;

export default function Spinner() {

  return (
    <SpinnerWrapper />
  )
}