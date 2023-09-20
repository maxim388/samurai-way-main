import { profileAPI } from "../api/api";
import { AppThunkType } from "../redux/redux-store";

const ADD_POST = "profile/ADD_POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";
const DELETE_POST = "profile/DELETE_POST";

export type PostDataType = {
  id: number;
  message: string;
  likesCount: number;
};

export type UserProfileType = {
  aboutMe: string;
  contacts: {
    facebook: string;
    website: null;
    vk: string;
    twitter: string;
    instagram: string;
    youtube: null;
    github: string;
    mainLink: null;
  };
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: number;
  photos: {
    small: string;
    large: string;
  };
};

export type ProfilePageType = {
  posts: Array<PostDataType>;
  profile: null | UserProfileType;
  status: string;
};

let initialState = {
  posts: [
    { id: 0, message: "Hi! How are you?", likesCount: 12 },
    { id: 1, message: "It's my first post", likesCount: 11 },
    { id: 2, message: "Blabla", likesCount: 11 },
    { id: 3, message: "Dada", likesCount: 11 },
  ],
  profile: null,
  status: "",
};

export const profileReducer = (
  state: ProfilePageType = initialState,
  action: ProfileActionTypes
): ProfilePageType => {
  switch (action.type) {
    case ADD_POST:
      const newPost: PostDataType = {
        id: state.posts.length,
        message: action.newPostText,
        likesCount: 0,
      };
      return { ...state, posts: [...state.posts, newPost] };
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id === action.postId),
      };
    default:
      return state;
  }
};

export type ProfileActionTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof setUserProfileAC>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof deletePostAC>;

export const addPostAC = (newPostText: string) => {
  return {
    type: ADD_POST,
    newPostText,
  } as const;
};

export const setUserProfileAC = (profile: UserProfileType) => {
  return {
    type: SET_USER_PROFILE,
    profile,
  } as const;
};

export const setStatusAC = (status: string) => {
  return {
    type: SET_STATUS,
    status,
  } as const;
};

export const deletePostAC = (postId: number) => {
  return {
    type: DELETE_POST,
    postId,
  } as const;
};

export const getUserProfileTC = (userId: number): AppThunkType => {
  return async (dispatch) => {
    try {
      const res = await profileAPI.getProfile(userId);
      dispatch(setUserProfileAC(res));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getStatusTC = (userId: number): AppThunkType => {
  return async (dispatch) => {
    try {
      const res = await profileAPI.getStatus(userId);
      if (res.status === 200) {
        dispatch(setStatusAC(res.data));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateStatusTC = (status: string): AppThunkType => {
  return async (dispatch) => {
    try {
      await profileAPI.updateStatus(status);
      dispatch(setStatusAC(status));
    } catch (e) {
      console.log(e);
    }
  };
};
