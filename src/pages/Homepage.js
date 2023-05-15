import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../store/auth-context";
import Notification from "../components/UI/Notification";
import { uiActions } from "../store/ui-slice";
import Modal from "../components/UI/Modal";
import Meals from "../components/Homepage/Meals";
import styles from "./Homepage.module.css";

const Homepage = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const authCtx = useContext(AuthContext);
  const items = useSelector((state) => state.cart.items);
  const btnClasses = `${styles.icon} ${btnIsHighlighted ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(false);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(true);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(uiActions.clearNotification());
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  const numberOfCartItems = items.reduce((curNum, item) => {
    return curNum + item.quantity;
  }, 0);

  return (
    <>
      {notification && (
        <Notification
          title={notification.status}
          message={notification.message}
          status={notification.status}
        />
      )}
      <div className={styles.content}>
        <div className={styles.header}>
          <FaShoppingCart
            size={64}
            className={btnClasses}
            onClick={authCtx.navChange}
          />
          <span>{numberOfCartItems}</span>
          {authCtx.navIsActive && <Modal />}
        </div>
        <Meals />
      </div>
    </>
  );
};

export default Homepage;
