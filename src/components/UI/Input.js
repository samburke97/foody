import React from "react";

import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        {...props.input}
        ref={ref}
        placeholder={props.input.placeholder}
        className={props.isValid === false ? `${styles.invalid}` : ""}
      />
    </>
  );
});

export default Input;
