import React, { useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { authState } from '../recoil/states/auth';

import Login from '../pages/Login';
import Main from '../pages/Main';
import Achievement from '../pages/Achievement';
import New from '../pages/New';
import MyPage from '../pages/MyPage';
import Gnb from '../components/gnb/Gnb';
import { PrivateRoute } from './route';
import Monster from '../pages/Monster';
import MonsterSetting from '../pages/MonsterSetting';
import MonsterGuide from '../pages/MonsterGuide';
import HabitDetail from '../pages/HabitDetail';
import HabitEdit from '../pages/HabitEdit';
import OnBoard from './onBoard/OnBoard';
import Notice from './myPage/Notice';

function App() {
  const { isFirstLogin, isLogin } = useRecoilValue(authState);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const monsterPath = ['select', 'guide', 'monster'];
    const isMonsterPath = monsterPath.some((path) =>
      location.pathname.includes(path),
    );

    if (isMonsterPath && isLogin && !isFirstLogin) {
      history.replace('/');
      return;
    }

    if (isFirstLogin) {
      history.replace('/monster');
      return;
    }
  }, []);

  return (
    <Layout>
      <Switch>
        {!window.localStorage.getItem('isOnboarding') ? <OnBoard /> : ''}
        <Route path="/login" component={Login} />
        <Route path="/monster" component={Monster} />
        <Route path="/select" component={MonsterSetting} />
        <Route path="/guide" component={MonsterGuide} />
        <>
          <Route exact path="/" component={Main} />
          <Route exact path="/habit/:habitId" component={HabitDetail} />
          <Route exact path="/habit/:habitId/edit" component={HabitEdit} />
          <Route path="/achievement" component={Achievement} />
          <Route path="/new" component={New} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/notice" component={Notice} />
          <Gnb />
        </>
      </Switch>
    </Layout>
  );
}

const Layout = styled.div`
  background: var(--bg-wrapper);
  display: flex;
  max-width: 360px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  margin: 0 auto;
  position: relative;
`;

export default App;
