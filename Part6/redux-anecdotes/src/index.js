import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'

import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NotificationContextProvider from './contexts/NotificationContext'
// import store from './store'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
  <NotificationContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotificationContextProvider>
  // </Provider>
)