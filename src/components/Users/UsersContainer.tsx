import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StateType } from "../../redux/redux-store";
import {
  UserType,
  UsersPageType,
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  unfollowAC,
} from "../../redux/users-reducer";
import { UsersAPIComponent } from "./UsersAPIComponent";

type MapStatePropsType = UsersPageType;

type MapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setUsers: (users: Array<UserType>) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalUsersCount: (totalCount: number) => void;
};

export type UsersContainerPropsType = MapStatePropsType & MapDispatchToPropsType;

const mapStateToProps = (state: StateType): MapStatePropsType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    follow: (userId: number) => {
      dispatch(followAC(userId));
    },
    unfollow: (userId: number) => {
      dispatch(unfollowAC(userId));
    },
    setUsers: (users: Array<UserType>) => {
      dispatch(setUsersAC(users));
    },
    setCurrentPage: (currentPage: number) => {
      dispatch(setCurrentPageAC(currentPage));
    },
    setTotalUsersCount: (totalCount: number) => {
      dispatch(setTotalUsersCountAC(totalCount));
    },
  };
};

export const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersAPIComponent);
