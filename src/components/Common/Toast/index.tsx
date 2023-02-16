import { Toast, ToastBody } from 'reactstrap';

interface props {
  isOpen: boolean;
  message: string;
  color: string;
}

export const ToastComponent = ({ color, isOpen, message }: props) => {
  return (
    <>
      <Toast
        className={`${color} text-white fixed-top ms-auto mt-3`}
        isOpen={isOpen}
      >
        <ToastBody className="text-center">{message}</ToastBody>
      </Toast>
    </>
  );
};