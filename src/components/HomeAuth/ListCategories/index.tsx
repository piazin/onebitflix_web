import useSWR from 'swr';
import {
  categoriesService,
  CategoryType,
} from '../../../services/categoriesService';
import { ListCategoriesSlide } from '../ListCategoriesSlide';

export const ListCategories = () => {
  const { data, error } = useSWR(
    '/categories',
    categoriesService.getCategories
  );

  if (error) return error;
  if (!data) return <p>Loading...</p>;

  return (
    <>
      {data.data.categories?.map((category: CategoryType) => (
        <ListCategoriesSlide
          categoryId={category.id}
          categoryName={category.name}
          key={category.id}
        />
      ))}
    </>
  );
};
