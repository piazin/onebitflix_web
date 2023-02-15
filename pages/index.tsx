import Head from 'next/head';
import { GetStaticProps } from 'next';
import styles from '../styles/HomeNoAuth.module.scss';
import HeaderNoAuth from '../src/components/HomeNoAuth/HeaderNotAuth';
import { PresentationSection } from '../src/components/HomeNoAuth/PresentationSection';
import { CardsSection } from '../src/components/HomeNoAuth/CardsSection';
import { SlideSection } from '../src/components/HomeNoAuth/SlideSection';
import { courseService, CourseType } from '../src/services/courseService';
import { ReactNode } from 'react';
import { Footer } from '../src/components/Common/Footer';

interface IndexPageProps {
  chrildren?: ReactNode;
  course: CourseType[];
}

const HomeNoAuth = ({ course }: IndexPageProps) => {
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
        <div className={styles.sectionBackground}>
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <CardsSection />
        <SlideSection newestCourses={course} />
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
