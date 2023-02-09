import { useContext } from "react";

import { CartContext } from "../../../../store/cart-context";

import CartItems from "./CartItems";

import styles from "../Cart/Order.module.css";

const Order = () => {
  const cartCtx = useContext(CartContext);

  const cart = cartCtx.items.map((meal) => (
    <CartItems
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      amount={meal.amount}
    />
  ));

  return (
    <div className={styles.wrapper}>
      <h1>Your Order</h1>
      <div>{cart}</div>
    </div>
  );
};

export default Order;
