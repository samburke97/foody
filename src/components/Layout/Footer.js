import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <footer className={styles.footer}>
        <div>
          <h2>Hungry?</h2>
        </div>
        <div className={styles.icons}>
          <span>
            <FaFacebook size={48} />
          </span>
          <span>
            <FaInstagram size={48} />
          </span>
          <span>
            <FaLinkedin size={48} />
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
