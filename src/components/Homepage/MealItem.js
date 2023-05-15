import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import MealItemForm from "./MealItemForm";
import styles from "./MealItem.module.css";

const MealItem = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = (amount) => {
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        name: props.name,
        price: props.price,
        image: props.image,
        quantity: amount,
      })
    );
  };

  return (
    <li className={styles.form}>
      <div className={styles.image}>
        <img src={props.image} alt="Menu Item" />
      </div>
      <div className={styles.info}>
        <h3>{props.name}</h3>
        <p>{props.description}</p>
      </div>
      <MealItemForm
        id={props.id}
        onAddToCart={addToCartHandler}
        price={props.price}
      />
    </li>
  );
};

export default MealItem;
