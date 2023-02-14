import { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../../store/auth-context";
import { CartContext } from "../../store/cart-context";

import Modal from "../UI/Modal";

import styles from "./Homepage.module.css";
import AvailableMeals from "./Meals/AvailableMeals";

const Homepage = () => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const btnClasses = `${styles.icon} ${btnIsHighlighted ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(false);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numberOfCartItems = items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  return (
    <div className={styles.wrapper}>
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
        <AvailableMeals />
      </div>
    </div>
  );
};

export default Homepage;
