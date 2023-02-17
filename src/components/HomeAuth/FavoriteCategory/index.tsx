import useSWR from 'swr';
import styles from '../../../../styles/slideCategory.module.scss';
import { courseService } from '../../../services/courseService';
import { SlideComponent } from '../../Common/SlideComponent';

export const FavoriteCategory = () => {
  const { data, error } = useSWR('/favorites', courseService.getFavCourse);

  if (error) return error;
  if (!data) return <p>Loading...</p>;

  return (
    <>
      <p className={styles.titleCategory}>MINHA LISTA</p>
      {data.data?.courses.length >= 1 ? (
        <SlideComponent courses={data.data.courses} />
      ) : (
        <p className="text-center pt-3 h5">
          <strong>Nada por aqui</strong>
        </p>
      )}
    </>
  );
};
