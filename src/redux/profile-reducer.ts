// import { PostDataType } from "./store";

import { PostDataType, ProfilePageType } from "./redux-store";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
  posts: [
    { id: 1, message: "Hi! How are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 11 },
    { id: 4, message: "Dada", likesCount: 11 },
  ],
  newPostText: "",
};

export const profileReducer = (
  state: ProfilePageType = initialState,
  action: ActionTypes
) => {
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
    default:
      return state;
  }
};

type ActionTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostTextAC>;

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
