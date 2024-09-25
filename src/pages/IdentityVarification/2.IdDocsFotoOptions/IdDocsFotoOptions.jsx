import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X, CreditCard, FileText, BookOpen } from 'lucide-react';
import {
  Container,
  Header,
  BackButton,
  CloseButton,
  IconWrapper,
  Title,
  Subtitle,
  OptionList,
  OptionButton,
  OptionIcon
} from './IdDocsFotoOptions.style';

const IdDocsFotoOptions = () => {
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    // Handle the selected option
    console.log(`Selected option: ${option}`);
    // Navigate to the CaptureInstructions page
    navigate('/capture-instructions', { state: { documentType: 'document', idType: option } });
  };

  return (
    <Container>
      <Header>
        <BackButton to="/id-verification"><ChevronLeft /></BackButton>
        <CloseButton onClick={() => navigate('/')}><X /></CloseButton>
      </Header>
      <IconWrapper>
        <CreditCard size={48} color="#6366f1" />
      </IconWrapper>
      <Title>We need a photo of your ID</Title>
      <Subtitle>For the United States, please select one of the following identity document types:</Subtitle>
      <OptionList>
        <OptionButton onClick={() => handleOptionSelect("Driver's License")}>
          <OptionIcon><CreditCard size={24} /></OptionIcon>
          Driver's License
        </OptionButton>
        <OptionButton onClick={() => handleOptionSelect("ID Card")}>
          <OptionIcon><FileText size={24} /></OptionIcon>
          ID Card
        </OptionButton>
        <OptionButton onClick={() => handleOptionSelect("Passport")}>
          <OptionIcon><BookOpen size={24} /></OptionIcon>
          Passport
        </OptionButton>
      </OptionList>
    </Container>
  );
};

export default IdDocsFotoOptions;