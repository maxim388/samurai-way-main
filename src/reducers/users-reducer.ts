import { usersAPI } from "../api/api";
import { AppThunkType } from "../redux/redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

export type LocationUserType = {
  city: string;
  country: string;
};

export type UserType = {
  followed: boolean;
  id: number;
  name: string;
  photos: { small: any; large: any };
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
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId ? { ...u, followed: true } : u
        ),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId ? { ...u, followed: false } : u
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
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setTotalUsersCountAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof toggleIsFetchingAC>
  | ReturnType<typeof toggleFollowingProgressAC>;

export const followAC = (userId: number) => {
  return {
    type: FOLLOW,
    userId,
  } as const;
};

export const unfollowAC = (userId: number) => {
  return {
    type: UNFOLLOW,
    userId,
  } as const;
};

export const setUsersAC = (users: Array<UserType>) => {
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

export const getUsersTC = (
  page: number,
  pageSize: number
): AppThunkType => {
  return (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    usersAPI.getUsers(page, pageSize).then((res) => {
      dispatch(toggleIsFetchingAC(false));
      dispatch(setUsersAC(res.items));
      dispatch(setTotalUsersCountAC(res.totalCount));
    });
  };
};

export const followTC = (userId: number): AppThunkType => {
  return (dispatch) => {
    usersAPI.followUser(userId).then((res) => {
      if (!res.data.resultCode) {
        dispatch(followAC(userId));
      }
    });
  };
};

export const unfollowTC = (userId: number): AppThunkType => {
  return (dispatch) => {
    usersAPI.unfollowUser(userId).then((res) => {
      if (!res.data.resultCode) {
        dispatch(unfollowAC(userId));
      }
    });
  };
};
