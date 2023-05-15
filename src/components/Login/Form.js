import React, { useContext, useState, useRef } from "react";
import { FaHamburger } from "react-icons/fa";
import { AuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import Input from "../UI/Input";
import useInput from "../../hooks/use-input";

import styles from "./Form.module.css";

const isValidEmail = (val) => val.trim().includes("@");
const isSixChars = (val) => val.trim().length > 6;

const Form = () => {
  const navigate = useNavigate();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  //Define Refs

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //Custom useInput Hooks

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
  } = useInput(isValidEmail);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
  } = useInput(isSixChars);

  //Auth Context

  const authCtx = useContext(AuthContext);

  // Manage formIsValid states

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  //Login Handler
  const loginHandler = (event) => {
    setIsFormSubmitted(true);
    event.preventDefault();

    if (formIsValid) {
      authCtx.login();
      authCtx.navChange();
      navigate("/homepage");
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Foody</h2>
        <FaHamburger
          size={34}
          className={styles.icon}
          onClick={authCtx.navChange}
        />
      </div>
      <form className={styles.form} onSubmit={loginHandler}>
        <Input
          label="Email"
          isValid={emailHasError}
          value={enteredEmail}
          ref={emailInputRef}
          input={{
            type: "email",
            name: "email",
            id: "email",
            placeholder: "What's your email? 📧",
            onChange: emailChangeHandler,
            onBlur: emailBlurHandler,
          }}
        />
        {!emailIsValid && isFormSubmitted && <p>Email must contain '@'</p>}
        <Input
          label="Password"
          value={enteredPassword}
          ref={passwordInputRef}
          isValid={passwordHasError}
          input={{
            type: "password",
            name: "password",
            id: "password",
            placeholder: "Make it strong 💪",
            onChange: passwordChangeHandler,
            onBlur: passwordBlurHandler,
          }}
        />
        {!passwordIsValid && isFormSubmitted && (
          <p>
            Please enter a valid password (Password greater than 6 characters)
          </p>
        )}
        <button>Submit</button>
      </form>
    </>
  );
};

export default Form;
