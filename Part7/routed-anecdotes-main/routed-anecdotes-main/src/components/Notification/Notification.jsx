
const Notification = ({ message }) => {
  let notification = null

  if (message) {
    notification = (
      <div className='message'>
        {message}
      </div>
    )
  }

  return notification
}

export default Notification