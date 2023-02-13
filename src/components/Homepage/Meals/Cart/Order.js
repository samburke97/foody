import { useContext } from "react";
import { AuthContext } from "../../../../store/auth-context";
import { CartContext } from "../../../../store/cart-context";

import CartItems from "./CartItems";

import styles from "../Cart/Order.module.css";

const Order = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderTotal = cartCtx.totalAmount.toFixed(2);

  const cart = cartCtx.items.map((meal) => (
    <CartItems
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      amount={meal.amount}
      onAddItem={addItemHandler.bind(null, meal)}
      onRemoveItem={removeItemHandler.bind(null, meal.id)}
    />
  ));

  return (
    <div className={styles.wrapper}>
      <h1>Your Order</h1>
      {cartCtx.totalAmount < 1 ? (
        <p className={styles.content}>
          Hungry? We've got you covered, add an item.
        </p>
      ) : (
        ""
      )}
      <div>{cart}</div>
      {cartCtx.totalAmount < 1 ? (
        ""
      ) : (
        <div className={styles.actions}>Total Amount: {orderTotal}</div>
      )}
      <button className={styles.logout} onClick={authCtx.logout}>
        Logout
      </button>
    </div>
  );
};

export default Order;
