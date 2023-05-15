import React, { useContext, useState } from "react";
import { AuthContext } from "../../../store/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import { sendCartData } from "../../../store/cart-actions";
import { NavLink } from "react-router-dom";
import Button from "../../UI/Button";
import Checkout from "./Checkout";
import CartItems from "./CartItems";
import styles from "../Cart/Order.module.css";

const Order = () => {
  const [checkout, setCheckout] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

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
      image={meal.image}
      amount={meal.quantity}
      onAddItem={addItemHandler.bind(null, meal)}
      onRemoveItem={removeItemHandler.bind(null, meal.id)}
    />
  ));

  const confirmOrderHandler = async (userData) => {
    dispatch(sendCartData(userData, items));
    authCtx.navChange();
  };

  const totalQuantity = items.reduce((curNum, item) => {
    return curNum + item.quantity;
  }, 0);

  const totalPrice = totalAmount.toFixed(2);

  if (totalQuantity > 0) {
    return (
      <div className={styles.content}>
        <h2>Your Order</h2>
        <div>{cart}</div>
        <div className={styles.actions}>
          <h3>Total Amount: ${totalPrice}</h3>
          {!checkout && (
            <div>
              <Button className={styles.btn} onClick={authCtx.navChange}>
                Close
              </Button>
              <Button className={styles.order} onClick={checkoutHandler}>
                Order
              </Button>
            </div>
          )}
        </div>
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
    <div className={styles.content}>
      <h2>Your Order</h2>
      <p>Hungry? We've got you covered, add an item.</p>
      <NavLink to="/" onClick={authCtx.logout}>
        <Button> Logout</Button>
      </NavLink>
    </div>
  );
};

export default Order;
