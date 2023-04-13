const Notification = ({ message}) => {
    const notificationtype = "";
    if (message === null) {
      return null;
    }
  
    return <div>{message}</div>;
  };
  
  export default Notification;
  