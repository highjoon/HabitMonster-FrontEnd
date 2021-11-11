import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { MonsterThumbnail } from '../components/monster';
import { BottomFixedButton } from '../components/common';
import { monsterApis } from '../api/index';
import { fontSize } from '../styles';
import {
  getSelectedMonster,
  monsterNameSelector,
} from '../recoil/states/monster';

const MonsterGuide = () => {
  const history = useHistory();
  const selectedMonster = useRecoilValue(getSelectedMonster);
  const monsterName = useRecoilValue(monsterNameSelector);

  const moveToPage = (path) => {
    history.push(`/${path}`);
    // window.location.href = '/new';
  };

  return (
    <AvatarContainer>
      <TitleWrap>
        <HeadText>안녕!</HeadText>
        <HeadText> 난 {monsterName}라고 해.</HeadText>
      </TitleWrap>
      <ThumbnailWrap>
        <MonsterThumbnail
          imageUrl={selectedMonster.monsterImage}
          imageAlt={selectedMonster.monsterImage}
          imageSize={'large'}
        />
      </ThumbnailWrap>
      <TitleWrap>
        <TextBox>
          <SmallText>나는 다섯가지의 모습으로 변할 수 있어 </SmallText>
          <BigText>네가 습관을 실천할 수록 나는 성장해!</BigText>
        </TextBox>
        <TextBox>
          <SmallText>내가 성장하면서 너가 상상하지 못한 </SmallText>
          <BigText>새로운 모습으로 변화 될거야</BigText>
        </TextBox>
        <TextBox>
          <SmallText>점점 성장하는 모습 기대되지 않니?</SmallText>
          <BigText>나와 함께 습관을 만들러 가자!</BigText>
        </TextBox>
      </TitleWrap>
      <FixedButton onClick={() => moveToPage('new')}>
        습관 작성하러 가기
      </FixedButton>
      {/* <BottomFixedButton text="습관 작성하러 가기" onClick={moveMainPage} /> */}
    </AvatarContainer>
  );
};
export default MonsterGuide;

const AvatarContainer = styled.div`
  font-family: var(--font-name-apple);
  background-color: var(--bg-wrapper);
  padding-top: 80px;
  width: 100%;
  height: 100%;
`;

const TextBox = styled.div`
  text-align: center;
  margin: 24px 0;
`;

const TitleWrap = styled.div`
  color: var(--color-white);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
`;

const ThumbnailWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 10px;
`;

const SmallText = styled.p`
  ${fontSize('15px')};
  color: var(--color-primary);
  font-weight: var(--weight-semi-regular);
  line-height: 32px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const BigText = styled.p`
  font-weight: var(--weight-semi-bold);
  ${fontSize('20px')};
  line-height: 32px;
  margin: 0 auto;
`;

const HeadText = styled.p`
  font-size: var(--font-xxl);
  font-weight: var(--font-weight-medium);
  line-height: 32px;
  margin-left: 24px;
`;

const HeaderName = styled.p`
  font-size: var(--font-xxl);
  font-weight: var(--font-weight-bold);
`;

const FixedButton = styled.button`
  /* background-color: var(--color-main); */
  background-color: #4d0dcd;
  border: 0;
  outline: 0;
  color: var(--color-white);
  font-size: var(--font-regular);
  font-weight: var(--weight-bold);
  line-height: 22px;
  text-align: center;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  height: 64px;
  width: 100%;
  max-width: 375px;
`;
