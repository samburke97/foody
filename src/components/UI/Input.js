import React from "react";

import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        {...props.input}
        ref={ref}
        onChange={props.onChange}
        className={`${props.isValid === false ? styles.invalid : ""}`}
      />
    </div>
  );
});

export default Input;
