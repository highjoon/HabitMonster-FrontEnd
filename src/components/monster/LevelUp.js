import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import background from '../../assets/images/background';

import { MonsterThumbnail } from '../common';

const monsterConfiguration = {
  5: {
    width: '182px',
    height: '259px',
    bottom: '-5px',
  },
  10: {
    width: '169px',
    height: '251px',
    bottom: '0px',
  },
  15: {
    width: '202px',
    height: '246px',
    bottom: '0px',
  },
  20: {
    width: '252px',
    height: '199px',
    bottom: '12px',
  },
  25: {
    width: '307px',
    height: '178px',
    bottom: '0px',
  },
  30: {
    width: '210px',
    height: '249px',
    bottom: '10px',
  },
};

const LevelUp = ({ monsterId, onClickSelect, onClickStay }) => {
  return (
    <Container>
      <Top id={monsterId}>
        <MonsterThumbnail
          id={monsterId}
          width={monsterConfiguration[monsterId].width}
          height={monsterConfiguration[monsterId].height}
        />
      </Top>
      <Bottom>
        <TextBox>
          <p>축하합니다!</p>
          <span> 최고 레벨에 도달했어요.</span>
        </TextBox>
        <BtnWrap>
          <button onClick={onClickSelect}>다음 몬스터 고르기</button>
          <button onClick={onClickStay}>유지하기</button>
        </BtnWrap>
      </Bottom>
    </Container>
  );
};
LevelUp.propTypes = {
  onClickSelect: PropTypes.func.isRequired,
  onClickStay: PropTypes.func.isRequired,
  monsterId: PropTypes.number.isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  position: relative;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const Top = styled.div`
  width: 100%;
  height: 50%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(${({ id }) => background[id]}) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  & > svg {
    position: absolute;
    left: 50%;
    bottom: ${({ id }) => monsterConfiguration[id].bottom};
    transform: translateX(-50%);
  }
`;

const Bottom = styled.div`
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 23px 0;

  & p {
    color: var(--color-primary);
    font-size: var(--font-xl);
    line-height: 24px;
    font-weight: var(--weight-bold);
    margin-bottom: 7px;
  }

  & span {
    color: #e8e8e8;
    font-size: var(--font-xs);
    font-weight: var(--weight-semi-regular);
    line-height: 17px;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & button {
    font-size: var(--font-m);
    cursor: pointer;
    width: 253px;
    height: 47px;
    color: var(--color-white);
    border-radius: var(--border-radius-semi);
    border: none;
    margin: 4px;
    background-color: var(--bg-active);
  }

  & :nth-child(2) {
    background-color: transparent;
    color: #e8e8e8;
  }
`;
export default LevelUp;
