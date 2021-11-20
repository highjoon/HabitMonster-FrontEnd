import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { FollowListItem } from '../components/myPage';
import { BackButtonHeader } from '../components/common';
import { myPageApis } from '../api';

const FollowList = () => {
  const history = useHistory();
  const [isLoadFollower, setIsLoadFollower] = useState(false);
  // const [followerList, setFollowerList] = useState([]);
  const [isLoadFollowing, setIsLoadFollowing] = useState(false);
  // const [followingList, setFollowingList] = useState([]);

  // const getFollowerList = async () => {
  //   try {
  //     const { data } = await myPageApis.loadFollowers();
  //     if (data.statusCode === 200) {
  //       console.log('followerdata', data, data.followers);
  //       setFollowerList(data.followers);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getFollowingList = async () => {
  //   try {
  //     const { data } = await myPageApis.loadFollowings();
  //     if (data.statusCode === 200) {
  //       console.log('followingdata', data, data.followings);
  //       setFollowingList(data.followings);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getFollowerList();
  //   getFollowingList();
  // }, []);
  const list = [
    {
      email: 'abc@gmail.com',
      isFollowed: true,
      monsterCode: '12345',
      monsterImg: '',
      monsterName: '뽁아리',
    },
    {
      email: 'abc@gmail.com',
      isFollowed: false,
      monsterCode: '12395',
      monsterImg: '',
      monsterName: '뽁아리',
    },
    {
      email: 'abc@gmail.com',
      isFollowed: true,
      monsterCode: '10345',
      monsterImg: '',
      monsterName: '뽁아리',
    },
  ];

  //@jaekyung Todo. followlist 컴포넌트 만들어서 재활용하게 할 예정임
  return (
    <FollowContainer>
      <BackBtnWrap>
        <BackButtonHeader
          onButtonClick={() => {
            history.goBack();
          }}
        />
      </BackBtnWrap>
      <NavButtonWrap>
        <NavButtonItem>
          <NavButton
            onClick={() => {
              setIsLoadFollower(true);
            }}
            activeClassName="active"
          >
            팔로워
          </NavButton>
        </NavButtonItem>
        <NavButtonItem>
          <NavButton
            onClick={() => setIsLoadFollowing(true)}
            activeClassName="active"
          >
            팔로잉
          </NavButton>
        </NavButtonItem>
      </NavButtonWrap>
      <FollowListWrap>
        {list.map((user) => {
          return <FollowListItem key={user.monsterCode} user={user} />;
        })}
      </FollowListWrap>
    </FollowContainer>
  );
};

export default FollowList;

const FollowContainer = styled.div`
  background-color: var(--bg-wrapper);
  width: 100%;
  height: calc(100% - 64px);
  flex: 1 1 0;
  padding-top: 24px;
`;

const BackBtnWrap = styled.div`
  padding: 0 16px;
`;
const NavButtonWrap = styled.ul`
  border-bottom: 0.7px solid rgba(248, 248, 248, 0.1);
  display: flex;
  height: 40px;
  list-style: none;
  margin: 0;
`;

const NavButtonItem = styled.li`
  display: flex;
  justify-content: center;
  list-style: none;
  width: 50%;
  height: 34px;
  position: relative;
`;

const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  border: 1px solid transparent;
  color: rgba(248, 248, 248, 0.6);
  cursor: pointer;
  font-size: var(--font-xs);
  font-weight: var(--weight-bold);
  outline: 0;
  line-height: 19px;
  text-decoration: none;

  &:hover {
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-primary);
  }

  &.active {
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-primary);
  }
`;

const FollowListWrap = styled.ul`
  color: var(--color-primary);
  margin: 0;
  padding: 0;
`;
