import Head from 'next/head';
import { Footer } from '../src/components/Common/Footer';
import { HeaderAuth } from '../src/components/Common/HeaderAuth';
import { FavoriteCategory } from '../src/components/HomeAuth/FavoriteCategory';
import { FeaturedCategory } from '../src/components/HomeAuth/FeaturedCategory';
import { FeaturedSection } from '../src/components/HomeAuth/FeaturedSection';
import { ListCategories } from '../src/components/HomeAuth/ListCategories';
import { NewestCategory } from '../src/components/HomeAuth/NewestCategory';

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
        <NewestCategory />
        <FavoriteCategory />
        <FeaturedCategory />
        <ListCategories />
        <Footer />
      </main>
    </>
  );
}
