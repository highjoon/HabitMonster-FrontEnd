import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  monsterState,
  babyMonsterState,
  selectedMonsterState,
} from '../recoil/states/monster';

import { MonsterThumbnail } from '../components/monster';
import { BottomFixedButton } from '../components/common';
import { fontSize } from '../styles';

// 이쪽에서의 플로우
// 유저가 아바타를 클릭하면

const Monster = () => {
  const history = useHistory();
  const monsterList = useRecoilValue(babyMonsterState);
  const setSelectedMonster = useSetRecoilState(selectedMonsterState);

  // const [selectedMonster, setSelectedMonster] =
  //   useRecoilState(selectedMonsterState);

  // (semyung)
  // lazyInitializer 함수는 주로 리턴값이 computed costly할때 사용합니다!
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    return monsterList[0];
  });

  const handleSelectMonster = () => {
    setSelectedMonster(selectedAvatar);
    history.push('/select');
  };

  return (
    <AvatarContainer>
      <AvatarWrap>
        <TitleWrap>
          <WeightText>반가워요!</WeightText>
          <Title>나만의 몬스터를 골라주세요!</Title>
          <Description>
            한 번 고른 몬스터는 변경이 어려우니 신중히 골라주세요.
          </Description>
        </TitleWrap>
        <ThumbnailWrap>
          <MonsterThumbnail
            imageUrl={selectedAvatar.monsterImage}
            imageAlt={selectedAvatar.monsterImage}
            imageSize={'large'}
          />
        </ThumbnailWrap>
        <SelectList>
          {monsterList.map((monster) => {
            return (
              <SelectListItem
                key={monster.monsterId}
                selected={selectedAvatar.monsterImage === monster.monsterImage}
                onClick={() => setSelectedAvatar(monster)}
              >
                <MonsterThumbnail
                  imageUrl={monster.monsterImage}
                  imageAlt={monster.monsterImage}
                  imageSize={'small'}
                />
              </SelectListItem>
            );
          })}
        </SelectList>
      </AvatarWrap>
      <BottomFixedButton
        text="선택하기"
        condition={null}
        onClick={handleSelectMonster}
      />
    </AvatarContainer>
  );
};

export default Monster;

const AvatarContainer = styled.div`
  background-color: var(--color-background);
  width: 100%;
  height: calc(100% - 64px);
`;

const AvatarWrap = styled.div`
  background-color: var(--color-background);
  width: 100%;
  padding: 75px 24px 100px;
`;

const TitleWrap = styled.div``;

const Title = styled.h2`
  color: var(--color-white);
  font-size: var(--font-semi-medium);
  font-weight: var(--weight-bold);
  line-height: 32px;
`;

const WeightText = styled.span`
  color: var(--color-white);
  font-size: var(--font-semi-medium);
  font-weight: var(--weight-regular);
  line-height: 32px;
`;

const Description = styled.p`
  color: var(--color-white);
  ${fontSize('13px')};
  font-weight: var(--weight-regular);
  margin-top: 12px;
`;

const ThumbnailWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0 30px;
`;

const SelectList = styled.ul`
  display: flex;
  justify-content: center;
`;

const SelectListItem = styled.li`
  border: 1px solid
    ${(props) => (props.selected ? 'var(--color-white)' : 'transparent')};
  border-radius: var(--border-radius-avatarItem);
  cursor: pointer;
  transition: border 500ms;
`;

const FixedButton = styled.button`
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
  max-width: 480px;
`;
