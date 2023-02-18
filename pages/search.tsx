import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { Footer } from '../src/components/Common/Footer';
import { HeaderAuth } from '../src/components/Common/HeaderAuth';
import { PageSpinner } from '../src/components/Common/Spinner';
import { SearchCard } from '../src/components/SearchCard';
import { courseService, CourseType } from '../src/services/courseService';
import styles from '../styles/search.module.scss';

export default function Search() {
  const router = useRouter();
  const searchName = router.query.name;
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);

  const searchCourses = async () => {
    if (typeof searchName === 'string') {
      const res = await courseService.getSearch(searchName);
      setSearchResult(res.data.courses);
    }
  };

  useEffect(() => {
    searchCourses();
  }, [searchName]);

  if (!searchResult) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>Onebitflix - {searchName}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div className={styles.headerFooterBg}>
          <HeaderAuth />
        </div>

        {searchResult.length >= 1 ? (
          <div className={styles.searchResult}>
            <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
              {searchResult?.map((course) => (
                <SearchCard course={course} key={course.id} />
              ))}
            </Container>
          </div>
        ) : (
          <p className={styles.noSearchText}>
            Ops! Não foi possivel encontrar nada.
          </p>
        )}

        <div className={styles.headerFooterBg}>
          <Footer />
        </div>
      </main>
    </>
  );
}
