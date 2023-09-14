import { createContext, useContext, useReducer} from "react";

const notificationReducer = (state, action) => {
    switch(action.type){
      case "NOTIFICATION":
        return action.payload
      case "CLEAR":
        return ""
      case "ERROR":
        return action.payload
      default: 
        return ""
    }
  }

const NotificationContext = createContext()

const NotificationContextProvider = ({children}) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, "")

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationStringAndDispatch = useContext(NotificationContext)
    return notificationStringAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationStringAndDispatch = useContext(NotificationContext)
    return notificationStringAndDispatch[1]
}

export default NotificationContextProvider