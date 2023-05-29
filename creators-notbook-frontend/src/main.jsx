import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./assets/global.scss";
import store from "./redux-store/configureStore";
import { router } from "./router/router";
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "./assets/themes/themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
