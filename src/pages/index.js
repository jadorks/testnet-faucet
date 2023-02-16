import FaucetWidget from "@/components/FaucetWidget";
import styles from "@/styles/Home.module.css";
import DLCHead from "@/assets/images/dlc.png";

export default function Home() {
  return (
    <div className={styles.content}>
      <div className={styles.content__left}>
        <img src={DLCHead.src} />
      </div>
      <FaucetWidget />
    </div>
  );
}
