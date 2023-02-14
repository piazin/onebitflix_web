import Head from 'next/head';
import styles from '../styles/HomeNoAuth.module.scss';

const HomeNoAuth = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        <h1>Hello Word</h1>
      </main>
    </>
  );
};

export default HomeNoAuth;
