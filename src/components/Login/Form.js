import { useContext, useEffect, useReducer, useState, useRef } from "react";

import styles from "./Form.module.css";
import { FaHamburger } from "react-icons/fa";
import { AuthContext } from "../../store/auth-context";
import Input from "../UI/Input";

//Email Reducer & Password Reducers

const emailReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return {
        value: action.val,
        isValid: action.val.includes("@"),
      };
    case "BLUR":
      return { value: state.value, isValid: state.value.includes("@") };
    default:
      return { value: "", isValid: false };
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.val, isValid: action.val.trim().length > 6 };
    case "BLUR":
      return { value: state.value, isValid: state.value.trim().length > 6 };
    default:
      return { value: "", isValid: false };
  }
};

const Form = (props) => {
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

  //Use Reducer for validating states

  const [emailState, dispatchEmailState] = useReducer(
    emailReducer,
    defaultEmailState
  );

  const [passwordState, dispatchPasswordState] = useReducer(
    passwordReducer,
    defaultPasswordState
  );

  const emailChangeHandler = (event) => {
    dispatchEmailState({
      type: "INPUT",
      val: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({
      type: "INPUT",
      val: event.target.value,
    });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({
      type: "BLUR",
    });
  };

  const validateEmailHandler = () => {
    dispatchEmailState({
      type: "BLUR",
    });
  };

  //Set form validity

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //Handle Login

  const loginHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.login();
      authCtx.navChange();
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
          ref={emailInputRef}
          label="Email"
          isValid={emailIsValid}
          input={{
            type: "email",
            name: "email",
            id: "email",
            placeholder: "What's your email? 📧",
            onChange: emailChangeHandler,
            onBlur: validateEmailHandler,
          }}
        />
        {!emailIsValid && <p>Please enter a valid email (must contain '@')</p>}
        <Input
          ref={passwordInputRef}
          label="Password"
          isValid={passwordIsValid}
          input={{
            type: "password",
            name: "password",
            id: "password",
            placeholder: "Make it strong 💪",
            onChange: passwordChangeHandler,
            onBlur: validatePasswordHandler,
          }}
        />
        {!passwordIsValid && (
          <p>Please enter a valid password (greater than 6 characters)</p>
        )}
        <button>Submit</button>
      </form>
    </>
  );
};

export default Form;
