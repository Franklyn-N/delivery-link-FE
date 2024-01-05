import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"
import store from "./redux/store";
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider toastOptions={{ defaultOptions: {
                position: "top-right",
                duration: 5000,
                isClosable: true,
              }}}>
        <Provider store={store}>
            <App />
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
