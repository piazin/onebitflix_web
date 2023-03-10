import useSWR from 'swr';
import { categoriesService } from '../../../services/categoriesService';
import { SlideComponent } from '../../Common/SlideComponent';
import styles from '../../../../styles/slideCategory.module.scss';
import { PageSpinner } from '../../Common/Spinner';

interface props {
  categoryId: number;
  categoryName: string;
}

export const ListCategoriesSlide = ({ categoryId, categoryName }: props) => {
  const { data, error } = useSWR(`/categories/${categoryId}`, () =>
    categoriesService.getCourses(categoryId)
  );

  if (error) return error;
  if (!data) return <PageSpinner />;

  return (
    <>
      <p className={styles.titleCategory}>{categoryName}</p>

      <SlideComponent courses={data.data.courses} />
    </>
  );
};
