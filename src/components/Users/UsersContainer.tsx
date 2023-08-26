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
  toggleIsFetchingAC,
  unfollowAC,
} from "../../reducers/users-reducer";
import axios from "axios";
import React from "react";
import { Users } from "./Users";
import { Preloader } from "../common/Preloader";

type MapStatePropsType = UsersPageType;

type MapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setUsers: (users: Array<UserType>) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalUsersCount: (totalCount: number) => void;
  toggleIsFetching: (isFetching: boolean) => void;
};

export type UsersContainerPropsType = MapStatePropsType &
  MapDispatchToPropsType;

const mapStateToProps = (state: StateType): MapStatePropsType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
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
};

//вариант как можно еще сократить mapDispatchToProps если ключ = значению
// const mapDispatchToProps: MapDispatchToPropsType = {
//   follow,
//   unfollow,
//   setUsers,
//   setCurrentPage,
//   setTotalUsersCount,
//   toggleIsFetching,
// };

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
//   return {
//     follow: (userId: number) => {
//       dispatch(followAC(userId));
//     },
//     unfollow: (userId: number) => {
//       dispatch(unfollowAC(userId));
//     },
//     setUsers: (users: Array<UserType>) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (currentPage: number) => {
//       dispatch(setCurrentPageAC(currentPage));
//     },
//     setTotalUsersCount: (totalCount: number) => {
//       dispatch(setTotalUsersCountAC(totalCount));
//     },
//     toggleIsFetching: (isFetching: boolean) => {
//       dispatch(toggleIsFetchingAC(isFetching));
//     },
//   };
// };

export class UsersAPIComponent extends React.Component<UsersContainerPropsType> {
  componentDidMount = () => {
    this.props.toggleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  };

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
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
