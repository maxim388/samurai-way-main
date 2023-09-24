import { UserProfileType } from "../../../reducers/profile-reducer";
import { Preloader } from "../../common/Preloader";
import s from "./ProfileInfo.module.css";
import { ProfileStatus } from "./ProfileStatus";
import { ProfileStatusWithHooks } from "./ProfileStatusWithHooks";
import { FC } from "react";

type ProfileInfoPropsType = {
  profile: null | UserProfileType;
  status: string;
  updateStatusTC: (status: string) => Function;
};

export const ProfileInfo: FC<ProfileInfoPropsType> = ({
  profile,
  status,
  updateStatusTC,
}) => {
  if (!profile) {
    return <Preloader />;
  } else {
    return (
      <div>
        <div></div>
        <div className={s.desctiptionBlock}>
          <img src={profile?.photos.large} alt="ava" />
          <ProfileStatusWithHooks
            status={status}
            updateStatusTC={updateStatusTC}
          />
          {/* <ProfileStatus status={status} updateStatusTC={updateStatusTC} /> */}
        </div>
      </div>
    );
  }
};
