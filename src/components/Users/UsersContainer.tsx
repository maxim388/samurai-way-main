import { connect } from "react-redux";
import { StateType } from "../../redux/redux-store";
import {
  UsersPageType,
  followAC,
  followThunkCreator,
  getUsersThunkCreator,
  setCurrentPageAC,
  unfollowAC,
  unfollowThunkCreator,
} from "../../reducers/users-reducer";
import React from "react";
import { Users } from "./Users";
import { compose } from "redux";
import { Preloader } from "../common/Preloader";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";

type MapStateToPropsType = UsersPageType;

type MapDispatchToPropsType = {
  followSuccess: (userId: number) => void;
  unfollowSuccess: (userId: number) => void;
  setCurrentPage: (currentPage: number) => void;
  getUsers: (currentPage: number, pageSize: number) => void;
  unfollowTC: (userId: number) => Function;
  followTC: (userId: number) => Function;
};

type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: StateType): MapStateToPropsType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};
// connect сам оборачивает dispatch'ем каждле свойство объекта
const mapDispatchToProps: MapDispatchToPropsType = {
  followSuccess: followAC,
  unfollowSuccess: unfollowAC,
  setCurrentPage: setCurrentPageAC,
  getUsers: getUsersThunkCreator,
  unfollowTC: unfollowThunkCreator,
  followTC: followThunkCreator,
};

export class UsersAPIComponent extends React.Component<UsersContainerPropsType> {
  componentDidMount = () => {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  };

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    let pages = [];
    let pagesCount = Math.ceil(
      this.props.totalUsersCount / this.props.pageSize
    );

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            pages={pages}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            followingInProgress={this.props.followingInProgress}
            unfollowTC={this.props.unfollowTC}
            followTC={this.props.followTC}
          />
        )}
      </>
    );
  }
}

export const UsersContainer = compose<React.ComponentType>(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps)
)(UsersAPIComponent);

// export const UsersContainer = withAuthRedirect(connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(UsersAPIComponent))
