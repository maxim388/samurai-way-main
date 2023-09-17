import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";
import { AppThunkType } from "../redux/redux-store";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA = "SET_CAPTCHA";

export type AuthType = {
  id: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean;
  captcha: string;
};

const initialState: AuthType = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  captcha: "",
  // "https://social-network.samuraijs.com/HelpApp/HelpApp/Captcha?w=200\u0026h=100\u0026c=%2B1cvPhDyyoOu7fuCIyY%2B5A%3D%3D",
};

export const authReducer = (
  state: AuthType = initialState,
  action: AuthActionTypes
): AuthType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case SET_CAPTCHA:
      return {
        ...state,
        captcha: action.captcha,
      };
    default:
      return state;
  }
};

export type AuthActionTypes =
  | ReturnType<typeof setAuthUserDataAC>
  | ReturnType<typeof setCaptchaAC>;

export const setAuthUserDataAC = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
) => {
  return {
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth },
  } as const;
};

export const setCaptchaAC = (captcha: string) => {
  return {
    type: SET_CAPTCHA,
    captcha,
  } as const;
};

export const authUserTC = (): AppThunkType => {
  return async (dispatch) => {
    try {
      const res = await authAPI.authMe();
      if (!res.data.resultCode) {
        const { id, email, login } = res.data.data;
        dispatch(setAuthUserDataAC(id, email, login, true));
      }
    } catch (e) {}
  };
};

export const loginTC = (
  email: string,
  password: string,
  rememberMe: boolean
): AppThunkType => {
  return async (dispatch) => {
    try {
      const res = await authAPI.login(email, password, rememberMe);
      switch (res.data.resultCode) {
        case 0:
          dispatch(authUserTC());
          break;
        case 10:
          dispatch(captchaTC());
          break;
        default:
          const messageError = res.data.messages.length ? res.data.messages[0] : "Some Error"
          dispatch(stopSubmit("login", { _error: messageError }));
      }
    } catch (e) {}
  };
};

export const logoutTC = (): AppThunkType => {
  return async (dispatch) => {
    try {
      const res = await authAPI.logout();
      if (!res.data.resultCode) {
        dispatch(setAuthUserDataAC(null, null, null, false));
      }
    } catch (e) {}
  };
};

export const captchaTC = (): AppThunkType => {
  return async (dispatch) => {
    try {
      const res = await authAPI.getCaptcha();
      dispatch(setCaptchaAC(res.url));
    } catch (e) {}
  };
};
