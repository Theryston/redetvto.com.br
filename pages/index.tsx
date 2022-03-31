import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Streaming from "../components/Streaming";
import styles from "../styles/Home.module.css";

import ArrowImage from "../public/arrow.png";

interface IProps {
  logo_url: string;
}

interface ILogo {
  id: string;
  url: string;
}

const Home: NextPage<IProps> = ({ logo_url }) => {
  const [showStreaming, setShowStreaming] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Rede Tv - Tocantins</title>
        <meta name="description" content="Rede tv - Tocantins" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.containerStreaming}>
          {showStreaming && <Streaming />}
          {logo_url && (
            <Image
              src={logo_url}
              alt="Logo da Rede Tv"
              width={144}
              height={81.11}
              className={styles.logoRedetv}
            />
          )}
        </div>
        <section className={styles.containerSection}>
          <Image src={ArrowImage} alt="Arrow" width={30} height={19.72} />
          <p>Rede TV TocantinsFLIX</p>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const getLogoData = async (): Promise<ILogo> => {
    const res = await fetch(`${process.env.API_URL}/show/redetv/logo`);
    const logo = await res.json();

    return {
      id: logo.id,
      url: logo.url,
    };
  };

  const logo: ILogo = await getLogoData();

  return {
    props: {
      logo_url: logo.url,
    },
  };
};

export default Home;
