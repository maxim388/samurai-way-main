import {
  UsersPageType,
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  unfollowAC,
  usersReducer,
} from "./users-reducer";

let startState: UsersPageType;

beforeEach(() => {
  startState = {
    users: [
      {
        followed: false,
        id: 1,
        name: "Maxim",
        photos: { small: "", large: "" },
        status: "",
        uniqueUrlName: null,
      },
      {
        followed: true,
        id: 2,
        name: "Vova",
        photos: { small: "", large: "" },
        status: "",
        uniqueUrlName: null,
      },
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: false,
    followingInProgress: false,
  };
});

test("correct user should be update following | case FOLLOW", () => {
  const action = followAC(1);
  const endState = usersReducer(startState, action);

  expect(endState.users).not.toBe(startState.users);
  expect(endState.users.length).toBe(startState.users.length);
  expect(endState.users[0].followed).toBe(true);
  expect(endState.users[1].followed).toBe(true);
});

test("correct user should be update unfollowing | case UNFOLLOW", () => {
  const action = unfollowAC(2);
  const endState = usersReducer(startState, action);

  expect(endState.users).not.toBe(startState.users);
  expect(endState.users.length).toBe(startState.users.length);
  expect(endState.users[0].followed).toBe(false);
  expect(endState.users[1].followed).toBe(false);
});

test("correct users should be added to the array users | case SET_USERS", () => {
  const action = setUsersAC([
    {
      followed: true,
      id: 3,
      name: "Ivan",
      photos: { small: "", large: "" },
      status: "",
      uniqueUrlName: null,
    },
  ]);
  const endState = usersReducer(startState, action);

  expect(endState.users).not.toBe(startState.users);
  expect(endState.users.length).toBe(1);
  expect(endState.users[0]).toEqual({
    followed: true,
    id: 3,
    name: "Ivan",
    photos: { small: "", large: "" },
    status: "",
    uniqueUrlName: null,
  });
});

test("correct total users count should be update to the state | case SET_TOTAL_USERS_COUNT", () => {
  const endState90 = usersReducer(startState, setTotalUsersCountAC(90));
  const endState110 = usersReducer(startState, setTotalUsersCountAC(110));

  expect(endState90.totalUsersCount).toBe(90);
  expect(endState110.totalUsersCount).toBe(100);
});

test("correct current page should be update to the state | case SET_CURRENT_PAGE", () => {
  const action = setCurrentPageAC(10);
  const endState = usersReducer(startState, action);

  expect(endState.currentPage).toBe(10);
});
