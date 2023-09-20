import { connect } from "react-redux";
import { AppRootStateType } from "../../redux/redux-store";
import {
  UsersPageType,
  getUsersTC,
  setCurrentPageAC,
  toggleFollowTC,
} from "../../reducers/users-reducer";
import React from "react";
import { Users } from "./Users";
import { compose } from "redux";
import { Preloader } from "../common/Preloader";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersSelector,
} from "../../reducers/users-selectors";

type MapStateToPropsType = UsersPageType;

type MapDispatchToPropsType = {
  setCurrentPage: (currentPage: number) => void;
  getUsers: (currentPage: number, pageSize: number) => void;
  toggleFollowTC: (userId: number, follow: boolean) => Function;
};

type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    users: getUsersSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

// connect сам оборачивает dispatch'ем каждое свойство объекта
const mapDispatchToProps: MapDispatchToPropsType = {
  setCurrentPage: setCurrentPageAC,
  getUsers: getUsersTC,
  toggleFollowTC: toggleFollowTC,
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
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            followingInProgress={this.props.followingInProgress}
            toggleFollowTC={this.props.toggleFollowTC}
          />
        )}
      </>
    );
  }
}

export const UsersContainer = compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps)
)(UsersAPIComponent);
