const Notification = ({ message, notificationType}) => {
  const notificationtype = "";
  if (message === null) {
    return null;
  }

  return <div className={`${notificationType}`}>{message}</div>;
};

export default Notification;
