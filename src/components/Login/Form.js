import { useContext, useEffect, useReducer, useState } from "react";

import styles from "./Form.module.css";
import { FaHamburger } from "react-icons/fa";
import { AuthContext } from "../../store/auth-context";
import Input from "../UI/Input";

//Email Reducer & Password Reducer

const emailReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return {
        value: action.val,
        isValid: action.val.includes("@"),
      };
    default:
      return { value: "", isValid: false };
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.val, isValid: action.val.trim().length > 6 };
    default:
      return { value: "", isValid: false };
  }
};

const Form = (props) => {
  // Establish Context

  const authCtx = useContext(AuthContext);

  // Manage States for Button and Styles

  const [formIsValid, setFormIsValid] = useState(false);

  //Default Email & Password state for UseReducer

  const defaultEmailState = {
    value: "",
    isvalid: null,
  };

  const defaultPasswordState = {
    value: "",
    isValid: null,
  };

  //Use Reducer for validating Email & Password States

  const [emailState, dispatchEmailState] = useReducer(
    emailReducer,
    defaultEmailState
  );

  const [passwordState, dispatchPasswordState] = useReducer(
    passwordReducer,
    defaultPasswordState
  );

  // Change Handlers for Email & Password State

  const emailChangeHandler = () => {
    dispatchEmailState({
      type: "INPUT",
      val: emailState.value,
    });
  };

  const passwordChangeHandler = () => {
    dispatchPasswordState({
      type: "INPUT",
      val: passwordState.value,
    });
  };

  //Set form is Valid using UseEffect

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("CHECKING");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  //Handle Login via AuthContext

  const loginHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.login();
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Foody</h2>
        <FaHamburger size={24} className={styles.icon} onClick={props.onExit} />
      </div>
      <form className={styles.form} onSubmit={loginHandler}>
        <Input
          value={emailState.value}
          onChange={emailChangeHandler}
          label="Email"
          input={{
            type: "email",
            name: "email",
            id: "email",
          }}
        />
        <Input
          value={passwordState.value}
          onChange={passwordChangeHandler}
          label="Password"
          input={{
            type: "password",
            name: "password",
            id: "password",
          }}
        />
        <button disabled={!formIsValid}>Submit</button>
      </form>
    </>
  );
};

export default Form;
