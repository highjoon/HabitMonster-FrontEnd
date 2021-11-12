import React from 'react';
import styled from 'styled-components';

import { MainMonster } from '../components/monster';
import { TodayHabitList } from '../components/habit';
import '../assets/fonts/font.css';

const Main = () => {
  return (
    <>
      <Wrapper>
        <MainMonster />
        <TodayHabitList />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(0deg, var(--bg-wrapper), var(--bg-wrapper));
`;

export default Main;
