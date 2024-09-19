import styled from 'styled-components';
import { Field } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

const FieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled(Field)`
  margin-bottom: 10px;
  padding: 8px;
  padding-right: ${props => props.type === 'password' ? '40px' : '8px'};
  border: 1px solid ${props => (props.$error && props.$touched ? '#FF0000' : '#dddfe2')};
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;

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

export const StyledField = ({ name, type, placeholder, $error, $touched, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FieldWrapper>
      <StyledInput
        name={name}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        $error={$error}
        $touched={$touched}
        {...props}
      />
      {type === 'password' && (
        <ToggleButton type="button" onClick={toggleShowPassword}>
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </ToggleButton>
      )}
    </FieldWrapper>
  );
};

export default StyledField;