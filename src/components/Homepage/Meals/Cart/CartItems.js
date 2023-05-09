import React from "react";
import styles from "./CartItems.module.css";

const CartItems = (props) => {
  return (
    <div className={styles.content}>
      <div>
        <div className={styles.title}>{props.name}</div>
        <div>
          <div>QTY: {props.amount}</div>
          <div>PRICE: ${props.price}</div>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onAddItem}>Add +</button>
        <button onClick={props.onRemoveItem}>Remove -</button>
        <hr></hr>
      </div>
    </div>
  );
};

export default CartItems;
