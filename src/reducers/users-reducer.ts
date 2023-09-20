import { usersAPI } from "../api/api";
import { AppThunkType } from "../redux/redux-store";

const TOGGLE_FOLLOW = "users/TOGGLE_FOLLOW";
const SET_USERS = "users/SET_USERS";
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "users/TOGGLE_IS_FOLLOWING_PROGRESS";

export type LocationUserType = {
  city: string;
  country: string;
};

export type UserType = {
  followed: boolean;
  id: number;
  name: string;
  photos: { small: string | null; large: string | null };
  status: any;
  uniqueUrlName: null;
};

export type UsersPageType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: boolean;
};

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: false,
};

export const usersReducer = (
  state: UsersPageType = initialState,
  action: UsersActionTypes
): UsersPageType => {
  switch (action.type) {
    case TOGGLE_FOLLOW:
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId ? { ...u, followed: action.follow } : u
        ),
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_TOTAL_USERS_COUNT:
      if (action.totalUsersCount > 100) {
        return {
          ...state,
          totalUsersCount: 100,
        };
      } else {
        return {
          ...state,
          totalUsersCount: action.totalUsersCount,
        };
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isProgress,
      };
    default:
      return state;
  }
};

export type UsersActionTypes =
  | ReturnType<typeof toggleFollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setTotalUsersCountAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof toggleIsFetchingAC>
  | ReturnType<typeof toggleFollowingProgressAC>;

export const toggleFollowAC = (userId: number, follow: boolean) => {
  return {
    type: TOGGLE_FOLLOW,
    userId,
    follow,
  } as const;
};

export const setUsersAC = (users: UserType[]) => {
  return {
    type: SET_USERS,
    users,
  } as const;
};

export const setTotalUsersCountAC = (totalUsersCount: number) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount,
  } as const;
};

export const setCurrentPageAC = (currentPage: number) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  } as const;
};

export const toggleIsFetchingAC = (isFetching: boolean) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  } as const;
};

export const toggleFollowingProgressAC = (isProgress: boolean) => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isProgress,
  } as const;
};

export const getUsersTC = (page: number, pageSize: number): AppThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    try {
      const res = await usersAPI.getUsers(page, pageSize);
      dispatch(setUsersAC(res.items));
      dispatch(setTotalUsersCountAC(res.totalCount));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(toggleIsFetchingAC(false));
    }
  };
};

export const toggleFollowTC = (
  userId: number,
  follow: boolean
): AppThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    let res;
    try {
      if (follow) {
        res = await usersAPI.followUser(userId);
      } else {
        res = await usersAPI.unfollowUser(userId);
      }
      if (res.resultCode === 0) {
        dispatch(toggleFollowAC(userId, follow));
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(toggleIsFetchingAC(false));
    }
  };
};
