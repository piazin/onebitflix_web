import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Container } from 'reactstrap';
import { Footer } from '../../src/components/Common/Footer';
import { HeaderAuth } from '../../src/components/Common/HeaderAuth';
import { PageSpinner } from '../../src/components/Common/Spinner';
import { EpisodeList } from '../../src/components/EpisodeList';
import { courseService, CourseType } from '../../src/services/courseService';
import styles from '../../styles/coursePage.module.scss';

export default function Course() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<CourseType>();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, []);

  const courseName = `${course?.name}`;
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

  const handleLikeCourse = async () => {
    if (typeof id !== 'string') return;
    if (liked) {
      await courseService.removeLike(id);
      setLiked(false);
    } else {
      await courseService.like(id);
      setLiked(true);
    }
  };

  const handleFavCourse = async () => {
    if (typeof id !== 'string') return;
    if (favorited) {
      await courseService.removeFav(id);
      setFavorited(false);
    } else {
      await courseService.addToFav(id);
      setFavorited(true);
    }
  };

  if (course === undefined) return <PageSpinner />;

  if (loading) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>Onebitflix - {courseName}</title>
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
          <Button
            outline
            className={styles.courseBtn}
            disabled={course.episodes?.length === 0 ? true : false}
          >
            Assistir agora!
            <img
              src="/buttonPlay.svg"
              alt="button img"
              className={styles.buttonImg}
            />
          </Button>
          <div className={styles.interactions}>
            {liked ? (
              <img
                src="/course/iconLiked.svg"
                alt="like img"
                className={styles.interactionImage}
                onClick={handleLikeCourse}
              />
            ) : (
              <img
                src="/course/iconLike.svg"
                alt="like img"
                className={styles.interactionImage}
                onClick={handleLikeCourse}
              />
            )}

            {favorited ? (
              <img
                src="/course/iconFavorited.svg"
                alt="like img"
                className={styles.interactionImage}
                onClick={handleFavCourse}
              />
            ) : (
              <img
                src="/course/iconAddFav.svg"
                alt="like img"
                className={styles.interactionImage}
                onClick={handleFavCourse}
              />
            )}
          </div>
        </Container>
        <Container className={styles.episodeInfo}>
          <p className={styles.episodeDivision}>EPISÓDIOS</p>
          <p className={styles.episodeLength}>
            {course.episodes?.length} episódios
          </p>
          {course.episodes?.length === 0 ? (
            <p className="p-2 text-center">
              <strong>
                Não temos episódios ainda! Volte mais tarde &#x1F606;&#x1F918;
              </strong>
            </p>
          ) : (
            course.episodes?.map((episode) => (
              <EpisodeList episode={episode} key={episode.id} course={course} />
            ))
          )}
        </Container>
        <Footer />
      </main>
    </>
  );
}
