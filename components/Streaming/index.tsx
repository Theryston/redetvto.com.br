import { NextPage } from "next";
import styles from "../../styles/Streaming.module.css";

const Streaming: NextPage = () => {
  return (
    <iframe
      src="https://player.logicahost.com.br/player.php?player=50"
      style={{ border: "none" }}
      allowFullScreen
      className={styles.iframe}
    ></iframe>
  );
};

export default Streaming;
