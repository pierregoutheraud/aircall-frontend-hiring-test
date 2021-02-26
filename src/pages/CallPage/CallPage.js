import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import useCall from "../../hooks/useCall";
import Call from "../../components/Call/Call";
import GoBack from "../../components/GoBack/GoBack";
import styles from "./CallPage.module.css";

export default function CallPage() {
  const history = useHistory();
  const { callId } = useParams();

  const call = useCall(callId);

  return (
    <main className={styles.container}>
      <GoBack className={styles.goBack} />
      {call ? <Call call={call} hasVia hasNotes /> : <Loading />}
    </main>
  );
}
