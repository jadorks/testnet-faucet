import React from "react";
import styles from "./navbar.module.css";
import DLCLogo from "@/assets/images/dlc-logo.svg";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.nav__left}>
          <a
            href="https://deeplearningchain.io"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img className="w-32" src={DLCLogo.src} alt="logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
