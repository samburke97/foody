import React from "react";

import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  //  ...props.input accepts an object
  return (
    <>
      <div className={styles.input}>
        <label htmlFor={props.label}>{props.label}</label>
        <input {...props.input} ref={ref} onChange={props.onChange} />
      </div>
    </>
  );
});

export default Input;
