import { atom, selector } from 'recoil';
import { mainApis } from '../../api';

export const authToggler = atom({
  key: 'authToggler',
  default: 1,
});

export const authState = atom({
  key: 'authState',
  default: selector({
    key: 'asyncAuth',
    get: async ({ get }) => {
      get(authToggler);
      const loginStatus = {
        isLogin: false,
        isFirstLogin: null,
        createdAt: '',
      };

      const accessToken = window.localStorage.getItem('habitAccessToken');

      if (!accessToken) {
        return loginStatus;
      }

      try {
        const { data } = await mainApis.checkLogin();
        loginStatus.isFirstLogin = data.isFirstLogin;
        loginStatus.isLogin = data.isLogin;
        loginStatus.createdAt = data.createdAt;

        return loginStatus;
      } catch (error) {
        console.error(error);
        return loginStatus;
      }
    },
  }),
});
