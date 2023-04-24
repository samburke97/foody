import { useRef } from "react";
import Input from "../../../UI/Input";
import useInput from "../../../../hooks/use-input";
import styles from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFour = (value) => value.trim().length === 4;

const Checkout = (props) => {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();

  const {
    value: enteredFirstName,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    hasError: firstNameHasError,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    hasError: lastNameHasError,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const {
    value: enteredStreet,
    isValid: streetIsValid,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    hasError: streetHasError,
    reset: resetStreet,
  } = useInput(isNotEmpty);

  const {
    value: enteredCity,
    isValid: cityIsValid,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    hasError: cityHasError,
    reset: resetCity,
  } = useInput(isNotEmpty);

  const {
    value: enteredPostal,
    isValid: postalIsValid,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    hasError: postalHasError,
    reset: resetPostal,
  } = useInput(isFour);

  let formIsValid = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    streetIsValid &&
    cityIsValid &&
    postalIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      props.onConfirm({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity,
      });

      resetFirstName();
      resetLastName();
      resetStreet();
      resetCity();
      resetPostal();
    } else if (!firstNameIsValid) {
      firstNameInputRef.current.focus();
    } else if (!lastNameIsValid) {
      lastNameInputRef.current.focus();
    } else if (!streetIsValid) {
      streetInputRef.current.focus();
    } else if (!cityIsValid) {
      cityInputRef.current.focus();
    } else {
      postalInputRef.current.focus();
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.wrapper}>
      <div className={styles.control}>
        <Input
          label="First Name"
          ref={firstNameInputRef}
          value={enteredFirstName}
          isValid={!firstNameHasError}
          input={{
            type: "text",
            name: "firstname",
            id: "firstname",
            onChange: firstNameChangeHandler,
            onBlur: firstNameBlurHandler,
          }}
        />
      </div>
      <div className={styles.control}>
        <Input
          label="Last Name"
          ref={lastNameInputRef}
          value={enteredLastName}
          isValid={!lastNameHasError}
          input={{
            type: "text",
            name: "lastname",
            id: "lastname",
            onChange: lastNameChangeHandler,
            onBlur: lastNameBlurHandler,
          }}
        />
      </div>
      <div className={styles.control}>
        <Input
          label="Street"
          ref={streetInputRef}
          value={enteredStreet}
          isValid={!streetHasError}
          input={{
            type: "text",
            name: "street",
            id: "street",
            onChange: streetChangeHandler,
            onBlur: streetBlurHandler,
          }}
        />
      </div>
      <div className={styles.control}>
        <Input
          label="City"
          ref={cityInputRef}
          value={enteredCity}
          isValid={!cityHasError}
          input={{
            type: "text",
            name: "city",
            id: "city",
            onChange: cityChangeHandler,
            onBlur: cityBlurHandler,
          }}
        />
      </div>
      <div className={styles.control}>
        <Input
          label="Post Code"
          ref={postalInputRef}
          value={enteredPostal}
          isValid={!postalHasError}
          input={{
            type: "text",
            name: "postal",
            id: "postal",
            onChange: postalChangeHandler,
            onBlur: postalBlurHandler,
          }}
        />
      </div>
      <button className={styles.btn}>Submit</button>
    </form>
  );
};

export default Checkout;
