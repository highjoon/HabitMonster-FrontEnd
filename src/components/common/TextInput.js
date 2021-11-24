import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { whiteOpacity } from '../../styles';

const TextInput = ({
  text,
  placeholder,
  onTextChanged,
  lengthValidationMode,
  errorMessage,
  maxLength,
  idleHelperText,
  disabled,
}) => {
  const isIdle = !text.length;
  const isValidated = text.length <= maxLength;

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onTextChanged(newValue);
  };

  return (
    <div>
      <Input
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={handleInputChange}
        isValidated={isValidated}
        isIdle={isIdle}
        disabled={disabled}
      />
      <div />
      <HelperSection>
        {isIdle && <IdleHelperText>{idleHelperText}</IdleHelperText>}
        {lengthValidationMode ? (
          <>
            <div>
              {!isValidated && (
                <ErrorHelperMessage>{errorMessage}</ErrorHelperMessage>
              )}
            </div>
            <div>
              <LengthHelperMessage>
                <CurrentLength isValidated={isValidated}>
                  {text.length}
                </CurrentLength>
                /{maxLength}
              </LengthHelperMessage>
            </div>
          </>
        ) : null}
      </HelperSection>
    </div>
  );
};

TextInput.propTypes = {
  text: PropTypes.string.isRequired,
  onTextChanged: PropTypes.func.isRequired,
  lengthValidationMode: PropTypes.bool,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  maxLength: PropTypes.number,
  idleHelperText: PropTypes.string,
  disabled: PropTypes.bool,
};

TextInput.defaultProps = {
  placeholder: '',
  errorMessage: '',
  idleHelperText: '',
  maxLength: Infinity,
  lengthValidationMode: false,
  disabled: false,
};

const IdleHelperText = styled.span`
  font-size: var(--font-xxs);
  line-height: 14px;
  color: rgba(248, 248, 248, 0.5);
`;

const Input = styled.input`
  width: 100%;
  height: 32px;
  background: inherit;
  font-size: var(--font-s);
  line-height: 18px;
  display: flex;
  align-items: center;
  padding: 4px;
  padding-bottom: 0px;
  color: var(--color-primary);
  border: none;
  margin-bottom: 4px;

  transition: all 150ms ease-out;

  & + div {
    width: 100%;
    height: 1px;
    display: block;
    margin: 4px 0px;
    background-color: ${({ isValidated }) =>
      isValidated ? 'rgba(248, 248, 248, 0.3)' : 'var(--color-danger)'};
    transition: all 150ms ease-out;
  }

  &:focus {
    outline: none;

    & + div {
      background-color: ${({ isValidated }) =>
        isValidated ? 'var(--bg-active)' : 'var(--color-danger)'};
      transition: all 150ms ease-out;
    }
  }
`;

const HelperSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 14px;
`;

const ErrorHelperMessage = styled.span`
  color: #ef2f68;
  font-size: var(--font-xxs);
  line-height: 14px;
`;

const LengthHelperMessage = styled.span`
  ${whiteOpacity('0.6')};
  font-size: var(--font-xxs);
  line-height: 14px;
`;

const CurrentLength = styled.b`
  color: ${({ isValidated }) =>
    !isValidated ? 'var(--color-danger)' : 'inherit'};
`;

export default TextInput;
