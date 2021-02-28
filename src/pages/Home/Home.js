import React, { useCallback } from "react";
import Call from "../../components/Call/Call";
import CallGroups from "../../components/CallGroups/CallGroups";
import PaginationNav from "../../components/PaginationNav/PaginationNav";
import Loading from "../../components/Loading/Loading";
import CallsActions from "../../components/CallsActions/CallsActions";
import useCalls from "../../hooks/useCalls";
import useCall from "../../hooks/useCall";
import styles from "./Home.module.css";
import useRouting, { PAGES } from "../../hooks/useRouting";

export default function Home() {
  const { params, goTo } = useRouting();
  const page = parseInt(params.page || 1);
  const {
    calls,
    totalCount,
    limit,
    loading,
    archiveCalls,
    unarchiveCalls,
    callsIdsChecked,
    checkCall,
  } = useCalls(page);
  const { toggleIsArchived } = useCall();

  function goToPage(newPage) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    goTo(PAGES.HOME, { page: Math.max(newPage, 1) });
  }

  const handleClickCall = useCallback(
    id => {
      goTo(PAGES.CALL, { id });
    },
    [goTo]
  );

  const _calls = calls.map(call => {
    return (
      <Call
        key={call.id}
        {...call}
        hasCheckbox
        isClickable
        onChangeArchived={toggleIsArchived}
        onCheck={checkCall}
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
