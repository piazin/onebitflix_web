import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Footer } from '../src/components/Common/Footer';
import { PageSpinner } from '../src/components/Common/Spinner';
import { FavoriteCategory } from '../src/components/HomeAuth/FavoriteCategory';
import { FeaturedCategory } from '../src/components/HomeAuth/FeaturedCategory';
import { FeaturedSection } from '../src/components/HomeAuth/FeaturedSection';
import { ListCategories } from '../src/components/HomeAuth/ListCategories';
import { NewestCategory } from '../src/components/HomeAuth/NewestCategory';

export default function HomeAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>OneBitFlix - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
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
