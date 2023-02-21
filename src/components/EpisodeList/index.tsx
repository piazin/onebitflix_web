import { EpisodeType } from '../../services/courseService';
import styles from './styles.module.scss';

interface props {
  episode: EpisodeType;
}

export const EpisodeList = ({ episode }: props) => {
  const handleSecondsToMin = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    function toString(num: number) {
      return num.toString().padStart(2, '0');
    }

    return `${toString(minutes)}:${toString(seconds)}`;
  };

  return (
    <>
      <div className={styles.episodeCard}>
        <div className={styles.episodeOrderTime}>
          <p className={styles.episodeOrder}>Episódio N* - {episode.order} </p>
          <p className={styles.episodeTime}>
            {handleSecondsToMin(episode.secondsLong)}
          </p>
        </div>
        <div className={styles.episodeTitleDescription}>
          <p className={styles.episodeTitle}> {episode.name}</p>
          <p className={styles.episodeDescription}>
            {episode.synopsis}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            sit asperiores accusamus itaque, obcaecati nesciunt repudiandae
            similique ratione quidem error doloremque, fugiat, veritatis quae
            aliquid perspiciatis ut enim. Ducimus non molestias dignissimos
            laborum quis, ipsam sunt ab suscipit aperiam voluptatibus eum
            perferendis nam harum aliquam vero explicabo rem. Excepturi, omnis!
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus,
            reiciendis?
          </p>
        </div>
      </div>
    </>
  );
};
