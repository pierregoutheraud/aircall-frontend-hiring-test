import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Call from "../../components/Call/Call";
import PaginationNav from "../../components/PaginationNav/PaginationNav";
import useCalls from "../../hooks/useCalls";
import styles from "./Home.module.css";

export default function Home() {
  const history = useHistory();
  const page = parseInt(useParams().page || 1);

  const { list, totalCount, offset, limit } = useCalls(page);

  function goToPage(newPage) {
    return function () {
      history.push(`/${newPage}`);
    };
  }

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
        onPrev={goToPage(page - 1)}
        onNext={goToPage(page + 1)}
      />
    </main>
  );
}
