import ReactDOM from "react-dom";

import Form from "../Login/Form";

import styles from "./Modal.module.css";

export const Background = (props) => {
  return (
    <div className={styles.background} onClick={props.onExit}>
      {props.children}
    </div>
  );
};

export const Overlay = (props) => {
  return (
    <div className={styles.overlay}>
      <Form onExit={props.onExit} />
    </div>
  );
};

const overlay = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Background onExit={props.onExit} />, overlay)}
      {ReactDOM.createPortal(<Overlay onExit={props.onExit} />, overlay)}
    </>
  );
};

export default Modal;
