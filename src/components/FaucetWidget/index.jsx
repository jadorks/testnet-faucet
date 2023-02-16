import React, { createRef, useRef, useState } from "react";
import styles from "./faucet-widget.module.css";
import DisclaimerIcon from "@/assets/images/disclaimer.svg";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { ethers } from "ethers";
import Spinner from "@/assets/images/spinner.svg";

export default function FaucetWidget() {
  const [address, setAddress] = useState("");
  const recaptchaRef = useRef();
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [isPending, setIsPending] = useState(false);

  function handleInputChange(e) {
    const value = e.target.value;
    setAddress(value);
    const meetsLimit = value.length === 42;
    const isAddress = ethers.isAddress(value);

    if (meetsLimit && isAddress) {
      setIsValidAddress(true);
    }

    if (!isAddress) {
      setIsValidAddress(false);
    }
  }

  const asyncScriptOnLoad = () => {
    setCaptchaLoaded(true);
  }

  const handleSubmit = async () => {
    setIsPending(true);

    try {
      const token = await recaptchaRef.current
        .executeAsync()
        .then((res) => {
          return res;
        })
        .catch((error) => {
          throw error;
        });
      recaptchaRef.current.reset();
      const verification = await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/faucet/verify/`, {
          token: token,
        })
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log(error.message);
          }
          return undefined;
        });

      if (verification && verification?.success == true) {
        const req = await axios
          .post(`${process.env.NEXT_PUBLIC_BASE_URL}/faucet/`, {
            wallet_address: address,
          })
          .then((res) => {
            alert("Successfully claimed tokens");
          })
          .catch((error) => {
            if (error.response) {
              alert(error.response.data.message);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log(error.message);
            }
          });
      } else {
        alert("Failed to get tokens. Please try again");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to get tokens. Please try again");
    } finally {
      setIsPending(false);
      setIsValidAddress(false);
      setAddress("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content__header}>
          <h3 className="alien-22 text-white">Faucet</h3>
        </div>
        <div className={styles.content__body}>
          <label className="alien-14 ml-2 text-white" htmlFor="wallet_input">Testnet Wallet Address</label>
          <input
            id="wallet_input"
            type="text"
            placeholder="Enter your Wallet Address"
            className={styles.faucet__input}
            value={address}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={`${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}
            asyncScriptOnLoad={asyncScriptOnLoad}
          />
          {!isValidAddress && address.length > 0 && (
            <p className="text-center">Invalid Address</p>
          )}
          <div className={styles.faucet__buttons}>
            <button
              className="flex justify-center items-center gap-1"
              onClick={handleSubmit}
              disabled={!isValidAddress || isPending || !captchaLoaded}
            >
              Receive Test DC
              {isPending && <img className="w-6" src={Spinner.src} alt="" />}
            </button>
          </div>
          <div className={styles.disclaimer}>
            <div className="flex items-center gap-1">
              <img src={DisclaimerIcon.src} alt="" />
              <h3 className="alien-16">DISCLAIMER</h3>
            </div>
            <ul className="inter-reg-14">
              <li>Limited to 5DC per day</li>
              <li>Please consider donating unused DC to </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
