import { useContext, useState } from "react";
import { AuthContext } from "../../../../store/auth-context";
import { CartContext } from "../../../../store/cart-context";
import Checkout from "./Checkout";

import CartItems from "./CartItems";

import styles from "../Cart/Order.module.css";

const Order = () => {
  const [checkout, setCheckout] = useState(false);

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const checkoutHandler = () => {
    setCheckout(!checkout);
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

  const confirmOrderHandler = async (userData) => {
    await fetch(
      "https://react-http-b681a-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    cartCtx.clearCart();
  };

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
      {cartCtx.totalAmount === 0 && (
        <button className={styles.btn} onClick={authCtx.logout}>
          Logout
        </button>
      )}

      {cartCtx.totalAmount > 1 && (
        <button className={styles.btn} onClick={authCtx.navChange}>
          Close
        </button>
      )}
      {cartCtx.totalAmount > 1 && (
        <button className={styles.order} onClick={checkoutHandler}>
          Order
        </button>
      )}
      {checkout && cartCtx.totalAmount > 0 && (
        <Checkout onConfirm={confirmOrderHandler} />
      )}
    </div>
  );
};

export default Order;
