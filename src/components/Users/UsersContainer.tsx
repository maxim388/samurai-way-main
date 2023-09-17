import { connect } from "react-redux";
import { AppRootStateType } from "../../redux/redux-store";
import {
  UsersPageType,
  followAC,
  followTC,
  getUsersTC,
  setCurrentPageAC,
  unfollowAC,
  unfollowTC,
} from "../../reducers/users-reducer";
import React from "react";
import { Users } from "./Users";
import { compose } from "redux";
import { Preloader } from "../common/Preloader";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../reducers/users-selectors";

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

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

// connect сам оборачивает dispatch'ем каждое свойство объекта
const mapDispatchToProps: MapDispatchToPropsType = {
  followSuccess: followAC,
  unfollowSuccess: unfollowAC,
  setCurrentPage: setCurrentPageAC,
  getUsers: getUsersTC,
  unfollowTC: unfollowTC,
  followTC: followTC,
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
  connect(mapStateToProps, mapDispatchToProps)
  // withAuthRedirect
)(UsersAPIComponent);
