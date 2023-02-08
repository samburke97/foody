import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../../store/auth-context";
import { CartContext } from "../../store/cart-context";

import Modal from "../UI/Modal";

import styles from "./Homepage.module.css";
import AvailableMeals from "./Meals/AvailableMeals";

const Homepage = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <FaShoppingCart
            size={64}
            className={styles.icon}
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
