import styles from './styles.module.scss';
import { Container, Row, Col, Button } from 'reactstrap';
import Link from 'next/link';

export const PresentationSection = () => {
  return (
    <>
      <Container className="py-4">
        <Row>
          <Col
            md
            className="d-flex flex-column justify-content-center align-items-start"
          >
            <p className={styles.subTitle}>Acesso ILIMITADO</p>
            <p className={styles.title}>
              Tenha acesso aos melhores <br /> tutorias de Programação
            </p>
            <p className={styles.description}>
              Estude de onde estiver, a qualquer momento, e continue, <br />{' '}
              evoluindo como programador
            </p>
            <Link href="/register" className={styles.linkCta}>
              <Button outline className={styles.btnCta}>
                ACESSE AGORA{' '}
                <img
                  src="/buttonPlay.svg"
                  alt="button img"
                  className={styles.btnImg}
                />
              </Button>
            </Link>
          </Col>
          <Col md>
            <img
              src="/homeNoAuth/imgPresentation.png"
              alt="img presentation.png"
              className={styles.imgPresentation}
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center pt-5">
            <img
              src="/homeNoAuth/iconArrowDown.svg"
              alt="arrow down"
              className={styles.arrowDown}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
