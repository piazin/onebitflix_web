import useSWR from 'swr';
import { courseService } from '../../../services/courseService';
import { SlideComponent } from '../../Common/SlideComponent';
import styles from '../../../../styles/slideCategory.module.scss';

export const NewestCategory = () => {
  const { data, error } = useSWR('/newest', courseService.getNewestCourses);

  if (error) return error;
  if (!data) return <p>Loading...</p>;

  return (
    <>
      <p className={styles.titleCategory}>LANÇAMENTOS</p>
      <SlideComponent courses={data.data} />
    </>
  );
};
