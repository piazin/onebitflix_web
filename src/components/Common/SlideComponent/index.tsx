import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { CourseType } from '../../../services/courseService';
import { SlideCard } from '../SlideCard';

interface props {
  courses: CourseType[];
}

export const SlideComponent = ({ courses }: props) => {
  return (
    <>
      <div>
        <Splide
          options={{
            type: 'loop',
            perPage: 4,
            perMove: 1,
            pagination: false,
          }}
        >
          {courses?.map((course) => (
            <SplideSlide key={course.id}>
              <SlideCard course={course} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
};
