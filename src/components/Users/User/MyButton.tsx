import { FC, memo, useState, useEffect } from "react";

type MyButtonPropsType = {
  followed: boolean;
  toggleFollowTC: (userId: number, follow: boolean) => Function;
  userId: number;
  followingInProgress: boolean;
};

export const MyButton: FC<MyButtonPropsType> = memo(
  ({ followed, toggleFollowTC, userId, followingInProgress, children }) => {
    const [disableButton, setDisableButton] = useState<boolean>(false);

    useEffect(() => {
      setDisableButton(followingInProgress);
    }, [followingInProgress]); // fix

    return (
      <button
        disabled={disableButton}
        onClick={() => {
          toggleFollowTC(userId, !followed);
          setDisableButton(true);
        }}
      >
        {children}
      </button>
    );
  }
);
