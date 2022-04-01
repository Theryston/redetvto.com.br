import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Streaming from "../components/Streaming";
import styles from "../styles/Home.module.css";

import ArrowImage from "../public/arrow.png";
import { IEpisode, ISeason, IShow } from "../interfaces/IShow";
import ShowPoster from "../components/ShowPoster";
import ModalShow from "../components/ModalShow";

interface IProps {
  logo_url: string;
  mainShows: IShow[];
  reliShows: IShow[];
  otherShows: IShow[];
}

interface ILogo {
  id: string;
  url: string;
}

const Home: NextPage<IProps> = ({
  logo_url,
  mainShows,
  reliShows,
  otherShows,
}) => {
  console.log(otherShows);
  const [showStreaming, setShowStreaming] = useState(true);
  const [showDetails, setShowDetails] = useState<IShow>({} as IShow);
  const [showDetailsIsVisible, setShowDetailsIsVisible] = useState(false);

  const handleShowDetails = (show: IShow) => {
    setShowStreaming(false);
    setShowDetails(show);
    setShowDetailsIsVisible(true);
  };

  const handleCloseShowDetails = () => {
    setShowStreaming(true);
    setShowDetails({} as IShow);
    setShowDetailsIsVisible(false);
  };

  return (
    <div className={styles.container}>
      <ModalShow
        show={showDetails}
        isVisible={showDetailsIsVisible}
        onHide={handleCloseShowDetails}
      />
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
        <div className={styles.containerShows}>
          {mainShows.map((show, index) => (
            <div key={index}>
              <ShowPoster show={show} onClick={handleShowDetails} />
            </div>
          ))}
        </div>
        {otherShows && (
          <div className="container--showsScroll">
            <div className={styles.containerScroll}>
              {otherShows.map((show, index) => (
                <div key={index} className={styles.containerShowsScroll}>
                  <ShowPoster show={show} onClick={handleShowDetails} />
                </div>
              ))}
            </div>
          </div>
        )}
        {reliShows && (
          <div className="container--showsScroll">
            <div className={styles.containerScroll}>
              {reliShows.map((show, index) => (
                <div key={index} className={styles.containerShowsScroll}>
                  <ShowPoster show={show} onClick={handleShowDetails} />
                </div>
              ))}
            </div>
          </div>
        )}
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

  const getAllShows = async (): Promise<IShow[]> => {
    const res = await fetch(`${process.env.API_URL}/show/list`);
    const shows = await res.json();

    return shows;
  };

  const getAllEpisodesByAllShows = async (shows: IShow[]): Promise<IShow[]> => {
    const showsWithEpisodes: IShow[] = [];
    for (const show of shows) {
      const newSeasons: ISeason[] = [];

      for (const season of show.seasons) {
        const newEpisodes: IEpisode[] = [];

        for (const episode of season.episodes) {
          const res = await fetch(
            `${process.env.API_URL}/show/episode/${episode}`
          );
          const episodes = await res.json();

          newEpisodes.push(episodes);
        }

        newSeasons.push({ ...season, episodes: newEpisodes });
      }

      showsWithEpisodes.push({ ...show, seasons: newSeasons });
    }

    return showsWithEpisodes;
  };

  const logo: ILogo = await getLogoData();
  const allShowsWithoutEpisodes = await getAllShows();
  const allShow = await getAllEpisodesByAllShows(allShowsWithoutEpisodes);

  return {
    props: {
      logo_url: logo.url,
      mainShows: allShow.filter((show) => show.main),
      reliShows: allShow.filter((s: any): any => {
        return s.categories.filter(
          (c: any) => c.name === "Programas religiosos"
        ).length > 0
          ? true
          : false && !s.main;
      }),
      otherShows: allShow.filter((s: any): any => {
        return s.categories.filter(
          (c: any) => c.name === "Programas religiosos"
        ).length > 0
          ? false
          : true && !s.main;
      }),
    },
    revalidate: 60 * 1, // 1 minute
  };
};

export default Home;
