import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showTost(message, type = 'success') {
  const options = {
    message,
    position: 'topRight',
    timeout: 5000,
  };

  switch (type) {
    case 'success':
      iziToast.success(options);
      break;
    case 'error':
      iziToast.error(options);
      break;
    case 'warning':
      iziToast.warning(options);
      break;
    case 'info':
      iziToast.info(options);
      break;
    default:
      iziToast.error({
        message: 'Invalid type of toast',
        timeout: 5000,
        position: 'topRight',
      });
  }
}

export function isQueryEmpty(query) {
  return query === '';
}
