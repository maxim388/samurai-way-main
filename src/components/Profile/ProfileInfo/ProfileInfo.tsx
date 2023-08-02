import s from "./ProfileInfo.module.css";

export type ProfileInfoPropsType = {};

export const ProfileInfo = (props: ProfileInfoPropsType) => {
  return (
    <div>
      <div>
        <img src="https://s1.1zoom.ru/big0/234/Sea_Sky_Beach_Sunlounger_Sand_Rest_580068_1280x853.jpg" />
      </div>
      <div className={s.desctiptionBlock}>ava + desctiption</div>
    </div>
  );
};
