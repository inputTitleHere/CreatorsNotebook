import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#8bc34a",
    },
    secondary: {
      main: "#eb912b",
    },
    tertiary: {
      main: "#78bef0",
    },
    quaternary: {
      main: "#f884f2",
    },
    error: {
      main: "#fc9f35",
    },
    warning: {
      main: "#f7554f",
    },
    info: {
      main: "#a7a7a7",
    },
    success: {
      main: "#1ef03b",
    },
    outline: {
      main: "#303030",
    },
  },
  // MUI typography에 사용되는 variant에 대한 css적인 설정
  typography: {
    h1:{
      fontFamily: ["HeaderBold"].join(","),
    },
    h2:{
      fontFamily: ["HeaderBold"].join(","),
    },
    h3:{
      fontFamily: ["HeaderBold"].join(","),
    },
    h4:{
      fontFamily: ["HeaderBold"].join(","),
    },
    h5:{
      fontFamily: ["HeaderBold"].join(","),
    },
    h6:{
      fontFamily: ["HeaderBold"].join(","),
    }
  },
});
