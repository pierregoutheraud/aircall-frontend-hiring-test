import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import {
  IconButton,
  ArrowSendOutlined,
  Spacer,
  Button,
} from "@aircall/tractor";
import styles from "./PaginationNav.module.css";

PaginationNav.propTypes = {
  className: PropTypes.string,
  page: PropTypes.number,
  maxPage: PropTypes.number,
  disabled: PropTypes.bool,
  onPage: PropTypes.func,
};

export default function PaginationNav({
  className = undefined,
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
          role="button"
          aria-label={isCurrent ? "current page" : "page button"}
        >
          {_page}
        </Button>
      );
    });

    return buttons;
  }

  return (
    <Spacer
      className={className}
      alignItems="center"
      justifyContent="center"
      space="xxs"
    >
      <IconButton
        className={cx(styles.arrow, styles.reverse)}
        onClick={() => onPage(page - 1)}
        size={36}
        component={ArrowSendOutlined}
        color={hasPrevPage ? colorActive : colorNotActive}
        disabled={disabled || !hasPrevPage}
        role="button"
        aria-label="previous page"
      />
      {renderButtons()}
      <IconButton
        className={styles.arrow}
        onClick={() => onPage(page + 1)}
        size={36}
        component={ArrowSendOutlined}
        color={hasNextPage ? colorActive : colorNotActive}
        disabled={disabled || !hasNextPage}
        role="button"
        aria-label="next page"
      />
    </Spacer>
  );
}
