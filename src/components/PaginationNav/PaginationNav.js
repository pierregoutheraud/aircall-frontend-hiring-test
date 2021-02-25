import React, { useEffect } from "react";
import {
  IconButton,
  CircledLeftOutlined,
  CircledRightOutlined,
  Typography,
} from "@aircall/tractor";
import styles from "./PaginationNav.module.css";

export default function PaginationNav({
  offset,
  limit,
  totalCount,
  onPrev = () => {},
  onNext = () => {},
}) {
  const currentPage = Math.floor(offset / limit) + 1;
  const maxPage = Math.ceil(totalCount / limit);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < maxPage;

  const colorActive = "primary.base";
  const colorNotActive = "grey.light";

  return (
    <div className={styles.container}>
      <IconButton
        onClick={onPrev}
        size={36}
        component={CircledLeftOutlined}
        color={hasPrevPage ? colorActive : colorNotActive}
        disabled={!hasPrevPage}
      />
      <Typography className={styles.page} variant="subheading2">
        {currentPage}
      </Typography>
      <IconButton
        onClick={onNext}
        size={36}
        component={CircledRightOutlined}
        color={hasNextPage ? colorActive : colorNotActive}
        disabled={!hasNextPage}
      />
    </div>
  );
}
