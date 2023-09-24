import { AppThunkType } from "../redux/redux-store";
import { authUserTC } from "./auth-reducer";

const INITIALIZED_SUCCESS = "app/INITIALIZED_SUCCESS";

type InitializedType = {
  initialized: boolean;
};

const initialState = {
  initialized: false,
};

export const appReducer = (
  state: InitializedType = initialState,
  action: InitializeActionTypes
): InitializedType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export type InitializeActionTypes = ReturnType<typeof initializedSuccessAC>;

export const initializedSuccessAC = () => {
  return {
    type: INITIALIZED_SUCCESS,
  } as const;
};

export const initializedSuccessTC = (): AppThunkType => {
  return async (dispatch) => {
    try {
      const promise = await dispatch(authUserTC()); //fix
      dispatch(initializedSuccessAC());
    } catch (e) {
      console.log(e);
    }
  };
};
