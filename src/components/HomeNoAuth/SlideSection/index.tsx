import styles from './styles.module.scss';
import Link from 'next/link';
import { Button, Container } from 'reactstrap';
import { CourseType } from '../../../services/courseService';
import { SlideComponent } from '../../Common/SlideComponent';

interface props {
  newestCourses: CourseType[];
}

export const SlideSection = ({ newestCourses }: props) => {
  return (
    <>
      <Container className="d-flex flex-column align-items-center py-5">
        <p className={styles.sectionTitle}>Aulas já disponíveis</p>
        <SlideComponent courses={newestCourses} />
        <Link href="/register">
          <Button outline color="light" className={styles.slideSectionBtn}>
            Se cadastre agora!
          </Button>
        </Link>
      </Container>
    </>
  );
};
