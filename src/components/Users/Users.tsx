import { FC } from "react";
import { UserType } from "../../reducers/users-reducer";
import { Paginator } from "./Paginator/Paginator";
import { User } from "./User/User";

type UsersPropsType = {
  pageSize: number;
  users: UserType[];
  currentPage: number;
  followingInProgress: boolean;
  totalUsersCount: number;
  onPageChanged: (pageNumber: number) => void;
  toggleFollowTC: (userId: number, follow: boolean) => Function;
};

export const Users: FC<UsersPropsType> = ({
  pageSize,
  users,
  currentPage,
  onPageChanged,
  followingInProgress,
  toggleFollowTC,
  totalUsersCount,
}) => {
  const userMaping = users.map((u) => {
    return (
      <User
        user={u}
        followingInProgress={followingInProgress}
        toggleFollowTC={toggleFollowTC}
      />
    );
  });

  return (
    <div>
      <Paginator
        onPageChanged={onPageChanged}
        currentPage={currentPage}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      {userMaping}
    </div>
  );
};
