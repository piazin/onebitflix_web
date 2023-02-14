import Head from 'next/head';
import styles from '../styles/HomeNoAuth.module.scss';
import HeaderNoAuth from '../src/components/HomeNoAuth/HeaderNotAuth';
import { PresentationSection } from '../src/components/HomeNoAuth/PresentationSection';
import { CardsSection } from '../src/components/HomeNoAuth/CardsSection';

const HomeNoAuth = () => {
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
      </main>
    </>
  );
};

export default HomeNoAuth;
