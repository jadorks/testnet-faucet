import React, { useState, useEffect } from "react";
import styles from "./faucet-widget.module.css";
import DisclaimerIcon from "@/assets/images/disclaimer.svg";
import {
  onInputNumberChange,
} from "@/utils/utils";

export default function FaucetWidget() {
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content__header}>
          <h3 className="alien-22 text-white">Faucet</h3>
        </div>
        <div className={styles.content__body}>
          <input
            type="text"
            placeholder="Wallet Address"
            className={styles.faucet__input}
            value={amount}
            onChange={(e) => {
              onInputNumberChange(e, function(){console.log("first")});
            }}
          />
          <p>{errorMessage}</p>
          <div className={styles.faucet__buttons}>
            <button
              className="flex justify-center items-center gap-1"
              // onClick={() => {
              //   handleRequestTokens();
              // }}
            >
              Receive Tokens
            </button>
          </div>
          <div className={styles.disclaimer}>
            <div className="flex items-center gap-1">
              <img src={DisclaimerIcon.src} alt="" />
              <h3 className="alien-16">DISCLAIMER</h3>
            </div>
            <ul className="inter-reg-14">
              <li>Limited to 5DC per day</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
