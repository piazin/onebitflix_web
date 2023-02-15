import Aos from 'aos';
import 'aos/dist/aos.css';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { ReactNode, useEffect } from 'react';
import styles from '../styles/HomeNoAuth.module.scss';
import HeaderNoAuth from '../src/components/HomeNoAuth/HeaderNotAuth';
import { PresentationSection } from '../src/components/HomeNoAuth/PresentationSection';
import { CardsSection } from '../src/components/HomeNoAuth/CardsSection';
import { SlideSection } from '../src/components/HomeNoAuth/SlideSection';
import { courseService, CourseType } from '../src/services/courseService';
import { Footer } from '../src/components/Common/Footer';

interface IndexPageProps {
  chrildren?: ReactNode;
  course: CourseType[];
}

const HomeNoAuth = ({ course }: IndexPageProps) => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Head>
        <title>OneBitFlix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="OneBitFlix" key="title" />
        <meta
          name="description"
          content="Tenha acesso aos melhores conteúdos sobre programação de uma forma simples e fácil."
        />
      </Head>
      <main>
        <div
          className={styles.sectionBackground}
          data-aos="fade-zoom-in"
          data-aos-duration="1600"
        >
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <div data-aos="fade-right" data-aos-duration="1200">
          <CardsSection />
        </div>
        <div data-aos="fade-up" data-aos-duration="1350">
          <SlideSection newestCourses={course} />
        </div>
        <Footer />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await courseService.getNewestCourses();
  return {
    props: {
      course: response!.data,
    },
    revalidate: 3600 * 24,
  };
};

export default HomeNoAuth;
