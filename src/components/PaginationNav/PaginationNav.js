import React from "react";
import cx from "classnames";
import {
  IconButton,
  ArrowSendOutlined,
  Spacer,
  Button,
} from "@aircall/tractor";
import styles from "./PaginationNav.module.css";

export default function PaginationNav({
  page = 1,
  maxPage = 1,
  disabled = false,
  onPage = () => {},
}) {
  const hasPrevPage = page > 1;
  const hasNextPage = page < maxPage;

  const colorActive = "primary.base";
  const colorNotActive = "grey.light";

  function renderButtons() {
    const buttons = [-2, -1, 0, 1, 2].map((v, i) => {
      const _page = page + v;

      if (_page < 1 || _page > maxPage) {
        return (
          <Button
            key={_page}
            size="small"
            width="50px"
            style={{ visibility: "hidden" }}
          ></Button>
        );
      }

      const isCurrent = _page === page;

      return (
        <Button
          key={_page}
          mode={isCurrent ? "fill" : "outline"}
          size="small"
          variant={isCurrent ? "primary" : "darkGhost"}
          onClick={isCurrent ? () => {} : () => onPage(_page)}
          width="50px"
        >
          {_page}
        </Button>
      );
    });
    /*
      .reduce((acc, curr, i, arr) => {
        if (i === 0 && page > 3) {
          acc = [
            <Button
              key={1}
              mode="outline"
              size="small"
              variant="darkGhost"
              onClick={() => onPage(1)}
              width="50px"
            >
              {1}
            </Button>,
            <p>...</p>,
          ];
        }

        acc.push(curr);

        if (i === arr.length - 1 && page < maxPage - 2) {
          acc = [
            ...acc,
            <p>...</p>,
            <Button
              key={maxPage}
              mode="outline"
              size="small"
              variant="darkGhost"
              onClick={() => onPage(maxPage)}
              width="50px"
            >
              {maxPage}
            </Button>,
          ];
        }

        return acc;
      }, []);
      */

    return buttons;
  }

  return (
    <Spacer alignItems="center" space="xxs">
      <IconButton
        className={cx(styles.arrow, styles.reverse)}
        onClick={() => onPage(page - 1)}
        size={36}
        component={ArrowSendOutlined}
        color={hasPrevPage ? colorActive : colorNotActive}
        disabled={disabled || !hasPrevPage}
      />
      {renderButtons()}
      <IconButton
        className={styles.arrow}
        onClick={() => onPage(page + 1)}
        size={36}
        component={ArrowSendOutlined}
        color={hasNextPage ? colorActive : colorNotActive}
        disabled={disabled || !hasNextPage}
      />
    </Spacer>
  );
}
