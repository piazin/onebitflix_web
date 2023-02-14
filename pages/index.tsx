import Head from 'next/head';
import styles from '../styles/HomeNoAuth.module.scss';
import HeaderNoAuth from '../src/components/HomeNoAuth/HeaderNotAuth';

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
        <HeaderNoAuth />
      </main>
    </>
  );
};

export default HomeNoAuth;
