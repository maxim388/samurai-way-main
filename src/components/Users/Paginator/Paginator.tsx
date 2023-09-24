import { FC } from "react";
import styles from "./Paginator.module.css";

type PaginatorPropsTyps = {
  totalUsersCount: number;
  currentPage: number;
  pageSize: number;
  onPageChanged: (page: number) => void;
};

export const Paginator: FC<PaginatorPropsTyps> = ({
  totalUsersCount,
  pageSize,
  onPageChanged,
  currentPage,
}) => {
  let pages = [];
  let pagesCount = Math.ceil(totalUsersCount / pageSize);

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  const pagesMaping = pages.map((p) => {
    return (
      <span
        key={p}
        className={currentPage === p ? styles.selectedPage : ""} //fix
        onClick={() => onPageChanged(p)}
      >
        {p}
      </span>
    );
  });
  return <div>{pagesMaping}</div>;
};
