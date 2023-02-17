import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from '../../../../styles/profile.module.scss';
import { profileService } from '../../../services/profileService';
import { ToastComponent } from '../../Common/Toast';

export const UserForm = () => {
  const router = useRouter();

  const [color, setColor] = useState('');
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [created_at, setCreated_at] = useState(new Date());

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setFirstName(user.firstName);
      setCreated_at(new Date(user.createdAt));
      setLastName(user.lastName);
      setPhone(user.phone);
      setEmail(user.email);
      setInitialEmail(user.email);
    });
  }, []);

  const handleUserUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await profileService.userUpdate({
      firstName,
      lastName,
      email,
      phone,
      created_at,
    });

    if (res === 200) {
      setToastIsOpen(true);
      setToastMessage('Informações alterados com sucesso!');
      setColor('bg-success');
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
      if (email !== initialEmail) {
        router.push('/login');
        sessionStorage.clear();
      }
    } else {
      setToastIsOpen(true);
      setToastMessage('Você não pode mudar para este email');
      setColor('bg-danger');
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleUserUpdate}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>
            {firstName.slice(0, 1)}
            {lastName.split('')[0]}
          </p>
          <p className={styles.userName}>
            {firstName} {lastName}
          </p>
        </div>
        <div className={styles.memberTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="icon profile"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Membro desde <br /> {created_at.getDate()} de{' '}
            {created_at.toLocaleDateString('pt-BR', { month: 'long' })} de{' '}
            {created_at.getFullYear()}
          </p>
        </div>
        <hr />
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="firstName">
              NOME
            </Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Qual o seu primeiro nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="lastName">
              SOBRENOME
            </Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Qual o seu segundo nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
          </FormGroup>
        </div>
        <div className={styles.inputDiv}>
          <FormGroup>
            <Label className={styles.label} for="phone">
              WHATSAPP / TELEGRAM
            </Label>
            <Input
              type="tel"
              name="phone"
              id="phone"
              placeholder="(xx) 9 xxxxx-xxxx"
              required
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="email">
              E-MAIL
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Coloque o seu email"
              required
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </FormGroup>
          <Button type="submit" className={styles.formBtn} outline>
            Salvar
          </Button>
        </div>
      </Form>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </>
  );
};
