import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer:{
        blogs: blogsReducer,
        filter: blogsFIlterReducer,
        notificationMessage, notificationReducer
    }
})

export default store