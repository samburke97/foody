import React from "react";
import Button from "../../UI/Button";
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
        <div>
          <Button onClick={props.onAddItem}>+</Button>
          <Button onClick={props.onRemoveItem}>-</Button>
        </div>
      </div>
      <div>
        <img src={props.image} alt="Menu Item" width={100} height={100} />
      </div>
    </div>
  );
};

export default CartItems;
