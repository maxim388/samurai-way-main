import { connect } from "react-redux";
import { StateType } from "../../redux/redux-store";
import {
  UserType,
  UsersPageType,
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  toggleFollowingProgressAC,
  toggleIsFetchingAC,
  unfollowAC,
} from "../../reducers/users-reducer";
import React from "react";
import { Users } from "./Users";
import { Preloader } from "../common/Preloader";
import { usersAPI } from "../../api/api";

type MapStateToPropsType = UsersPageType;

type MapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setUsers: (users: Array<UserType>) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalUsersCount: (totalCount: number) => void;
  toggleIsFetching: (isFetching: boolean) => void;
  toggleFollowingProgress: (isProgress: boolean) => void;
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
  follow: followAC,
  unfollow: unfollowAC,
  setUsers: setUsersAC,
  setCurrentPage: setCurrentPageAC,
  setTotalUsersCount: setTotalUsersCountAC,
  toggleIsFetching: toggleIsFetchingAC,
  toggleFollowingProgress: toggleFollowingProgressAC,
};

export class UsersAPIComponent extends React.Component<UsersContainerPropsType> {
  componentDidMount = () => {
    this.props.toggleIsFetching(true);
    usersAPI
      .getUsers(this.props.currentPage, this.props.pageSize)
      .then((res) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(res.items);
        this.props.setTotalUsersCount(res.totalCount);
      });
  };

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);
    usersAPI.getUsers(pageNumber, this.props.pageSize).then((res) => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(res.items);
    });
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
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            isFetching={this.props.isFetching}
            followingInProgress={this.props.followingInProgress}
            toggleFollowingProgress={this.props.toggleFollowingProgress}
          />
        )}
      </>
    );
  }
}

export const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersAPIComponent);
