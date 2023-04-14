import { useState, useRef } from "react";

import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFour = (value) => value.trim().length === 4;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFour(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  const nameControlStyles = `${styles.control} ${
    !formValidity.name ? styles.invalid : ""
  }`;

  return (
    <form onSubmit={confirmHandler} className={styles.wrapper}>
      <div className={nameControlStyles}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" ref={nameInputRef} />
        {!formValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor="street">Street</label>
        <input type="text" name="street" id="street" ref={streetInputRef} />
        {!formValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" ref={cityInputRef} />
        {!formValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor="postal">Post Code</label>
        <input type="text" name="postal" id="postal" ref={postalInputRef} />
        {!formValidity.postal && <p>Please enter a valid post code.</p>}
      </div>
      <button className={styles.btn}>Submit</button>
    </form>
  );
};

export default Checkout;
