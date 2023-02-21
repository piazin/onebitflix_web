import Head from 'next/head';
import { useRouter } from 'next/router';
import { HeaderGeneric } from '../../../src/components/Common/HeaderGeneric';
import { useEffect, useState } from 'react';
import { courseService, CourseType } from '../../../src/services/courseService';
import { PageSpinner } from '../../../src/components/Common/Spinner';
import { Button, Container } from 'reactstrap';
import styles from '../../../styles/episodePlayer.module.scss';
import ReactPlayer from 'react-player';

export default function EpisodePlayer() {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>();
  const episodeOrder: string = router.query.id?.toString() || '';
  const courseId = router.query.courseid?.toString() || '';

  const getCourse = async () => {
    if (typeof courseId !== 'string') return;

    const res = await courseService.getEpisodes(courseId);
    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  if (course === undefined) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>
          Onebitflix -
          {
            //@ts-ignore
            course?.episodes[episodeOrder]?.name
          }
        </title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <main>
          <HeaderGeneric
            logoUrl="/home"
            btnContent={'Voltar para o curso'}
            btnUrl={`/course/${courseId}`}
          />
          <Container className="d-flex flex-column align-items-center gap-3 pt-5">
            <p className={styles.episodeTitle}>
              {
                //@ts-ignore
                course?.episodes[episodeOrder].name
              }
            </p>

            {typeof window === 'undefined' ? null : (
              <ReactPlayer
                className={styles.player}
                url={`${
                  process.env.NEXT_PUBLIC_BASEURL
                }/episodes/stream?videoUrl=${
                  //@ts-ignore
                  course.episodes[episodeOrder].videoUrl
                }&token=${sessionStorage.getItem('token')}`}
                controls
              />
            )}
            <div className={styles.episodeButton}>
              <Button className={styles.episodeButton}>
                <img
                  src="/episode/iconArrowLeft.svg"
                  alt="seta esquerda"
                  className={styles.arrowImg}
                />
              </Button>
              <Button className={styles.episodeButton}>
                <img
                  src="/episode/iconArrowRight.svg"
                  alt="seta direita"
                  className={styles.arrowImg}
                />
              </Button>
            </div>
          </Container>
        </main>
      </main>
    </>
  );
}
