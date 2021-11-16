import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
  SubTitleOuter,
  BottomFixedButton,
  BackButtonHeader,
  Modal,
} from '../components/common';
import { GreenMonsterIcon } from '../assets/images/monsters/svg';

import { habitState, habitsState } from '../recoil/states/habit';
import { renderDays } from '../utils/date';
import { setFormattedDuration } from '../utils/setFormatDuration';
import { Trash } from '../assets/icons/common';
import { BottomDialog } from '../components/dialog';
import { habitApis } from '../api';
import { OK } from '../constants/statusCode';

const HabitDetail = () => {
  const { habitId } = useParams();
  const history = useHistory();

  const [habitList, setHabitList] = useRecoilState(habitsState);
  const habitDetail = useRecoilValue(habitState(habitId));
  console.log(habitDetail);

  const durationStart = setFormattedDuration(
    habitDetail.durationStart,
    'YMD',
    '.',
  );
  const durationEnd = setFormattedDuration(habitDetail.durationEnd, 'YMD', '.');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteButtonClick = async () => {
    try {
      const { data } = await habitApis.deleteHabit(habitId);

      if (data.statusCode === OK) {
        const deletedHabitIndex = habitList.findIndex((habit) => {
          return habit.habitId === Number(habitId);
        });
        const originHabitList = habitList.slice();
        originHabitList.splice(deletedHabitIndex, 1);
        setHabitList(originHabitList);

        history.replace('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 백에서 나는 오류
  // 총 달성해야하는 카운트 대비 실제로 수행한(하루치) 비율을 퍼센티지로 나타내는게 acheievePercentage
  // 그런데 상세 페이지에서 총 카운트가 없음(오늘 수행한 카운트밖에 없음.)
  // 따라서, 이 화면에서 보여줄 것이 오늘 하루치라면,
  const progressbarRotationDegree = habitDetail.achievePercentage * 1.8 + 45;

  return (
    <Container>
      <Inner>
        <MenuBar>
          <BackButtonHeader
            onButtonClick={() => history.goBack()}
            pageTitleText={habitDetail.title}
          />
          <Trash onClick={() => setDeleteModalOpen(true)} />
        </MenuBar>
        <Wrapper>
          <ProgressBarWrapper>
            <ProgressBar achievePercentage={habitDetail.achievePercentage}>
              <div className="left" />
              <div className="right" />
              <div className="text">
                <span>{habitDetail.achievePercentage}%</span>
                <span>
                  {habitDetail.count}번 중 {habitDetail.current}번 완료!
                </span>
              </div>
              <ProgressBarOverflowSection>
                <CircleProgressbar degree={progressbarRotationDegree} />
              </ProgressBarOverflowSection>
              <IconProgressbar degree={progressbarRotationDegree}>
                <GreenMonsterIcon />
              </IconProgressbar>
            </ProgressBar>
          </ProgressBarWrapper>
        </Wrapper>

        <Wrapper>
          <SubTitleOuter subTitle="내용" className="subTitle">
            <p className="content">{habitDetail.description}</p>
          </SubTitleOuter>
        </Wrapper>
        <Wrapper>
          <SubTitleOuter subTitle="기간" className="subTitle">
            <p className="content">
              {durationStart} ~ {durationEnd}
            </p>
          </SubTitleOuter>
        </Wrapper>
        <Wrapper>
          <SubTitleOuter subTitle="요일" className="subTitle">
            {habitDetail.practiceDays.length === 7 ? (
              <p className="content">매주</p>
            ) : (
              <p className="content">
                매일 {renderDays(habitDetail.practiceDays)}
              </p>
            )}
          </SubTitleOuter>
        </Wrapper>
        <Wrapper>
          <SubTitleOuter subTitle="빈도" clasName="subTitle">
            <p className="content">하루에 {habitDetail.count}번</p>
          </SubTitleOuter>
        </Wrapper>
      </Inner>
      <BottomFixedButton
        condition={null}
        text="수정하기"
        onClick={() => {
          history.push({
            pathname: `/habit/${habitId}/edit`,
            state: {
              habitDetail,
            },
          });
        }}
      />
      {deleteModalOpen && (
        <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <BottomDialog
            title="습관을 정말 삭제할까요?"
            description="한 번 삭제 후에는 복구되지 않아요! 모든건 삼세번인데, 한 번 다시 생각해보는게 어떨까요!"
            activeButtonText="삭제할래요"
            onClose={() => setDeleteModalOpen(false)}
            onActive={() => handleDeleteButtonClick()}
          />
        </Modal>
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--bg-wrapper);
  font-family: var(--font-name-apple);
  color: var(--color-primary);
`;

const Inner = styled.div`
  padding: 0 24px;
`;

const MenuBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  margin-top: 24px;
  margin-bottom: 16px;
`;
const Wrapper = styled.div`
  margin-bottom: 22px;

  & .subTitle {
    font-weight: var(--weight-semi-bold);
    font-size: var(--font-xs);
    line-height: 16.8px;
    color: var(--bg-selected-light);
    margin-bottom: 6px;
  }

  & .content {
    font-weight: var(--weight-semi-regular);
  }
`;

const ProgressBarWrapper = styled.section`
  width: 100%;
  height: 154px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: var(--bg-primary);
  position: relative;
  padding: 24px;
`;

const ProgressBar = styled.div`
  position: relative;

  & > .left,
  & > .right {
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    bottom: -7px;
    overflow: hidden;
  }
  & > .left {
    left: 0;
    background: ${({ achievePercentage }) =>
      achievePercentage ? 'var(--bg-selected-light)' : '#5a5a5a'};
  }

  & > .right {
    right: 0;
    background: ${({ achievePercentage }) =>
      achievePercentage === 100 ? 'var(--bg-selected-light)' : '#5a5a5a'};
  }

  & > .text {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: var(--font-xs);
    line-height: 17px;
    color: var(--color-primary-deemed);
    text-align: center;

    & > span:first-child {
      font-size: 36px;
      line-height: 43.2px;
      font-weight: var(--weight-bold);
      color: var(--color-white);
    }
  }
`;

const ProgressBarOverflowSection = styled.div`
  width: 206px;
  height: 103px;
  position: relative;
  overflow: hidden;
`;

const CircleProgressbar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 206px;
  height: 206px;
  border: 15px solid #5a5a5a;
  margin-top: 3px;
  border-radius: 50%;
  border-bottom-color: var(--bg-selected-light);
  border-right-color: var(--bg-selected-light);
  transform: ${({ degree }) => `rotate(${degree}deg)`};
`;

const IconProgressbar = styled(CircleProgressbar)`
  border: 15px solid transparent;

  & > svg {
    position: absolute;
    bottom: 8px;
    left: 10px;
    width: 24px;
    height: 24px;
    transform: rotate(270deg);
    z-index: 10;
  }
`;

export default HabitDetail;
