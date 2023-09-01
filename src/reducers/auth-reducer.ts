import { Dispatch } from 'redux';
import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

export type AuthType = {
  id: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean
};

const initialState: AuthType = {
  id: null,
  login: null,
  email: null,
  isAuth: false
};

export const authReducer = (
  state: AuthType = initialState,
  action: ActionTypes
): AuthType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true
      };
    default:
      return state;
  }
};

type ActionTypes = ReturnType<typeof setAuthUserDataAC>;

export const setAuthUserDataAC = (id: number, email: string, login: string) => {
  return {
    type: SET_USER_DATA,
    data: { id, email, login },
  } as const;
};

export const authThunkCreator = () => {
  return (dispatch: Dispatch) => {
     authAPI.authMe().then((res) => {
       if (!res.data.resultCode) {
         let { id, email, login } = res.data.data;
         dispatch(setAuthUserDataAC(id, email, login));
       }
     });
  };
};
