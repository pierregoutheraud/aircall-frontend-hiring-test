import React, { useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import debounce from "lodash.debounce";
import { Spacer, Button, ArchiveOutlined } from "@aircall/tractor";
import Call from "../../components/Call/Call";
import PaginationNav from "../../components/PaginationNav/PaginationNav";
import Loading from "../../components/Loading/Loading";
import useCalls from "../../hooks/useCalls";
import useCall from "../../hooks/useCall";
import styles from "./Home.module.css";

export default function Home() {
  const history = useHistory();
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
        className={styles.call}
        onChangeArchived={toggleIsArchived}
        onCheck={handleCheck}
        hasCheckbox
        isClickable
      />
    );
  });

  return (
    <main className={styles.container}>
      {loading ? <Loading className={styles.loading} /> : null}
      <Spacer className={styles.buttons} space="s">
        <Button
          disabled={!callsIdsChecked.length}
          variant="destructive"
          onClick={() => archiveCalls(callsIdsChecked)}
        >
          <ArchiveOutlined /> Archive
        </Button>

        <Button
          disabled={!callsIdsChecked.length}
          onClick={() => unarchiveCalls(callsIdsChecked)}
        >
          <ArchiveOutlined /> Unarchive
        </Button>
      </Spacer>
      <div className={styles.calls}>{_calls}</div>
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
