import React from "react";
import styles from "./Notification.module.css";

const Notification = (props) => {
  let specialStyles = "";

  if (props.status === "error") {
    specialStyles = styles.error;
  }

  if (props.status === "success") {
    specialStyles = styles.success;
  }

  const cssStyles = `${specialStyles} ${styles.notification}`;

  return (
    <section className={cssStyles}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;
