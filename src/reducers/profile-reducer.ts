import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { ProfileFormDataType } from "../components/Profile/ProfileInfo/ProfileInfo";
import { AppThunkType } from "../redux/redux-store";

const ADD_POST = "profile/ADD_POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";
const DELETE_POST = "profile/DELETE_POST";
const SAVE_PHOTO_SUCCESS = "profile/SAVE_PHOTO_SUCCESS";

export type PostDataType = {
  id: number;
  message: string;
  likesCount: number;
};
type PhotosType = {
  small: string;
  large: string;
};

export type UserProfileType = {
  aboutMe?: string;
  contacts?: {
    facebook: string;
    website: null;
    vk: string;
    twitter: string;
    instagram: string;
    youtube: null;
    github: string;
    mainLink: null;
  };
  lookingForAJob?: boolean;
  lookingForAJobDescription?: string;
  fullName?: string;
  userId?: number;
  photos?: PhotosType;
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
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    default:
      return state;
  }
};

export type ProfileActionTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof setUserProfileAC>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof deletePostAC>
  | ReturnType<typeof savePhotoAC>;

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

export const savePhotoAC = (photos: PhotosType) => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos,
  } as const;
};

export const getUserProfileTC = (userId: number): AppThunkType => {
  return async (dispatch) => {
    try {
      const res = await profileAPI.getProfile(userId);
      dispatch(setUserProfileAC(res));
    } catch (e) {
      console.error(e);
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
      console.error(e);
    }
  };
};

export const updateStatusTC = (status: string): AppThunkType => {
  return async (dispatch) => {
    try {
      await profileAPI.updateStatus(status);
      dispatch(setStatusAC(status));
    } catch (e) {
      console.error(e);
    }
  };
};

export const savePhotoTC = (file: File): AppThunkType => {
  return async (dispatch) => {
    try {
      const res = await profileAPI.savePhoto(file);
      if (res.data.resultCode === 0) {
        dispatch(savePhotoAC(res.data));
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const saveProfileTC = (profile: ProfileFormDataType): AppThunkType => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.id
      const res = await profileAPI.saveProfile(profile);
      if (res.data.resultCode === 0) {
        dispatch(getUserProfileTC(userId!));
      } else {
        const messageError = res.data.messages.length ? res.data.messages[0] : "Some Error";
        dispatch(stopSubmit("edit-profile", { _error: messageError }));
        //todo
        // dispatch(stopSubmit("edit-profile", { contacts: { facebook: messageError } }));
        // return Promise.reject(messageError);
      }
    } catch (e) {
      console.error(e);
    }
  };
};
