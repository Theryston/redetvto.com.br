import { NextPage } from "next";
import { IViews } from "../../interfaces/IViews";
import styles from "../../styles/Footer.module.css";
import Image from "next/image";

import facebookImage from "../../public/facebook.png";
import wppImage from "../../public/wpp.png";
import instagramImage from "../../public/instagram.png";
import { useEffect } from "react";

interface IProps {
  views: IViews;
  logo_url: string;
}

const generateString = (length: number) => {
  let randomString = "";
  let caractere =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    randomString += caractere.charAt(
      Math.floor(Math.random() * caractere.length)
    );
  }
  return randomString;
};

const Footer: NextPage<IProps> = ({ views, logo_url }) => {
  useEffect(() => {
    const setViewOnline = async () => {
      if (localStorage) {
        let ip = localStorage.getItem("ip");
        if (ip === null) {
          localStorage.setItem("ip", await generateString(1000));
          ip = localStorage.getItem("ip");
        }
        fetch(`${process.env.API_URL}/show/view`, {
          method: "POST",
          body: JSON.stringify({ user_ip: ip }),
        });
      }
    };
    setViewOnline();

    const setViewOffline = () => {
      const load = async () => {
        let ip = localStorage.getItem("ip");
        if (ip === null) {
          localStorage.setItem("ip", await generateString(1000));
          ip = localStorage.getItem("ip");
        }
        await fetch(`${process.env.API_URL}/show/view`, {
          method: "PATCH",
          body: JSON.stringify({ user_ip: ip }),
        });
      };
      load();
    };

    return setViewOffline;
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.body}>
          <input
            type="text"
            className={styles.counterInput}
            value={`Visitas ao site: ${views.geral_amount}`}
            disabled
          />
          <input
            type="text"
            className={styles.counterInput}
            value={`Online agora: ${views.online_amount}`}
            disabled
          />
        </div>
        <div className={`${styles.container} ${styles.containerSocial}`}>
          <div className={`${styles.body} ${styles.bodySocial}`}>
            <a href="https://web.facebook.com/redetvto">
              <Image src={facebookImage} alt="Facebook da Rede Tv" />
            </a>
            <a href="https://api.whatsapp.com/message/EUPPDCURLWWPK1">
              <Image src={wppImage} alt="WhatsApp da Rede Tv" />
            </a>
            <a href="https://www.instagram.com/redetvto/">
              <Image src={instagramImage} alt="Instagram da Rede Tv" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.containerRedeTvLogo}>
        <Image
          src={logo_url}
          alt="Logo da Rede Tv"
          width={144}
          height={81.11}
        />
      </div>
      <p className={styles.paragraph}>
        Copyright (c) 2021 - REDETV Tocantins - Palmas - Tocantins
      </p>
    </footer>
  );
};

export default Footer;
