import { Container } from 'reactstrap';
import styles from './styles.module.scss';

export const Footer = () => {
  return (
    <>
      <Container className={styles.footer}>
        <img
          src="/logoOnebitcode.svg"
          alt="logo footer"
          className={styles.footerLogo}
        />
        <a
          href="http://onebitcode.com"
          target="_blank"
          rel="external"
          className={styles.footerLink}
        >
          ONEBITCODE.COM
        </a>
      </Container>
    </>
  );
};
