import useSWR from 'swr';
import styles from '../../../../styles/slideCategory.module.scss';
import { courseService } from '../../../services/courseService';
import { SlideComponent } from '../../Common/SlideComponent';

export const FeaturedCategory = () => {
  const { data, error } = useSWR('/featured', courseService.getFeaturedCourses);

  if (error) return error;
  if (!data) return <p>Loading...</p>;

  return (
    <>
      <p className={styles.titleCategory}>EM DESTAQUE</p>
      <SlideComponent courses={data.data} />
    </>
  );
};
