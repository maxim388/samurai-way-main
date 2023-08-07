const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";

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
};

let initialState = {
  users: [],
};

export const usersReducer = (
  state: UsersPageType = initialState,
  action: ActionTypes
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
        users: [...state.users, ...action.users],
      };

    default:
      return state;
  }
};

type ActionTypes =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>;

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
