import Head from 'next/head';
import { HeaderAuth } from '../src/components/Common/HeaderAuth';
import { FeaturedSection } from '../src/components/HomeAuth/FeaturedSection';

export default function HomeAuth() {
  return (
    <>
      <Head>
        <title>OneBitFlix - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        {/* <HeaderAuth /> */}
        <FeaturedSection />
      </main>
    </>
  );
}
