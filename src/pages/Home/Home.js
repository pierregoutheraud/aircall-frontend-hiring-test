import React from "react";
import Call from "../../components/Call/Call";
import PaginationNav from "../../components/PaginationNav/PaginationNav";
import useCalls from "../../hooks/useCalls";
import styles from "./Home.module.css";

export default function Home() {
  const {
    list,
    totalCount,
    offset,
    limit,
    displayPrevPage,
    displayNextPage,
    setLimit,
  } = useCalls();

  const _list = list.map(call => {
    return <Call key={call.id} className={styles.call} call={call} />;
  });

  return (
    <main className={styles.container}>
      <div className={styles.calls}>{_list}</div>
      <PaginationNav
        offset={offset}
        limit={limit}
        totalCount={totalCount}
        onPrev={displayPrevPage}
        onNext={displayNextPage}
      />
    </main>
  );
}
