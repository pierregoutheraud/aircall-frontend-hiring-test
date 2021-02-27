import Pusher from "pusher-js";
import debounce from "lodash.debounce";
import { partOfArrayNotUndefined } from "../../lib/utils";
import {
  PUSHER_APP_CLUSTER,
  PUSHER_APP_KEY,
  PUSHER_AUTH_ENDPOINT,
} from "../../constants";

export const FETCH_CALL = "FETCH_CALL";
export const FETCH_CALLS_PAGE = "FETCH_CALLS_PAGE";
export const DISPLAY_PAGE = "DISPLAY_PAGE";
export const SET_CALLS = "SET_CALLS";
export const TOGGLE_IS_ARCHIVED = "TOGGLE_IS_ARCHIVED";
export const DEFAULT_LIMIT = 15;

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

  let calls = {};
  function handleCallUpdate(call) {
    calls = {
      ...calls,
      [call.id]: call,
    };
    setCalls(calls);
  }

  const setCalls = debounce(calls => {
    dispatch({ type: SET_CALLS, calls });
  }, 1500);

  channel.bind("update-call", handleCallUpdate);
};

export const fetchCall = callId => async (dispatch, getState) => {
  return dispatch({
    useApi: true,
    type: FETCH_CALL,
    method: "GET",
    endpoint: `/calls/${callId}`,
    onSuccess: call => ({ call }),
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
    onSuccess: data => {
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
  return dispatch(displayPageByOffset(offset));
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

export const archiveCalls = callsIds => (dispatch, getState) => {
  const {
    calls: { data },
  } = getState();
  callsIds.forEach(callId => {
    if (!data[callId] || data[callId].is_archived) {
      return;
    }
    dispatch(toggleIsArchived(callId));
  });
};

export const unarchiveCalls = callsIds => (dispatch, getState) => {
  const {
    calls: { data },
  } = getState();
  callsIds.forEach(callId => {
    if (!data[callId] || !data[callId].is_archived) {
      return;
    }
    dispatch(toggleIsArchived(callId));
  });
};

// I could have done something more generic here instead like an editCall function thats takes a key and a value
// but since I can not send the value to the api, I went for something specifc to is_archived field
export const toggleIsArchived = callId => dispatch => {
  return dispatch({
    useApi: true,
    type: TOGGLE_IS_ARCHIVED,
    method: "PUT",
    endpoint: `/calls/${callId}/archive`,
    callId,
  });
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
    calls,
    nodes,
  } = action;

  switch (type) {
    case SET_CALLS:
      return {
        ...state,
        data: {
          ...state.data,
          ...calls,
        },
      };
    case FETCH_CALL + "_SUCCESS":
      return {
        ...state,
        data: {
          ...state.data,
          [call.id]: call,
        },
      };
    case TOGGLE_IS_ARCHIVED + "_REQUEST":
      return {
        ...state,
        data: {
          ...state.data,
          [callId]: {
            ...state.data[callId],
            is_archived: !state.data[callId].is_archived,
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
