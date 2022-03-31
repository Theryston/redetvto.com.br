import { NextPage } from "next";
import { IShow } from "../../interfaces/IShow";
import styles from "../../styles/ShowPoster.module.css";

interface IProps {
  show: IShow;
  onClick: (show: IShow) => void;
}

const ShowPoster: NextPage<IProps> = ({ show, onClick }) => {
  return (
    <div>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${show.posters[0]})`,
        }}
        onClick={() => {
          onClick(show);
        }}
      ></div>
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
