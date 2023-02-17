import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container, Form, Input } from 'reactstrap';
import styles from './styles.module.scss';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { profileService } from '../../../services/profileService';

Modal.setAppElement('#__next');

export const HeaderAuth = () => {
  const router = useRouter();
  const [modalIsOpen, setIsModalIsOpen] = useState(false);
  const [initials, setInitials] = useState('');

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      const firstNameInitial = user.firstName.slice(0, 1);
      const lastNameInitial = user.lastName.slice(0, 1);
      setInitials(firstNameInitial + lastNameInitial);
    });
  }, []);

  const handleOpenModal = () => {
    setIsModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalIsOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();

    router.push('/');
  };

  return (
    <>
      <Container className={styles.nav}>
        <Link href="/home">
          <img
            src="/logoOnebitflix.svg"
            alt="logo onebitflix"
            className={styles.imgLogoNav}
          />
        </Link>
        <div className="d-flex align-items-center">
          <Form>
            <Input
              name="search"
              type="search"
              placeholder="pesquisar"
              className={styles.input}
            />
          </Form>
          <img
            src="/homeAuth/iconSearch.svg"
            alt="lupa header"
            className={styles.searchImg}
          />
          <p className={styles.userProfile} onClick={handleOpenModal}>
            {initials}
          </p>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          shouldCloseOnEsc={true}
          className={styles.modal}
          overlayClassName={styles.overlayModal}
        >
          <Link href="/profile" className="text-decoration-none">
            <p className={styles.modalLink}>Meus dados</p>
          </Link>
          <p className={styles.modalLink} onClick={handleLogout}>
            Sair
          </p>
        </Modal>
      </Container>
    </>
  );
};
