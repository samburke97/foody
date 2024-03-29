import React, { useState, useRef } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const price = `$${props.price.toFixed(2)}`;

  const amountInputRef = useRef();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === "" ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
    } else setAmountIsValid(true);

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.actions}>
        <div>{price}</div>
        <div className={styles.control}>
          <Input
            label="Amount:"
            ref={amountInputRef}
            input={{
              type: "number",
              name: "amount",
              id: "amount_" + props.id,
              min: "1",
              max: "5",
              step: "1",
              defaultValue: "1",
            }}
          />
        </div>
      </div>
      <Button>Add To Cart</Button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
