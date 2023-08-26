import React from "react";
import { Profile } from "./Profile";
import axios from "axios";
import { connect } from "react-redux";
import {
  UserProfileType,
  setUserProfileAC,
} from "../../reducers/profile-reducer";
import { StateType } from "../../redux/redux-store";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { StaticContext } from "react-router";

type ProfilePropsType = MapStateToPropsType & MapDispatchToPropsType;

type MapStateToPropsType = {
  profile: null | UserProfileType;
  // params?: {}
};

type MapDispatchToPropsType = {
  setUserProfile: (profile: UserProfileType) => void;
};

export class ProfileAPIContainer extends React.Component<
  ProfilePropsType & RouteComponentProps<any, StaticContext, unknown>
> {
  componentDidMount() {

    let userId;
    if (this.props.match.params.userId) {
      userId = this.props.match.params.userId;
    } else {
      userId = "2";
    }
   
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then((response) => {
        this.props.setUserProfile(response.data);
      });
  }
  render() {
    return <Profile profile={this.props.profile} />;
  }
}

const mapStateToProps = (state: StateType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
  };
};

const mapDispatchToProps: MapDispatchToPropsType = {
  setUserProfile: setUserProfileAC,
};

const withUrlDataContainerComponent = withRouter(ProfileAPIContainer);

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withUrlDataContainerComponent);
