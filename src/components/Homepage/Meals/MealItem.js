import { useDispatch } from "react-redux";

import { cartActions } from "../../../store/cart-slice";

import MealItemForm from "./MealItemForm";

import styles from "./MealItem.module.css";

const MealItem = (props) => {
  const dispatch = useDispatch();

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        name: props.name,
        price: props.price,
        quantity: amount,
      })
    );
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
