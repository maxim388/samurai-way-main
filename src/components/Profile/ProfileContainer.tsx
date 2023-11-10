import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import {
  UserProfileType,
  getStatusTC,
  getUserProfileTC,
  savePhotoTC,
  saveProfileTC,
  setUserProfileAC,
  updateStatusTC,
} from "../../reducers/profile-reducer";
import { AppRootStateType, AppThunkType } from "../../redux/redux-store";
import { compose } from "redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { ProfileFormDataType } from "./ProfileInfo/ProfileInfo";

type ProfilePropsType = MapStateToPropsType & MapDispatchToPropsType;

type MapStateToPropsType = {
  profile: null | UserProfileType;
  status: string;
  autorizedUserId: null | number;
  isAuth: boolean;
};

type MapDispatchToPropsType = {
  setUserProfile: (profile: UserProfileType) => void;
  getUserProfileTC: (userId: number) => AppThunkType;
  getStatusTC: (userId: number) => AppThunkType;
  updateStatusTC: (status: string) => AppThunkType;
  savePhotoTC: (file: File) => AppThunkType;
  saveProfileTC: (profile: ProfileFormDataType) => AppThunkType;
};

type PathParamsType = {
  userId: string;
};

type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType;

export class ProfileAPIContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number;
    if (this.props.match.params.userId) {
      userId = Number(this.props.match.params.userId);
    } else {
      if (this.props.autorizedUserId) {
        userId = this.props.autorizedUserId;
      } else {
        this.props.history.push("/login");
        return;
      }
    }
    this.props.getUserProfileTC(userId);
    this.props.getStatusTC(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }
  //todo
  componentDidUpdate(prevProps: PropsType, prevState: any) {
    if (this.props.match.params.userId !== prevProps.match.params.userId)
      this.refreshProfile();
  }

  render() {
    return (
      <Profile
        isOwner={Boolean(!this.props.match.params.userId)}
        profile={this.props.profile}
        status={this.props.status}
        updateStatusTC={this.props.updateStatusTC}
        savePhotoTC={this.props.savePhotoTC}
        saveProfileTC={this.props.saveProfileTC}
      />
    );
  }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps: MapDispatchToPropsType = {
  setUserProfile: setUserProfileAC,
  getUserProfileTC,
  getStatusTC,
  updateStatusTC,
  savePhotoTC,
  saveProfileTC,
};

const ProfileContainer = compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withAuthRedirect
)(ProfileAPIContainer);

export default ProfileContainer;
