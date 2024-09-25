import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ChevronLeft, Check, Upload } from 'lucide-react';
import Logo from '../../../components/Logo/Logo.jsx';
import {
  PageContainer, Header, BackButton, Title, Subtitle, StepList, 
  StepItem, StepIcon, StepText, StepAction, NextButton, WhyLink,
  StepNumber, StepContent
} from './IdVerification.style.jsx';

const IdVerification = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([
    { id: 1, name: 'Photo ID', completed: false, icon: Camera },
    { id: 2, name: 'Take a selfie', completed: false, icon: Camera },
  ]);

  const handleStepClick = (stepId) => {
    if (stepId === 1) {
      navigate('/choose-id-option');
    } else if (stepId === 2 && steps[0].completed) {
      navigate('/selfie-check');
    }
  };

  const allStepsCompleted = steps.every(step => step.completed);

  return (
    <PageContainer>
      <Header>
        <BackButton to="/"><ChevronLeft /></BackButton>
        <Logo />
      </Header>
      <Title>Submit Documents</Title>
      <Subtitle>We need to verify your information. Please submit the documents below to process your application.</Subtitle>
      <StepList>
        {steps.map((step) => (
          <StepItem 
            key={step.id} 
            onClick={() => handleStepClick(step.id)}
            $clickable={step.id === 1 || (step.id === 2 && steps[0].completed)}
          >
            <StepContent>
              <StepNumber>Step {step.id}</StepNumber>
              <StepIcon $completed={step.completed}>
                {step.completed ? <Check /> : <step.icon />}
              </StepIcon>
              <StepText>{step.name}</StepText>
            </StepContent>
            <StepAction>
              <Upload />
            </StepAction>
          </StepItem>
        ))}
      </StepList>
      <NextButton disabled={!allStepsCompleted}>Next step</NextButton>
      <WhyLink to="/why-needed">Why is this needed?</WhyLink>
    </PageContainer>
  );
};

export default IdVerification;