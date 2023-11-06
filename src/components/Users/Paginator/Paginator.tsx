import { FC, useState } from "react";
import styles from "./Paginator.module.css";

type PaginatorPropsTyps = {
  totalItemsCount: number;
  currentPage: number;
  pageSize: number;
  onPageChanged: (page: number) => void;
};

export const Paginator: FC<PaginatorPropsTyps> = ({
  totalItemsCount,
  currentPage,
  pageSize,
  onPageChanged,
}) => {
  let pages = [];
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  // const [portionNumber, setPortionNumber] = useState<number>(1);
  // let leftPortionPageNumber = (portionNumber - 1) * pageSize + 1;
  // let rightPortionPageNumber = portionNumber * pageSize;

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
  return (
    <div>
      {/* todo */}
      {currentPage > 1 && (
        <button
          onClick={() => {
            // setPortionNumber(portionNumber - 1);
            onPageChanged(currentPage - 1);
          }}
        >
          PREV
        </button>
      )}
      {pagesMaping}
      {/* todo */}
      {pagesCount > currentPage && (
        <button
          onClick={() => {
            // setPortionNumber(portionNumber + 1);
            onPageChanged(currentPage + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};
