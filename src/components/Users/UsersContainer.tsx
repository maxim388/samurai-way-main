import { connect } from "react-redux";
import { Users } from "./Users";
import { Dispatch } from "redux";
import { StateType } from "../../redux/redux-store";
import {
  UserType,
  followAC,
  setUsersAC,
  unfollowAC,
} from "../../redux/users-reducer";

type MapStatePropsType = {
  users: Array<UserType>;
};

const mapStateToProps = (state: StateType): MapStatePropsType => {
  return {
    users: state.usersPage.users,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
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
