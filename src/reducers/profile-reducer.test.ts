import {
  ProfilePageType,
  addPostAC,
  profileReducer,
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
