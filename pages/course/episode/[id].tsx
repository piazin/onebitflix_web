import Head from 'next/head';
import { useRouter } from 'next/router';
import { HeaderGeneric } from '../../../src/components/Common/HeaderGeneric';
import { useEffect, useRef, useState } from 'react';
import { courseService, CourseType } from '../../../src/services/courseService';
import { PageSpinner } from '../../../src/components/Common/Spinner';
import { Button, Container } from 'reactstrap';
import styles from '../../../styles/episodePlayer.module.scss';
import ReactPlayer from 'react-player';
import { episodeService } from '../../../src/services/episodeService';

export default function EpisodePlayer() {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>();
  const [isReady, setIsReady] = useState(false);
  const episodeOrder = parseFloat(router.query.id?.toString() || '');
  const episodeId = parseFloat(router.query.episodeid?.toString() || '');
  const courseId = router.query.courseid?.toString() || '';
  const [loading, setLoading] = useState(true);

  const [getEpisodeTime, setGetEpisodeTime] = useState(0);
  const [episodeTime, setEpisodeTime] = useState(0);

  const playerRef = useRef<ReactPlayer>(null);

  const handleGetEpisodeTime = async () => {
    const res = await episodeService.getWatchTime(episodeId);

    if (res.data !== null) {
      setGetEpisodeTime(res.data.seconds);
    }
  };

  const handleSetEpisodeTime = async () => {
    await episodeService.setWatchTime({
      episodeId,
      seconds: Math.round(episodeTime),
    });
  };

  const handlePlayerTime = () => {
    playerRef.current?.seekTo(getEpisodeTime);
    setIsReady(true);
  };

  if (isReady) {
    setTimeout(() => {
      handleSetEpisodeTime();
    }, 1000 * 3);
  }

  useEffect(() => {
    handleGetEpisodeTime();
  }, [router]);

  const getCourse = async () => {
    if (typeof courseId !== 'string') return;

    const res = await courseService.getEpisodes(courseId);
    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  const handleLastEpisode = () => {
    router.push(
      `/course/episode/${episodeOrder - 1}?courseid=${course?.id}&episodeid=${episodeId - 1}`
    );
  };

  const handleNextEpisode = () => {
    router.push(
      `/course/episode/${episodeOrder + 1}?courseid=${course?.id}&episodeid=${episodeId + 1}`
    );
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, []);

  if (course === undefined) return <PageSpinner />;
  //@ts-ignore
  if (episodeOrder + 1 < course?.episodes?.length) {
    if (
      Math.round(episodeTime) ===
      //@ts-ignore
      course.episodes[episodeOrder].secondsLong
    ) {
      handleNextEpisode();
    }
  }

  if (loading) return <PageSpinner />;
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
                url={`${process.env.NEXT_PUBLIC_BASEURL}/episodes/stream?videoUrl=${
                  //@ts-ignore
                  course.episodes[episodeOrder].videoUrl
                }&token=${sessionStorage.getItem('token')}`}
                controls
                playing={true}
                volume={0.6}
                ref={playerRef}
                onStart={handlePlayerTime}
                onProgress={(progress) => setEpisodeTime(progress.playedSeconds)}
              />
            )}
            <div className={styles.episodeButtonDiv}>
              <Button
                className={styles.episodeButton}
                disabled={episodeOrder === 0 ? true : false}
                onClick={handleLastEpisode}
              >
                <img
                  src="/episode/iconArrowLeft.svg"
                  alt="seta esquerda"
                  className={styles.arrowImg}
                />
              </Button>
              <Button
                className={styles.episodeButton}
                disabled={episodeOrder + 1 === course.episodes?.length ? true : false}
                onClick={handleNextEpisode}
              >
                <img
                  src="/episode/iconArrowRight.svg"
                  alt="seta direita"
                  className={styles.arrowImg}
                />
              </Button>
            </div>
            <p className="text-center py-4">
              {
                //@ts-ignore
                course?.episodes[episodeOrder]?.synopsis
              }
            </p>
          </Container>
        </main>
      </main>
    </>
  );
}
