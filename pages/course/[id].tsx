import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Container } from 'reactstrap';
import { HeaderAuth } from '../../src/components/Common/HeaderAuth';
import { courseService, CourseType } from '../../src/services/courseService';
import styles from '../../styles/coursePage.module.scss';

export default function Course() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<CourseType>();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const getCourses = async () => {
    if (typeof id !== 'string') return;

    const res = await courseService.getEpisodes(id);

    if (res.status === 200) {
      setCourse(res.data);
      setLiked(res.data.liked);
      setFavorited(res.data.favorited);
    }
  };

  useEffect(() => {
    getCourses();
  }, [id]);

  return (
    <>
      <Head>
        <title>Onebitflix - {course?.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '450px',
          }}
        >
          <HeaderAuth />
        </div>
        <Container className={styles.courseInfo}>
          <p className={styles.courseTitle}>{course?.name}</p>
          <p className={styles.courseDescription}>{course?.synopsis}</p>
          <Button outline className={styles.courseBtn}>
            Assistir agora!
            <img
              src="/buttonPlay.svg"
              alt="button img"
              className={styles.buttonImg}
            />
          </Button>
          <div className={styles.interactions}>
            <img
              src="/course/iconLike.svg"
              alt="like img"
              className={styles.interactionImage}
              // onClick={handleLikeCourse}
            />
            <img
              src="/course/iconAddFav.svg"
              alt="like img"
              className={styles.interactionImage}
              // onClick={handleFavCourse}
            />
          </div>
        </Container>
      </main>
    </>
  );
}
