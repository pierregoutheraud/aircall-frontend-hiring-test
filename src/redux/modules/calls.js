import Pusher from "pusher-js";
import { partOfArrayNotUndefined } from "../../lib/utils";
import api from "../../lib/api";
import {
  PUSHER_APP_CLUSTER,
  PUSHER_APP_KEY,
  PUSHER_AUTH_ENDPOINT,
} from "../../constants";

export const FETCH_CALL = "FETCH_CALL";
export const FETCH_CALLS_PAGE = "FETCH_CALLS_PAGE";
export const DISPLAY_PAGE = "DISPLAY_PAGE";
export const SET_ARCHIVED = "SET_ARCHIVED";
export const DEFAULT_LIMIT = 20;

let listenning = false;
export const listenToCallsUpdates = () => (dispatch, getState) => {
  if (listenning) {
    return;
  }
  listenning = true;

  const { auth } = getState();
  const pusher = new Pusher(PUSHER_APP_KEY, {
    cluster: PUSHER_APP_CLUSTER,
    authEndpoint: PUSHER_AUTH_ENDPOINT,
    auth: {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    },
  });

  const channel = pusher.subscribe("private-aircall");
  channel.bind("update-call", function (call) {
    const { id: callId, is_archived: isArchived } = call;
    dispatch({ type: SET_ARCHIVED, callId, isArchived });
  });
};

export const fetchCall = callId => async (dispatch, getState) => {
  return dispatch({
    useApi: true,
    type: FETCH_CALL,
    method: "GET",
    endpoint: `/calls/${callId}`,
    onSuccess: async data => {
      return { callId: data.id, call: data };
    },
  });
};

export const fetchDisplayPage = newOffset => async (dispatch, getState) => {
  const {
    calls: { limit },
  } = getState();
  return dispatch({
    useApi: true,
    type: FETCH_CALLS_PAGE,
    method: "GET",
    endpoint: `/calls?offset=${newOffset}&limit=${limit}`,
    onSuccess: async data => {
      const { nodes, totalCount } = data;
      return { nodes, totalCount, offset: newOffset };
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

export const toggleArchived = (callId, isArchived) => (dispatch, getState) => {
  api.put(`/calls/${callId}/archive`);
  return dispatch({ type: SET_ARCHIVED, callId, isArchived });
};

export function selectCalls(state) {
  const {
    calls: { list, data, limit, offset },
  } = state;
  return list.slice(offset, offset + limit).map(id => data[id]);
}

export const selectCall = callId => state => {
  if (!callId) {
    return null;
  }
  const {
    calls: { data },
  } = state;
  return data[callId];
};

export const initialState = {
  list: [],
  data: {},
  offset: 0,
  limit: DEFAULT_LIMIT,
  totalCount: 0,
  loading: false,
};

export default function (state = initialState, action) {
  const {
    type,
    offset,
    totalCount,
    loading,
    callId,
    call,
    isArchived,
    nodes,
  } = action;

  switch (type) {
    case FETCH_CALL + "_SUCCESS":
      return {
        ...state,
        data: {
          ...state.data,
          [callId]: call,
        },
      };
    case SET_ARCHIVED:
      return {
        ...state,
        data: {
          ...state.data,
          [callId]: {
            ...state.data[callId],
            is_archived: isArchived,
          },
        },
      };
    case DISPLAY_PAGE:
      return {
        ...state,
        offset,
      };
    case FETCH_CALLS_PAGE + "_REQUEST":
      return {
        ...state,
        loading,
      };
    case FETCH_CALLS_PAGE + "_SUCCESS":
      const newList = [...state.list];
      const newData = { ...state.data };

      let i = 0;
      nodes.forEach(call => {
        const { id } = call;
        newList[offset + i] = id;
        newData[id] = call;
        i++;
      });

      return {
        ...state,
        list: newList,
        data: newData,
        offset,
        totalCount,
        loading,
      };

    case FETCH_CALLS_PAGE + "_FAILURE":
      return {
        ...state,
        loading,
      };
    default:
      return state;
  }
}
