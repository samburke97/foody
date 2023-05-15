import React from "react";
import styles from "./Error.module.css";

const ErrorPage = () => {
  return (
    <main className={styles.content}>
      <h1>An Error Occured</h1>
      <p>Could not find this page</p>
    </main>
  );
};

export default ErrorPage;
