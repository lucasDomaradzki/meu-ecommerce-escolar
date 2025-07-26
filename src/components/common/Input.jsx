import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box; /* Garante que padding e border não aumentem a largura total */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    outline: none;
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #999;
  }
`;

const Input = ({ type = 'text', placeholder, value, onChange, ...props }) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Input;
