import { useRouter } from 'next/router';
import { CourseType, EpisodeType } from '../../services/courseService';
import styles from './styles.module.scss';

interface props {
  episode: EpisodeType;
  course: CourseType;
}

export const EpisodeList = ({ episode, course }: props) => {
  const router = useRouter();

  const handleSecondsToMin = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    function toString(num: number) {
      return num.toString().padStart(2, '0');
    }

    return `${toString(minutes)}:${toString(seconds)}`;
  };

  const handleEpisodePlayer = () => {
    router.push(
      `/course/episode/${episode.order - 1}?courseid=${course.id}&episodeid=${
        episode.id
      }`
    );
  };

  return (
    <>
      <div className={styles.episodeCard} onClick={handleEpisodePlayer}>
        <div className={styles.episodeOrderTime}>
          <p className={styles.episodeOrder}>Episódio N* - {episode.order} </p>
          <p className={styles.episodeTime}>
            {handleSecondsToMin(episode.secondsLong)}
          </p>
        </div>
        <div className={styles.episodeTitleDescription}>
          <p className={styles.episodeTitle}> {episode.name}</p>
          <p className={styles.episodeDescription}>{episode.synopsis}</p>
        </div>
      </div>
    </>
  );
};
