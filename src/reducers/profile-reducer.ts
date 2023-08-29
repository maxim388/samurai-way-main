import { Dispatch } from "redux";
import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

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
  lookingForAJob: true;
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
  newPostText: string;
  profile: null | UserProfileType;
  status: string;
};

let initialState = {
  posts: [
    { id: 1, message: "Hi! How are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 11 },
    { id: 4, message: "Dada", likesCount: 11 },
  ],
  newPostText: "",
  profile: null,
  status: "",
};

export const profileReducer = (
  state: ProfilePageType = initialState,
  action: ActionTypes
): ProfilePageType => {
  switch (action.type) {
    case ADD_POST:
      const newPost: PostDataType = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };
      return { ...state, posts: [...state.posts, newPost], newPostText: "" };
    case UPDATE_NEW_POST_TEXT:
      if (action.newText) {
        return {
          ...state,
          newPostText: action.newText,
        };
      } else {
        return state;
      }
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
};

type ActionTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostTextAC>
  | ReturnType<typeof setUserProfileAC>
  | ReturnType<typeof setStatusAC>;

export const addPostAC = () => {
  return {
    type: ADD_POST,
  } as const;
};

export const updateNewPostTextAC = (newText: string) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText,
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

export const getUserProfileThunkCreator = (userId: number) => {
  return (dispatch: Dispatch) => {
    profileAPI.getProfile(userId).then((res) => {
      dispatch(setUserProfileAC(res.data));
    });
  };
};

export const getStatusThunkCreator = (userId: number) => {
  return (dispatch: Dispatch) => {
    profileAPI.getStatus(userId).then((res) => {
      if (res.status === 200) {
        dispatch(setStatusAC(res.data));
      }
    });
  };
};

export const updateStatusThunkCreator = (status: string) => {
  return (dispatch: Dispatch) => {
    profileAPI.updateStatus(status).then((res) => {
      dispatch(setStatusAC(res.data));
    });
  };
};
