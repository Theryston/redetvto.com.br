import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { IEpisode, ISeason, IShow, ISource } from "../../interfaces/IShow";

import styles from "../../styles/ModalShow.module.css";

interface IProps {
  show?: IShow;
  isVisible: boolean;
  onHide: () => void;
  hiddenShow?: boolean;
  source?: ISource;
}

const ModalShow: NextPage<IProps> = ({
  show,
  isVisible,
  onHide,
  hiddenShow,
  source,
}) => {
  const [sectionSelected, setSectionSelected] = useState<ISeason>(
    {} as ISeason
  );
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode>(
    {} as IEpisode
  );
  const [scrollX, setScrollX] = useState<number>(0);
  const inputShareRef = useRef(null);
  let widthContainer = 0;

  useEffect(() => {
    if (hiddenShow && source) {
      setSelectedEpisode({
        _id: "show source",
        sources: [
          {
            ...source,
            key: source.url,
            main: true,
          },
        ],
      } as IEpisode);
      handleNewView(source._id);
    }
  }, [hiddenShow, source]);

  const handleNewView = async (sourceId?: string) => {
    if (sourceId) {
      await fetch(`${process.env.API_URL}/show/source/view/${sourceId}`, {
        method: "PUT",
      });
    }
  };

  const handleSelectedEpisode = (episode: IEpisode) => {
    setSelectedEpisode(episode);
    handleNewView(episode.sources.find((s) => s.main)?._id);
  };

  if (typeof window !== "undefined") {
    widthContainer = window.innerWidth;
  }

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(widthContainer / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };
  const handleRightArrow = () => {
    let x = scrollX - Math.round(widthContainer / 2);
    let listW = sectionSelected.episodes.length * 220;

    if (widthContainer - listW > x) {
      x = widthContainer - listW - 60;
    }

    setScrollX(x);
  };

  const handleClose = () => {
    setSectionSelected({} as ISeason);
    setSelectedEpisode({} as IEpisode);
    setScrollX(0);
    onHide();
  };

  const handleCopyLink = () => {
    if (inputShareRef.current && navigator) {
      (inputShareRef.current as any).select();
      navigator.clipboard.writeText((inputShareRef.current as any).value);
      alert("Link copiado com sucesso!");
    }
  };

  return (
    <div>
      <Modal show={isVisible} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>{show?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "90vh" }}>
          {selectedEpisode && selectedEpisode._id && (
            <div>
              <video
                className={styles.video}
                autoPlay={true}
                src={selectedEpisode.sources.find((s) => s.main)?.key}
                poster={selectedEpisode.sources.find((s) => s.main)?.poster_key}
                controls
              ></video>
              <input
                type="hidden"
                value={`https://www.redetvto.com.br/video/${
                  selectedEpisode.sources.find((s) => s.main)?._id
                }`}
                ref={inputShareRef}
              />
              <div className={styles.containerShares}>
                <button
                  onClick={() => {
                    handleCopyLink();
                  }}
                  className="btn btn-primary"
                >
                  Copiar link
                </button>
                <div>
                  {(selectedEpisode.sources.find((s) => s.main)?.views_count ||
                    0) + 1}{" "}
                  visualizações
                </div>
              </div>
            </div>
          )}
          {!hiddenShow && (
            <div className={styles.body}>
              {show?.posters && widthContainer > 768 && !sectionSelected._id && (
                <Image
                  src={show?.posters[0]}
                  alt="Capa do programa"
                  className={styles.showPoster}
                  width={247.0588235294118}
                  height={300}
                  objectFit="cover"
                  style={{
                    borderRadius: "10px",
                  }}
                />
              )}
              <div className={styles.containerEps}>
                {sectionSelected && sectionSelected.episodes && (
                  <div className={styles.episodesContainer}>
                    {scrollX !== 0 && (
                      <div
                        className={styles.movieRowLeft}
                        onClick={handleLeftArrow}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          fill="currentColor"
                          className="bi bi-caret-left-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                        </svg>
                      </div>
                    )}
                    {scrollX >
                      (widthContainer || 0) -
                        sectionSelected.episodes.length * 220 -
                        60 && (
                      <div
                        className={styles.movieRowRight}
                        onClick={handleRightArrow}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          fill="currentColor"
                          className="bi bi-caret-right-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                      </div>
                    )}
                    <div className={styles.listArea}>
                      <div
                        className={styles.episodesList}
                        style={{
                          width: `${230 * sectionSelected.episodes.length}px`,
                          marginLeft: `${scrollX}px`,
                        }}
                      >
                        {sectionSelected.episodes.map((episode, index) => (
                          <>
                            {episode && (
                              <div
                                onClick={() => {
                                  handleSelectedEpisode(episode);
                                }}
                                className={styles.episode}
                                key={index}
                              >
                                <Image
                                  src={episode.sources[0].poster_key}
                                  alt="poster"
                                  className={styles.episodeImage}
                                  width={220}
                                  height={120}
                                />
                                <div className="footer">
                                  <p className="name">{episode.name}</p>
                                </div>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {show?.seasons && (
                  <div className={styles.seasons}>
                    {show?.seasons.map((season) => (
                      <button
                        onClick={() => {
                          setScrollX(0);
                          setSelectedEpisode({} as IEpisode);
                          setSectionSelected(season);
                        }}
                        key={season._id}
                      >
                        {season.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalShow;
