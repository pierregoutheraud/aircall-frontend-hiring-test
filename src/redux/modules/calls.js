import { partOfArrayNotUndefined } from "../../lib/utils";

export const FETCH_DISPLAY_PAGE = "FETCH_DISPLAY_PAGE";
export const DISPLAY_PAGE = "DISPLAY_PAGE";
export const DEFAULT_LIMIT = 20;

export const fetchDisplayPage = newOffset => async (dispatch, getState) => {
  const {
    calls: { limit },
  } = getState();
  return dispatch({
    useApi: true,
    type: FETCH_DISPLAY_PAGE,
    method: "GET",
    endpoint: `/calls?offset=${newOffset}&limit=${limit}`,
    onSuccess: async data => {
      const { nodes: list, totalCount } = data;
      return { list, totalCount, offset: newOffset };
    },
  });
};

export const displayPageByNumber = (page = 1) => (dispatch, getState) => {
  const {
    calls: { limit },
  } = getState();
  const offset = (page - 1) * limit;
  dispatch(displayPageByOffset(offset));
};

export const displayPrevPage = () => (dispatch, getState) => {
  const {
    calls: { offset, limit },
  } = getState();
  dispatch(displayPageByOffset(offset - limit));
};
export const displayNextPage = () => (dispatch, getState) => {
  const {
    calls: { offset, limit },
  } = getState();
  dispatch(displayPageByOffset(offset + limit));
};

export const displayPageByOffset = newOffset => async (dispatch, getState) => {
  const {
    calls: { list, limit },
  } = getState();

  const pageAlreadyFetched = partOfArrayNotUndefined(
    list,
    newOffset,
    newOffset + limit
  );

  if (!pageAlreadyFetched) {
    return dispatch(fetchDisplayPage(newOffset));
  }

  dispatch({ type: DISPLAY_PAGE, offset: newOffset });
};

export function setLimit(limit) {
  return {
    type: "SET_LIMIT",
    limit,
  };
}

export function selectList(state) {
  const {
    calls: { list, limit, offset },
  } = state;
  const newList = list.slice(offset, offset + limit);
  return newList;
}

const initialState = {
  list: [],
  offset: 0,
  limit: DEFAULT_LIMIT,
  totalCount: 0,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, offset, list, totalCount, loading } = action;

  switch (type) {
    case DISPLAY_PAGE:
      return {
        ...state,
        offset,
      };
    case FETCH_DISPLAY_PAGE + "_REQUEST":
      return {
        ...state,
        loading,
      };
    case FETCH_DISPLAY_PAGE + "_SUCCESS":
      const newList = [...state.list];

      let i = 0;
      list.forEach(call => {
        newList[offset + i] = call;
        i++;
      });

      return {
        ...state,
        offset,
        list: newList,
        totalCount,
        loading,
      };

    case FETCH_DISPLAY_PAGE + "_FAILURE":
      return {
        ...state,
        loading,
      };
    default:
      return state;
  }
}
