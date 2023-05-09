import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../store/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../../store/cart-slice";
import Checkout from "./Checkout";
import CartItems from "./CartItems";
import styles from "../Cart/Order.module.css";

const Order = () => {
  const [checkout, setCheckout] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);

  const addItemHandler = (item) => {
    dispatch(
      cartActions.addItemToCart({
        ...item,
        quantity: 1,
      })
    );
  };

  const removeItemHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    setCheckout(!checkout);
  };

  const cart = items.map((meal) => (
    <CartItems
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      amount={meal.quantity}
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
          orderedItems: items,
        }),
      }
    );
    authCtx.navChange();
    dispatch(cartActions.clearCart());
  };

  const totalQuantity = items.reduce((curNum, item) => {
    return curNum + item.quantity;
  }, 0);

  const totalPrice = totalAmount.toFixed(2);

  if (totalQuantity > 0) {
    return (
      <div className={styles.wrapper}>
        <h1>Your Order</h1>
        <div>{cart}</div>
        <div className={styles.actions}>Total Amount: ${totalPrice}</div>
        {!checkout && (
          <div>
            <button className={styles.btn} onClick={authCtx.navChange}>
              Close
            </button>
            <button className={styles.order} onClick={checkoutHandler}>
              Order
            </button>
          </div>
        )}
        {checkout && (
          <Checkout
            onConfirm={confirmOrderHandler}
            onClick={authCtx.navChange}
          />
        )}
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <h1>Your Order</h1>
      <p>Hungry? We've got you covered, add an item.</p>
      <button className={styles.btn} onClick={authCtx.logout}>
        Logout
      </button>
    </div>
  );
};

export default Order;
