import Toast from 'react-bootstrap/Toast';

function Toast({ message, variant = "dark" }) {
  return (
    <Toast bg={variant}>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default Toast;
