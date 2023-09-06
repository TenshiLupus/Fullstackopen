import { createSlice } from "@reduxjs/toolkit";

const initialState = "Dummy text"

//Note: The return state of mutated state will be set as the new default state
const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        notifyMessage(state, action){
            return action.payload
        },
        clearNotification(state, action){
            return ""
        }
    }
})

export const setNotificationMessage = (message, seconds) => {
    return async (dispatch) => {
        dispatch(notifyMessage(message))
        setTimeout(() => {dispatch(clearNotification())},seconds * 1000)
    }
}

export const {notifyMessage, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer