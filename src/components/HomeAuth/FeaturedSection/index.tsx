import styles from './styles.module.scss';
import useSWR from 'swr';
import { courseService, CourseType } from '../../../services/courseService';
import { HeaderAuth } from '../../Common/HeaderAuth';
import { Button, Container } from 'reactstrap';
import Link from 'next/link';

export const FeaturedSection = () => {
  const { data, error } = useSWR('/featured', courseService.getFeaturedCourses);

  if (error) return error;
  if (!data) return <p>Loading...</p>;

  return (
    <>
      {
        data.data?.map((course: CourseType) => (
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '480px',
            }}
            key={course.id}
          >
            <HeaderAuth />
            <Container className="pt-4">
              <p className={styles.title}>{course.name}</p>
              <p className={styles.description}>{course.synopsis}</p>
              <Link
                href={`/courses/${course.id}`}
                className="text-decoration-none"
              >
                <Button outline color="light" className={styles.button}>
                  ACESSE AGORA!
                  <img
                    src="/buttonPlay.svg"
                    alt="button img"
                    className={styles.btnImg}
                  />
                </Button>
              </Link>
            </Container>
          </div>
        ))[0]
      }
    </>
  );
};
