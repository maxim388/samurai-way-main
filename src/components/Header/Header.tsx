import s from "./Header.module.css"


export type HeaderPropsType = {

};

export const Header = (props: HeaderPropsType) => {
  return (
    <header className={s.header}>
      <img
        alt={"logo"}
        src={
          "https://brand-hub.ru/uploads/file/1/6/c/16c8574cbeca0eb027120f24ce7b328f.png"
        }
      />
    </header>
  );
};

