import Head from 'next/head';
import { useRouter } from 'next/router';
import { HeaderAuth } from '../../src/components/Common/HeaderAuth';
import styles from '../../styles/coursePage.module.scss';

export default function Course() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <>
      <Head>
        <title>Onebitflix - {id}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
      </main>
    </>
  );
}
