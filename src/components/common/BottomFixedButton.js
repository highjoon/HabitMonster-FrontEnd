import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BottomFixedButton = ({ onClick, text, condition }) => {
  return (
    <Button disabled={!condition} onClick={onClick}>
      {text}
    </Button>
  );
};

BottomFixedButton.propTypes = {
  condition: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const Button = styled.button`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  height: 64px;

  position: fixed;
  bottom: 0;
  background: var(--bg-active);
  z-index: 3;
  border: none;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-weight: var(--font-weight-bold);
  font-size: 18px;
  line-height: 22px;
  color: var(--color-main);
  transition: all 150ms ease-out;

  &:disabled {
    background: var(--bg-disabled);
    color: rgba(248, 248, 248, 0.2);
  }
`;

export default BottomFixedButton;
