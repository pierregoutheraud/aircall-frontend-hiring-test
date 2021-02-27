import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import useCall from "../../hooks/useCall";
import Call from "../../components/Call/Call";
import GoBack from "../../components/GoBack/GoBack";
import styles from "./CallPage.module.css";

export default function CallPage() {
  const { callId } = useParams();

  const { call, toggleIsArchived } = useCall(callId);

  return (
    <main className={styles.container}>
      <GoBack className={styles.goBack} />
      {call ? (
        <Call {...call} onChangeArchived={toggleIsArchived} hasVia hasNotes />
      ) : (
        <Loading />
      )}
    </main>
  );
}
