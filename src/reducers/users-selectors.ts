import { createSelector } from "reselect";
import { AppRootStateType } from "../redux/redux-store";

const getUsers = (state: AppRootStateType) => state.usersPage.users;
export const getUsersSelector = createSelector(getUsers, (users) => {
  return users.filter((u) => true);
});
export const getPageSize = (state: AppRootStateType) =>
  state.usersPage.pageSize;
export const getTotalUsersCount = (state: AppRootStateType) =>
  state.usersPage.totalUsersCount;
export const getCurrentPage = (state: AppRootStateType) =>
  state.usersPage.currentPage;
export const getIsFetching = (state: AppRootStateType) =>
  state.usersPage.isFetching;
export const getFollowingInProgress = (state: AppRootStateType) =>
  state.usersPage.followingInProgress;
