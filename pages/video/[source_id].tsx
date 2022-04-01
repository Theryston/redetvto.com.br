import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import ModalShow from "../../components/ModalShow";
import { IShow, ISource } from "../../interfaces/IShow";
import Router from "next/router";
import Head from "next/head";

interface IProps {
  source: ISource;
}

const VideoSource: NextPage<IProps> = ({ source }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSSR, setIsSSR] = useState(false);

  useEffect(() => {
    setIsSSR(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    Router.push("/");
  };

  if (!isSSR) {
    return (
      <div>
        <Head>
          <title>Rede Tv - Tocantins</title>
          <meta name="description" content="Rede tv - Tocantins" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Rede Tv - Tocantins</title>
        <meta name="description" content="Rede tv - Tocantins" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <ModalShow
          isVisible={isVisible}
          source={source}
          show={
            {
              name: source.show_name,
            } as IShow
          }
          hiddenShow={true}
          onHide={handleClose}
        />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  const response = await fetch(`${process.env.API_URL}/show/source/list`);
  const sources: ISource[] = await response.json();

  for (const source of sources) {
    if (source.poster_key) {
      paths.push({
        params: {
          source_id: source._id,
        },
      });
    }
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(
    `${process.env.API_URL}/show/source/${context.params?.source_id}`
  );

  const source: ISource = await response.json();

  return {
    props: {
      source,
    },
  };
};

export default VideoSource;
