import Head from 'next/head';
import { useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Footer } from '../src/components/Common/Footer';
import { HeaderAuth } from '../src/components/Common/HeaderAuth';
import { UserForm } from '../src/components/Profile/User';
import styles from '../styles/profile.module.scss';

export default function Profile() {
  const [stateOfWindows, setStateOfWindows] = useState('user');

  const switchToUserWindow = () => setStateOfWindows('user');
  const switchToPasswordWindow = () => setStateOfWindows('password');

  return (
    <>
      <Head>
        <title>Onebitflix - Meus dados</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        <Container className="py-5">
          <p className={styles.title}>Minha conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button
                className={styles.renderFormBtn}
                onClick={switchToUserWindow}
              >
                DADOS PESSOAIS
              </Button>
              <Button
                className={styles.renderFormBtn}
                onClick={switchToPasswordWindow}
              >
                SENHA
              </Button>
            </Col>
            <Col md>
              {stateOfWindows === 'user' ? <UserForm /> : <p>Senha</p>}
            </Col>
          </Row>
        </Container>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
}
