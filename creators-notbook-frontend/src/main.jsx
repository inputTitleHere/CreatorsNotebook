import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./assets/global.scss";
import store from "./redux-store/configureStore";
import { router } from "./router/router";
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "./assets/themes/themes";
import { GlobalStyles } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles
          styles={{
            "*::-webkit-scrollbar": {
              width: "0.7rem",
              height: "0.7rem",
            },
            "*::-webkit-scrollbar-track": {
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: "#ecb16d",
              // borderRadius: "3px",
            },
          }}
        />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  // {/* </React.StrictMode> */}
);
