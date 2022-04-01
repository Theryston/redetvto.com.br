import { NextPage } from "next";
import Image from "next/image";
import { IShow } from "../../interfaces/IShow";
import styles from "../../styles/ShowPoster.module.css";

interface IProps {
  show: IShow;
  onClick: (show: IShow) => void;
}

const ShowPoster: NextPage<IProps> = ({ show, onClick }) => {
  return (
    <div
      onClick={() => {
        onClick(show);
      }}
    >
      <Image
        src={show.posters[0]}
        alt={show.name}
        width={160}
        height={250}
        objectFit="cover"
        className={styles.container}
        onError={(e) => {
          (e.target as any).src = "/placeholder.png";
        }}
      />
      <p className={styles.footerName}>
        {show.name.length > 80 ? `${show.name.substring(0, 80)}...` : show.name}
      </p>
      <p className={styles.firstDescription}>
        {show.short_description.length > 43
          ? show.short_description.substring(0, 43) + "..."
          : show.short_description}
      </p>
    </div>
  );
};

export default ShowPoster;
