import { UserProfileType } from "../../../reducers/profile-reducer";
import { Preloader } from "../../common/Preloader";
import s from "./ProfileInfo.module.css";
import { ProfileStatus } from "./ProfileStatus";

type ProfileInfoPropsType = {
  profile: null | UserProfileType;
  status: string;
  updateStatusTC: (status: string) => Function;
};

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
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
          <ProfileStatus status={status} updateStatusTC={updateStatusTC} />
        </div>
      </div>
    );
  }
};
