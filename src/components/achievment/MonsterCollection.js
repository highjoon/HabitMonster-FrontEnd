import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MonsterThumbnail } from '../monster';
import { whiteOpacity } from '../../styles/Mixin';
import { monsterApis } from '../../api';
import { OK } from '../../constants/statusCode';
import { MAX_LEVEL } from '../../constants/monster';
import { QuestionIcon } from '../../assets/icons/achievement';
import { None } from '../../assets/images/placeholder';

const MonsterCollection = () => {
  const [collectionList, setCollectionList] = useState([]);

  useEffect(() => {
    async function fetchList() {
      const { data } = await monsterApis.loadMonsterCollection();

      if (data.statusCode === OK) {
        setCollectionList(data.monsters);
      }
    }

    fetchList();
  }, []);

  return (
    <Wrapper>
      {!collectionList?.length ? (
        <NoneTextWrapper>
          <None />
          <NoneTextDescription>
            아직 수집한 몬스터가 없어요.
            <br />
            습관을 실천해 몬스터를 모아보세요!
          </NoneTextDescription>
        </NoneTextWrapper>
      ) : (
        collectionList.map((monster) => (
          <EachCollectionWrapper key={monster.monsterName}>
            <p>{monster.monsterName}</p>
            <MonsterInformationWrapper>
              <span>최고 레벨 LV.{monster.maxLevel}</span>
              <span>{monster.createdAt} 생성</span>
            </MonsterInformationWrapper>
            <ImageScroller>
              {Array(MAX_LEVEL)
                .fill(null)
                .map((_, i) => (
                  <MonsterImageWrapper key={`${monster.monsterName} ${i}`}>
                    {monster.maxLevel <=
                      monster.monsterDatabases[i]?.monsterLevel ?? i + 1 ? (
                      <MonsterThumbnail
                        imageUrl={monster.monsterDatabases[i].monsterImage}
                        imageAlt={`The monster of ${monster.monsterName}`}
                        imageSize="small"
                      />
                    ) : (
                      <QuestionIcon />
                    )}
                    {/* <span> LV. {i + 1}</span> */}
                  </MonsterImageWrapper>
                ))}
            </ImageScroller>
          </EachCollectionWrapper>
        ))
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-left: 24px;

  &:last-child {
    margin-bottom: 64px;
  }
`;

const EachCollectionWrapper = styled.div`
  margin-top: 32px;

  & p {
    color: var(--color-primary);
    font-size: var(--font-m);
    line-height: 20px;
    font-weight: var(--weight-regular);
    margin-bottom: 6px;
  }
`;

const MonsterInformationWrapper = styled.div`
  padding-right: 24px;
  margin-bottom: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${whiteOpacity('0.6')}
  font-size: var(--font-xs);
  line-height: 20px;
  font-weight: var(--weight-semi-bold);
`;

const ImageScroller = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: auto;
`;

const MonsterImageWrapper = styled.div`
  flex: 0 0 auto;
  width: 112px;
  height: 124px;
  margin-right: 10px;
  padding-top: 14px;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg-primary);
  border-radius: var(--border-radius-semi);

  & img {
    margin-bottom: 14px;
  }

  & span {
    font-size: var(--font-xs);
    line-height: 20px;
    color: var(--color-primary);
  }
`;

const NoneTextWrapper = styled.section`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & svg {
    margin-bottom: 32px;
  }
`;

const NoneTextDescription = styled.p`
  ${whiteOpacity('0.6')};
  font-size: var(--font-xs);
  line-height: 21px;
  text-align: center;
`;

export default MonsterCollection;