import Head from 'next/head';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/registerLogin.module.scss';
import { Footer } from '../src/components/Common/Footer';
import { HeaderGeneric } from '../src/components/Common/HeaderGeneric';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { ToastComponent } from '../src/components/Common/Toast';
import { authService } from '../src/services/authService';

export default function Login() {
  const router = useRouter();
  const [toastColor, setToastColor] = useState('');
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const successfullyRegistered = router.query.registred;

  useEffect(() => {
    if (successfullyRegistered === 'true') {
      setToastColor('bg-success');
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage('Cadastro feito com sucesso!');
    }
  }, [router.query]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')!.toString();
    const password = formData.get('password')!.toString();
    const params = { email, password };

    const { status } = await authService.login(params);

    if (status === 200) {
      router.push('/home');
    } else {
      setToastColor('bg-danger');
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage('E-mail ou senha incorretos!');
    }
  };

  return (
    <>
      <Head>
        <title> Onebitflix - Login</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/register"
          btnContent="Quero fazer parte!"
        />

        <Container className="py-5">
          <p className={styles.formTitle}>Bem-vindo(a) de volta!</p>
          <Form className={styles.form} onSubmit={handleLogin}>
            <p className="text-center">
              <strong>Bem-vindo(a) ao OneBitFlix!</strong>
            </p>
            <FormGroup>
              <Label className={styles.label} for="email">
                EMAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="qual o seu e-mail?"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label className={styles.label} for="password">
                SENHA
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="qual a sua senha?"
                required
                className={styles.input}
              />
            </FormGroup>
            <Button outline type="submit" className={styles.formBtn}>
              Entrar
            </Button>
          </Form>
          <ToastComponent
            color={toastColor}
            isOpen={toastIsOpen}
            message={toastMessage}
          />
        </Container>
        <Footer />
      </main>
    </>
  );
}
