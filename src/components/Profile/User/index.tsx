import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from '../../../../styles/profile.module.scss';

export const UserForm = () => {
  return (
    <>
      <Form className={styles.form}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>LS</p>
          <p className={styles.userName}>LUCAS SOUZA</p>
        </div>
        <div className={styles.memberTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="icon profile"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Membro desde <br /> 20 de Abril de 2020
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
              value={'Lucas'}
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
              value={'Souza'}
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
              value={'+55 (21) 88888-8888'}
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
              value={'admin@admin.com'}
            />
          </FormGroup>
          <Button type="submit" className={styles.formBtn} outline>
            Salvar
          </Button>
        </div>
      </Form>
    </>
  );
};
