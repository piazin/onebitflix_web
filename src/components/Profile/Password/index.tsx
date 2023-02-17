import { FormEvent, useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from '../../../../styles/profile.module.scss';
import { profileService } from '../../../services/profileService';
import { ToastComponent } from '../../Common/Toast';

export const PasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [color, setColor] = useState('');
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    profileService.fetchCurrent().then((password) => {
      console.log(password);
      setCurrentPassword(password.currentPassword);
      setNewPassword(password.newPassword);
    });
  }, []);

  const handlePasswordUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword != confirmNewPassword) {
      setToastIsOpen(true);
      setToastMessage('Senha e confirmação de senha diferentes!');
      setColor('bg-danger');
      setTimeout(() => setToastIsOpen(false), 1000 * 3);

      return;
    }

    if (currentPassword === newPassword) {
      setToastIsOpen(true);
      setToastMessage('Não coloque a nova senha igual a senha antiga!');
      setColor('bg-danger');
      setTimeout(() => setToastIsOpen(false), 1000 * 3);

      return;
    }

    const res = await profileService.passwordUpdate({
      currentPassword,
      newPassword,
    });

    if (res.status === 204) {
      setToastIsOpen(true);
      setToastMessage('Senha alterada com sucesso!');
      setColor('bg-success');
      setTimeout(() => setToastIsOpen(false), 1000 * 3);

      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }

    if (currentPassword === newPassword) {
      setToastIsOpen(true);
      setToastMessage('Senha atual incorreta!');
      setColor('bg-danger');
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handlePasswordUpdate}>
        <div className={styles.inputDiv}>
          <FormGroup>
            <Label className={styles.label} for="currentPassword">
              SENHA ATUAL
            </Label>
            <Input
              name="currentPassword"
              type="password"
              id="currentPassword"
              placeholder="******"
              required
              maxLength={12}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.currentTarget.value)}
              className={styles.input}
            />
          </FormGroup>
        </div>
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="newPassword">
              NOVA SENHA
            </Label>
            <Input
              name="newPassword"
              type="password"
              id="newPassword"
              placeholder="******"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.currentTarget.value)}
              className={styles.inputFlex}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="confirmNewPassword">
              CONFIRMAR NOVA SENHA
            </Label>
            <Input
              name="confirmNewPassword"
              type="password"
              id="confirmNewPassword"
              placeholder="******"
              required
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.currentTarget.value)}
              className={styles.inputFlex}
            />
          </FormGroup>
        </div>
        <Button className={styles.formBtn} outline type="submit">
          Salvar
        </Button>
      </Form>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </>
  );
};
