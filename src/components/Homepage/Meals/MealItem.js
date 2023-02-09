import { useContext } from "react";

import { CartContext } from "../../../store/cart-context";

import MealItemForm from "./MealItemForm";

import styles from "./MealItem.module.css";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={styles.form}>
      <div className={styles.info}>
        <div>
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <div className={styles.price}>{price}</div>
      </div>
      <div className={styles.meals}>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
