import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StateType } from "../../redux/redux-store";
import {
  UserType,
  followAC,
  setUsersAC,
  unfollowAC,
} from "../../redux/users-reducer";
import { Users } from "./Users";

type MapStatePropsType = {
  users: Array<UserType>;
};

type MapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setUsers: (users: Array<UserType>) => void;
};

export type UsersPropsType = MapStatePropsType & MapDispatchToPropsType;

const mapStateToProps = (state: StateType): MapStatePropsType => {
  return {
    users: state.usersPage.users,
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
  };
};

export const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
