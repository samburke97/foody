import { useContext } from "react";

import ReactDOM from "react-dom";
import { AuthContext } from "../../store/auth-context";

import Form from "../Login/Form";
import Cart from "../Homepage/Meals/Cart/Cart";

import styles from "./Modal.module.css";

export const Background = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.background} onClick={authCtx.navChange}>
      {props.children}
    </div>
  );
};

export const Overlay = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.overlay}>
      {!authCtx.isLoggedIn && <Form />}

      {authCtx.isLoggedIn && <Cart />}
    </div>
  );
};

const overlay = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Background />, overlay)}
      {ReactDOM.createPortal(<Overlay />, overlay)}
    </>
  );
};

export default Modal;
