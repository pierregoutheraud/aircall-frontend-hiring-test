import React, { useState, useCallback } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import Call from "../../components/Call/Call";
import CallGroups from "../../components/CallGroups/CallGroups";
import PaginationNav from "../../components/PaginationNav/PaginationNav";
import Loading from "../../components/Loading/Loading";
import useCalls from "../../hooks/useCalls";
import useCall from "../../hooks/useCall";
import styles from "./Home.module.css";
import CallsActions from "../../components/CallsActions/CallsActions";

export default function Home() {
  const history = useHistory();
  const location = useLocation();
  const page = parseInt(useParams().page || 1);
  const [callsIdsChecked, setCallsIdsChecked] = useState([]);
  const {
    calls,
    totalCount,
    limit,
    loading,
    archiveCalls,
    unarchiveCalls,
  } = useCalls(page);
  const { toggleIsArchived } = useCall();

  function goToPage(newPage) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.push(`/${Math.max(newPage, 1)}`);
  }

  const handleClickCall = useCallback(id => {
    history.push({ pathname: `/call/${id}`, state: { from: location } });
  }, []);

  // Since Call component is wrapped around React.memo, I memoized this function
  // so that Call components get the same reference and do not get re-rendered everytime
  const handleCheck = useCallback((callId, checked) => {
    if (checked) {
      setCallsIdsChecked(callsIdsChecked => [...callsIdsChecked, callId]);
    } else {
      setCallsIdsChecked(callsIdsChecked =>
        callsIdsChecked.filter(id => id !== callId)
      );
    }
  }, []);

  const _calls = calls.map(call => {
    return (
      <Call
        key={call.id}
        {...call}
        hasCheckbox
        isClickable
        onChangeArchived={toggleIsArchived}
        onCheck={handleCheck}
        onClick={handleClickCall}
      />
    );
  });

  return (
    <main className={styles.container}>
      {loading ? <Loading className={styles.loading} /> : null}

      <CallsActions
        disabled={!callsIdsChecked.length}
        onArchive={() => archiveCalls(callsIdsChecked)}
        onUnarchive={() => unarchiveCalls(callsIdsChecked)}
      />

      <div className={styles.calls}>
        <CallGroups>{_calls}</CallGroups>
      </div>

      <PaginationNav
        className={styles.nav}
        page={page}
        maxPage={Math.ceil(totalCount / limit)}
        onPage={goToPage}
        disabled={loading}
      />
    </main>
  );
}
