import React, { useCallback, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useHistory, Link } from 'react-router-dom';

import { useRefreshUser } from '../../hooks';
import {
  userState,
  myFollowListCountSelector,
  myFollowListByType,
} from '../../recoil/states/user';

import { myHabitCountState } from '../../recoil/states/habit';
import { monsterState } from '../../recoil/states/monster';

import { BottomDialog } from '../dialog';
import { Modal, Toast } from '../../components/common';
import { EditBox, UserInfoItem } from '../../components/myPage';
import { MonsterThumbnailWrapper } from '../../components/monster';

import { myPageApis } from '../../api';
import { USER_DELETED } from '../../constants/statusMessage';
import { Pencil } from '../../assets/icons/common';

const UserInformation = () => {
  const userInfo = useRecoilValue(userState);
  const monsterInfo = useRecoilValue(monsterState);
  const myHabitCount = useRecoilValue(myHabitCountState);
  const { followerListCount, followingListCount } = useRecoilValue(
    myFollowListCountSelector,
  );
  const refetchFollowList = useSetRecoilState(myFollowListByType(''));
  const refresher = useRefreshUser();

  const history = useHistory();
  const [editModalType, setEditModalType] = useState('');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [deleteAccountModalOpen, setdeleteAccountModalOpen] = useState(false);
  const [activeToast, setActiveToast] = useState(false);
  const webViewWrapper = useRef(null);

  const openModal = useCallback((type) => {
    setEditModalType(type);
  }, []);

  const closeModal = useCallback(() => {
    setEditModalType('');
  }, []);

  const copyCode = useCallback((contents) => {
    // 흐름 1.
    if (!document.queryCommandSupported('copy')) {
      return alert('복사하기가 지원되지 않는 브라우저입니다.');
    }
    // 흐름 2.
    const textarea = document.createElement('textarea');
    textarea.value = contents;
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.position = 'fixed';

    // 흐름 3.
    document.body.appendChild(textarea);
    // focus() -> 사파리 브라우저 서포팅
    textarea.focus();
    // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    // 흐름 4.
    document.execCommand('copy');
    // textarea.setSelectionRange(0, 0);
    // 흐름 5.
    document.body.removeChild(textarea);

    setTimeout(() => setActiveToast(true));
  }, []);

  const deleteToken = useCallback(() => {
    window.localStorage.removeItem('habitAccessToken');
    window.localStorage.removeItem('habitRefreshToken');
  }, []);

  /*
    토큰을 삭제하고 로그인으로 보냅니다.
  */

  const dispatcher = async (type) => {
    if (type === 'logout') {
      deleteToken();
      refresher();
      history.replace('/login', null);
      return;
    }

    try {
      const { data } = await myPageApis.deleteUser();
      if (data.responseMessage === USER_DELETED) {
        deleteToken();
        refresher();
        history.replace('/login', null);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const userInfoList = Object.keys(userInfo).length
    ? [
        {
          title: '몬스터 이름',
          contents: monsterInfo.monsterName,
          handleClick: () => openModal('monsterName'),
        },
        {
          title: '몬스터 코드',
          contents: userInfo.monsterCode,
          isCopy: true,
          handleClick: () => copyCode(userInfo.monsterCode),
        },
        {
          title: '현재 버전',
          contents: 'V_1.0.0',
        },
        {
          title: '공지사항',
          contents: '',
          handleClick: () => history.push('/notice'),
        },
        // {
        //   title: '신고하기',
        //   contents: '',
        //   handleClick: () => window.open('구글폼주소', '_blank'),
        // },
        {
          title: '로그아웃',
          contents: '',
          handleClick: () => setIsLogoutModalOpen(true),
          isLogout: true,
        },
        {
          title: '탈퇴하기',
          contents: '',
          handleClick: () => setdeleteAccountModalOpen(true),
          isDeleteAccount: true,
        },
      ]
    : [];

  useEffect(() => {
    if (activeToast) {
      setTimeout(() => {
        setActiveToast(false);
      }, 2500);
    }
  }, [activeToast]);

  useEffect(() => {
    // console.log('mypage CleanUp', history.location.pathname);
    return () => {
      // 마이페이지에서 벗어날 때 리스트를 초기화한다
      if (
        !(
          history.location.pathname.includes('mypage') ||
          history.location.pathname.includes('login')
        )
      ) {
        refetchFollowList();
      }
    };
  }, [history, refetchFollowList]);

  return (
    <section ref={webViewWrapper}>
      <UserInfoWrap>
        <MonsterThumbnailWrapper
          isProfile={true}
          thumbnailSize="small"
          monsterLevel={monsterInfo.monsterLevel}
          monsterId={monsterInfo.monsterId}
        />
        <div>
          <BoldText>{userInfo.userName}</BoldText>
          <EditNicknameBtn onClick={() => openModal('userName')}>
            <Pencil />
          </EditNicknameBtn>
        </div>
        <Summary>
          <li>
            <BoldText>{myHabitCount ?? 0}</BoldText>
            <span>총 습관</span>
          </li>
          <li>
            <FollowLink
              to={{
                pathname: '/follow',
                search: '?tab=followers',
              }}
            >
              <BoldText>{followerListCount ?? 0}</BoldText>
              <span>팔로워</span>
            </FollowLink>
          </li>
          <li>
            <FollowLink
              to={{
                pathname: '/follow',
                search: '?tab=following',
              }}
            >
              <BoldText>{followingListCount ?? 0}</BoldText>
              <span>팔로잉</span>
            </FollowLink>
          </li>
        </Summary>
      </UserInfoWrap>
      <UserInfoList>
        {userInfoList.map((userInfoItem) => {
          return (
            <UserInfoItem
              key={userInfoItem.title}
              userInfoItem={userInfoItem}
            />
          );
        })}
      </UserInfoList>
      {editModalType && (
        <Modal
          webViewWrapper={webViewWrapper}
          open={!!editModalType}
          onClose={closeModal}
        >
          <EditBox type={editModalType} closeModal={closeModal} />
        </Modal>
      )}
      {isLogoutModalOpen && (
        <Modal
          webViewWrapper={webViewWrapper}
          open={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          blurmode={true}
        >
          <BottomDialog
            title="정말 로그아웃하시겠어요?"
            height="141px"
            activeButtonText="로그아웃하기"
            onActive={() => dispatcher('logout')}
            onClose={() => setIsLogoutModalOpen(false)}
          />
        </Modal>
      )}
      {deleteAccountModalOpen && (
        <Modal
          webViewWrapper={webViewWrapper}
          open={deleteAccountModalOpen}
          onClose={() => setdeleteAccountModalOpen(false)}
          blurmode={true}
        >
          <BottomDialog
            height="182px"
            title="정말 탈퇴하시겠어요?"
            description="탈퇴하시면 기존에 있던 정보들이 다 사라져요!"
            activeButtonText="탈퇴하기"
            onActive={() => dispatcher('delete')}
            onClose={() => setdeleteAccountModalOpen(false)}
          />
        </Modal>
      )}
      {activeToast && (
        <Toast activeToast={activeToast} text="클립보드에 복사되었습니다!" />
      )}
    </section>
  );
};

export default UserInformation;

const UserInfoList = styled.ul`
  color: var(--color-primary);
  margin: 0;
  padding: 0;
`;

const EditNicknameBtn = styled.button`
  background-color: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 3px 0 0 2px;
  height: 19px;
`;

const UserInfoWrap = styled.div`
  color: var(--color-primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
  }
`;

const BoldText = styled.p`
  font-size: var(--font-m);
  font-weight: var(--weight-bold);
  line-height: 19px;
`;

const FollowLink = styled(Link)`
  color: var(--color-primary);
  font-size: var(--font-xxs);
  font-weight: var(--weight-semi-regular);
  text-decoration: none;
  text-align: center;
`;

const Summary = styled.ul`
  height: 34px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 24px 0;
  & li {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1 1 0;
    & span {
      font-size: var(--font-xxs);
      font-weight: var(--weight-semi-regular);
      line-height: 15px;
    }
    &::after {
      background-color: var(--color-title);
      position: absolute;
      content: '';
      width: 1px;
      height: 25px;
      opacity: 0.5;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
    &::last-child {
      &::after {
        width: 0;
      }
    }
  }
`;
