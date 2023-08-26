const SET_USER_DATA = "SET_USER_DATA";

type AuthType = {
  id: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean
};

let initialState: AuthType = {
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

export const setAuthUserDataAC = (userId: string, email: string, login: string) => {
  return {
    type: SET_USER_DATA,
    data: { userId, email, login },
  } as const;
};
