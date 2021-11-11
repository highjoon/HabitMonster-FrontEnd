import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { habitIdListState } from '../../recoil/states/habit';

import { TodayHabit } from './';

const TodayHabitList = () => {
  const habitIdList = useRecoilValue(habitIdListState);

  // @SangJoon
  // 새로 추가한 Habit의 경우 새로고침하여 새로운 API 데이터를 받기 전까지는
  // 사용자가 추가한 값 만 갖고 있습니다.
  // 따라서 새로고침하기 전까지는 사용자가 추가한 Habit의 Id가 undefined로 남아있습니다.
  // habitId는 서버에서 계산해서 내려주는 값이기 때문에 임의의 값을 부여할 수가 없습니다.
  // 해결 방안 논의가 필요할 것 같습니다.

  return (
    <HabitContainer>
      <HabitList>
        {habitIdList.map((id) => (
          <TodayHabit habitId={id} key={id} />
        ))}
      </HabitList>
    </HabitContainer>
  );
};

const HabitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 312px;
  overflow-y: scroll;
  border-radius: 4px;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const HabitList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

export default TodayHabitList;
