import { FC } from "react";
import s from "./ProfileInfo.module.css";

type ContactType = {
  title: string;
  value: string | null;
};

export const Contact: FC<ContactType> = ({ title, value }) => {
  return (
    <div className={s.contact}>
      <b>{title}:</b>
      {value}
    </div>
  );
};
