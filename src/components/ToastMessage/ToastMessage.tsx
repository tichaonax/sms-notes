import { toast } from 'react-toastify';

export const ToastMessage = () => {

  const onNotify = (message: string) => toast(message);

  const onNotifySuccess = (message: string) => toast.success(message, {
    position: 'bottom-center',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const onNotifyError = (message: string) => toast.error(message, {
    position: 'bottom-center',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  return { onNotify, onNotifySuccess, onNotifyError };
}
