import ReactDOM from "react-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import Form from "../Login/Form";
import Order from "../Homepage/Cart/Order";
import styles from "./Modal.module.css";

export const Background = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.background} onClick={authCtx.navChange}>
      {props.children}
    </div>
  );
};

export const Overlay = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.overlay}>
      {!authCtx.isLoggedIn && <Form />}

      {authCtx.isLoggedIn && <Order />}
    </div>
  );
};

const overlay = document.getElementById("overlay");

const Modal = () => {
  return (
    <>
      {ReactDOM.createPortal(<Background />, overlay)}
      {ReactDOM.createPortal(<Overlay />, overlay)}
    </>
  );
};

export default Modal;
