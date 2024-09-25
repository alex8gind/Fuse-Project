import React, { useState } from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import { Eye, EyeOff } from 'lucide-react';

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledPasswordField = styled(Field)`
  width: 100%;
  padding: 8px;
  padding-right: 40px;
  border: 1px solid ${props => (props.$error && props.$touched ? '#FF0000' : '#dddfe2')};
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: ${props => (props.$error && props.$touched ? '#FF0000' : '#1877f2')};
    box-shadow: 0 0 0 2px ${props => (props.$error && props.$touched ? 'rgba(255, 0, 0, 0.2)' : 'rgba(24, 119, 242, 0.2)')};
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const PasswordInput = ({ name, placeholder, $error, $touched, $hasError, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PasswordWrapper>
      <StyledPasswordField
        name={name}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        $error={$error || $hasError}
        $touched={$touched}
        {...props}
      />
      <ToggleButton type="button" onClick={toggleShowPassword}>
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </ToggleButton>
    </PasswordWrapper>
  );
};

export default PasswordInput;