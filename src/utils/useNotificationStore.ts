import { useDispatch } from 'react-redux';

const useNotifications = () => {
  const dispatch = useDispatch();

  const handleNotification = (notification: { title: string; body: string; click_action?: string }) => {
    dispatch({ type: 'add_notification', payload: notification });
  };

  return { handleNotification };
};

export default useNotifications;