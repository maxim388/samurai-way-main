import { UserProfileType } from "../../../reducers/profile-reducer";
import { Preloader } from "../../common/Preloader";
import s from "./ProfileInfo.module.css";
import { ProfileStatus } from "./ProfileStatus";

type ProfileInfoPropsType = {
  profile: null | UserProfileType;
};

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({ profile }) => {
  if (!profile) {
    return <Preloader />;
  } else {
    return (
      <div>
        <div>
          {/* <img
            src="https://s1.1zoom.ru/big0/234/Sea_Sky_Beach_Sunlounger_Sand_Rest_580068_1280x853.jpg"
            alt="background"
          /> */}
        </div>
        <div className={s.desctiptionBlock}>
          <img src={profile?.photos.large} alt="ava" />
          <ProfileStatus status={"fdfs"}/>
        </div>
      </div>
    );
  }
};
