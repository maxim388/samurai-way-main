import React from "react";
import { Profile } from "./Profile";
import axios from "axios";
import { connect } from "react-redux";
import {
  UserProfileType,
  setUserProfileAC,
} from "../../reducers/profile-reducer";
import { toggleIsFetchingAC } from "../../reducers/users-reducer";
import { StateType } from "../../redux/redux-store";

type ProfilePropsType = MapStateToPropsType & MapDispatchToPropsType;

type MapStateToPropsType = {
  profile: null | UserProfileType;
};

type MapDispatchToPropsType = {
  setUserProfile: (profile: UserProfileType) => void;
  // toggleIsFetching: (isFetching: boolean) => void;
};

export class ProfileAPIContainer extends React.Component<ProfilePropsType> {
  componentDidMount() {
    // this.props.toggleIsFetching(true);
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then((response) => {
        // this.props.toggleIsFetching(false);
        this.props.setUserProfile(response.data);
      });
  }
  render() {
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = (state: StateType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
  };
};

const mapDispatchToProps: MapDispatchToPropsType = {
  setUserProfile: setUserProfileAC,
  // toggleIsFetching: toggleIsFetchingAC,
};

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileAPIContainer);
