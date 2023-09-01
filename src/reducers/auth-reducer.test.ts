import { AuthType, authReducer, setAuthUserDataAC } from "./auth-reducer";

let startState: AuthType;

beforeEach(() => {
  startState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
  };
});

test("correct new user should be update auth | case SET_USER_DATA", () => {
  const action = setAuthUserDataAC(2, "maxim.alenchikov@gmail", "maxim");
  const endState = authReducer(startState, action);

  expect(endState).not.toBe(startState);
  expect(endState.isAuth).toBe(true);
  expect(endState.id).toBe(2);
  expect(endState.login).toBe("maxim");
  expect(endState.email).toBe("maxim.alenchikov@gmail");
});
