import api from "../../lib/api";
import { partOfArrayNotUndefined } from "../../lib/utils";

export const FETCH_DISPLAY_PAGE = "FETCH_DISPLAY_PAGE";
export const DISPLAY_PAGE = "DISPLAY_PAGE";
export const DEFAULT_LIMIT = 5;

export const listenToCalls = () => async dispatch => {
  dispatch(displayPage(0));
  // LISTEN TO PUSHER UPDATES HERE
};

const fetchDisplayPage = newOffset => async (dispatch, getState) => {
  const {
    calls: { limit },
  } = getState();

  try {
    const data = await api.get(`/calls?offset=${newOffset}&limit=${limit}`);
    const { nodes: list, totalCount } = data;
    dispatch({ type: FETCH_DISPLAY_PAGE, offset: newOffset, list, totalCount });
  } catch (e) {
    console.log(e);
  }
};

export const displayPrevPage = () => (dispatch, getState) => {
  const {
    calls: { offset, limit },
  } = getState();
  dispatch(displayPage(offset - limit));
};
export const displayNextPage = () => (dispatch, getState) => {
  const {
    calls: { offset, limit },
  } = getState();
  dispatch(displayPage(offset + limit));
};

export const displayPage = newOffset => async (dispatch, getState) => {
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
};

export default function (state = initialState, action) {
  const { type, offset, list, totalCount } = action;

  switch (type) {
    case DISPLAY_PAGE:
      return {
        ...state,
        offset,
      };
    case FETCH_DISPLAY_PAGE:
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
      };
    default:
      return state;
  }
}
