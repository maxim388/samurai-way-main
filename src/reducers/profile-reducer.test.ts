import {
  ProfilePageType,
  addPostAC,
  profileReducer,
  setStatusAC,
  setUserProfileAC,
  updateNewPostTextAC,
} from "./profile-reducer";

let startState: ProfilePageType;

beforeEach(() => {
  startState = {
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
});

test("correct new post should be added to the array posts| case ADD_POST", () => {
  const action = addPostAC();
  const endState = profileReducer(startState, action);

  expect(endState.newPostText).toBe("");
  expect(endState.posts.length).toBe(5);
  expect(endState.posts[4].message).toBe("");
  expect(endState.posts[4].likesCount).toBe(0);
  expect(endState.posts[4].id).toBe(5);
  expect(endState.posts[5]).toBe(undefined);
  expect(endState.posts).not.toBe(startState.posts);
  expect(endState.posts[0].id).toBe(1);
});

test("correct new post message should be update to the newPostText | case UPDATE_NEW_POST_TEXT", () => {
  const action = updateNewPostTextAC("yo");
  const endState = profileReducer(startState, action);

  expect(endState.newPostText).toBe("yo");
  expect(endState.posts.length).toBe(startState.posts.length);
  expect(endState.posts).toBe(startState.posts);
});

test("correct new profile user | case SET_USER_PROFILE", () => {
  let newProfile = {
    aboutMe: "hi everyone!)",
    contacts: {
      facebook: "facebook",
      website: null,
      vk: "vk",
      twitter: "twitter",
      instagram: "instagram",
      youtube: null,
      github: "https://github.com/maxim388",
      mainLink: null,
    },
    lookingForAJob: true,
    lookingForAJobDescription: "looking",
    fullName: "maxim",
    userId: 29750,
    photos: {
      small: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      large: "",
    },
  };
  const action = setUserProfileAC(newProfile);
  const endState = profileReducer(startState, action);

  expect(endState.profile!.userId).toBe(29750);
  expect(endState.profile).not.toBe(startState.profile);
});

test("correct status should be update | case SET_STATUS", () => {
  const action = setStatusAC("Hello");
  const endState = profileReducer(startState, action);

  expect(endState.status).toBe("Hello");
  expect(endState).not.toBe(startState);
});

// case SET_STATUS:
//   return { ...state, status: action.status };
