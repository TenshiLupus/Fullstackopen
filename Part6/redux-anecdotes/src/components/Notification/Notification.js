import { useNotificationValue } from "../../contexts/NotificationContext"

// import {useSelector} from "react-redux"

const Notification = () => {
  // const notification = useSelector(({notificationMessage}) => notificationMessage)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = useNotificationValue()

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification