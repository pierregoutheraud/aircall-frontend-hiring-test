import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  displayPageByNumber,
  displayPrevPage,
  displayNextPage,
  setLimit,
  selectList,
} from "../redux/modules/calls";

export default function useCalls(page = 1) {
  const dispatch = useDispatch();
  const { totalCount, offset, limit, loading } = useSelector(
    state => state.calls
  );
  const list = useSelector(selectList);

  useEffect(() => {
    dispatch(displayPageByNumber(page));
  }, [page]);

  return {
    list,
    totalCount,
    offset,
    limit,
    loading,
    setLimit: limit => dispatch(setLimit(limit)),
    displayPrevPage: () => dispatch(displayPrevPage()),
    displayNextPage: () => dispatch(displayNextPage()),
  };
}
