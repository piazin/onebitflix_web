import Head from 'next/head';
import { HeaderGeneric } from '../src/components/Common/HeaderGeneric';
import styles from '../styles/registerLogin.module.scss';
import { Form, FormGroup, Label, Container, Button, Input } from 'reactstrap';
import { Footer } from '../src/components/Common/Footer';

export default function register() {
  return (
    <>
      <Head>
        <title>Onebitflix - Registro</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <script src="https://jsuites.net/v4/jsuites.js"></script>
      </Head>
      <main className={styles.main}>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/login"
          btnContent="Quero fazer login"
        />
        <Container className="py-5">
          <p className={styles.formTitle}>
            <strong>Bem-vindo(a) ao OneBitFlix!</strong>
          </p>

          <Form className={styles.form}>
            <p className="text-center">
              <strong>Faça a sua conta!</strong>
            </p>

            <FormGroup>
              <Label for="firstName" className={styles.label}>
                NOME
              </Label>
              <Input
                id="firstName"
                placeholder="qual é o seu nome?"
                name="firstName"
                type="text"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName" className={styles.label}>
                SOBRENOME
              </Label>
              <Input
                id="lastName"
                placeholder="qual é o seu sobrenome?"
                name="lastName"
                type="text"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone" className={styles.label}>
                WHATSAPP / TELEGRAM
              </Label>
              <Input
                id="phone"
                placeholder="(xx) 9xxxx-xxxx"
                name="phone"
                type="tel"
                required
                data-mask="+55 (00) 9 0000-0000"
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email" className={styles.label}>
                E-MAIL
              </Label>
              <Input
                id="email"
                placeholder="digite seu e-mail"
                name="email"
                type="email"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birth" className={styles.label}>
                DATA DE NASCIMENTO
              </Label>
              <Input
                id="birth"
                name="birth"
                type="date"
                min="1930-01-01"
                max="2022-12-31"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                SENHA
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                required
                minLength={6}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                CONFIRMAR SENHA
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                required
                minLength={6}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <Button type="submit" outline className={styles.formBtn}>
              Cadastrar
            </Button>
          </Form>
        </Container>
        <Footer />
      </main>
    </>
  );
}
