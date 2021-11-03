import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Back } from '../../assets/icons/common';

const BackButtonHeader = ({ onButtonClick, pageTitleText }) => {
  return (
    <Wrapper>
      <Back onClick={() => onButtonClick()} />
      {pageTitleText && <PageTitle>{pageTitleText}</PageTitle>}
    </Wrapper>
  );
};

BackButtonHeader.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  pageTitleText: PropTypes.string,
};

BackButtonHeader.defaultProps = {
  pageTitleText: '',
};

const Wrapper = styled.div`
  max-width: 322px;
  height: 40px;
  display: flex;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-weight: var(--weight-bold);
  font-size: 20px;
  line-height: 41px;
  margin-left: 8px;
  color: var(--color-black);
`;

export default BackButtonHeader;
