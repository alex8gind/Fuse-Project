import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { Camera, ChevronLeft, Check, Upload } from 'lucide-react';
import Logo from '../../../components/Logo.jsx';
import {
  PageContainer, Header, BackButton, Title, Subtitle, StepList, 
  StepItem, StepIcon, StepText, StepAction, NextButton, WhyLink,
  StepNumber, StepContent
} from './IdVerification.style.jsx';

const IdVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [steps, setSteps] = useState([
    { id: 1, name: 'Photo ID', completed: false, icon: Camera },
    { id: 2, name: 'Take a selfie', completed: false, icon: Camera },
  ]);

// Update steps based on location state
useEffect(() => {
  // Keep track of both steps' completed states
  setSteps(prevSteps => {
    const newSteps = [...prevSteps];
    
    // Preserve step 1 completion status
    if (location.state?.step1Completed) {
      newSteps[0].completed = true;
    }
    
    // Preserve step 2 completion status
    if (location.state?.step2Completed) {
      newSteps[1].completed = true;
    }
    
    return newSteps;
  });
}, [location.state]);

const handleStepClick = (stepId) => {
  if (stepId === 1 && !steps[0].completed) {
    navigate('/choose-id-option');
  } else if (stepId === 2 && steps[0].completed && !steps[1].completed) {
    navigate('/selfie-check');
  }
};

  const allStepsCompleted = steps.every(step => step.completed);

  const handleNextStep = () => {
    if (allStepsCompleted) {
      navigate('/identity-checking');
    }
  };

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
            $clickable={(step.id === 1 && !steps[0].completed) || (step.id === 2 && steps[0].completed && !steps[1].completed)}
            $completed={step.completed}
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
      <NextButton 
        disabled={!allStepsCompleted} 
        onClick={handleNextStep}
      >
        Next step
      </NextButton>
    </PageContainer>
  );
};

export default IdVerification;