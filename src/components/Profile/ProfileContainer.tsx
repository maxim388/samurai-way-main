import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import {
  UserProfileType,
  getStatusTC,
  getUserProfileTC,
  setUserProfileAC,
  updateStatusTC,
} from "../../reducers/profile-reducer";
import { AppRootStateType } from "../../redux/redux-store";
import { compose } from "redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";

type ProfilePropsType = MapStateToPropsType & MapDispatchToPropsType;

type MapStateToPropsType = {
  profile: null | UserProfileType;
  status: string;
};

type MapDispatchToPropsType = {
  setUserProfile: (profile: UserProfileType) => void;
  getUserProfileTC: (userId: number) => Function;
  getStatusTC: (userId: number) => Function;
  updateStatusTC: (status: string) => Function;
};

type PathParamsType = {
  userId: string;
};

type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType;

export class ProfileAPIContainer extends React.Component<PropsType> {
  componentDidMount() {
    let userId: number;
    if (this.props.match.params.userId) {
      userId = Number(this.props.match.params.userId);
    } else {
      userId = 29750; //fix place
    }
    this.props.getUserProfileTC(userId);
    this.props.getStatusTC(userId);
  }

  
  render() {
    return (
      <Profile
        profile={this.props.profile}
        status={this.props.status}
        updateStatusTC={this.props.updateStatusTC}
      />
    );
  }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
  };
};

const mapDispatchToProps: MapDispatchToPropsType = {
  setUserProfile: setUserProfileAC,
  getUserProfileTC: getUserProfileTC,
  getStatusTC: getStatusTC,
  updateStatusTC: updateStatusTC,
};

export const ProfileContainer = compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withAuthRedirect
)(ProfileAPIContainer);
