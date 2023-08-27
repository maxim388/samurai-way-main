import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import {
  UserProfileType,
  getUserProfileThunkCreator,
  setUserProfileAC,
} from "../../reducers/profile-reducer";
import { StateType } from "../../redux/redux-store";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { StaticContext } from "react-router";

type ProfilePropsType = MapStateToPropsType & MapDispatchToPropsType;

type MapStateToPropsType = {
  profile: null | UserProfileType;
};

type MapDispatchToPropsType = {
  setUserProfile: (profile: UserProfileType) => void;
  getUserProfileTC: (userId: number) => Function;
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
    this.props.getUserProfileTC(userId);
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
  getUserProfileTC: getUserProfileThunkCreator,
};

const withUrlDataContainerComponent = withRouter(ProfileAPIContainer);

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withUrlDataContainerComponent);
