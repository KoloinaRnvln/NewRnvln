import {
  ChakraProvider,
  ColorModeScript,
  createStandaloneToast,
} from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./Controler/App";
import { apiSlice } from "./Controler/Redux/Features/apiSlice";
import authReducer from "./Controler/Redux/Features/authSlice";
import { theme } from "./Styles/Theme";

const { ToastContainer } = createStandaloneToast();
const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([apiSlice.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
