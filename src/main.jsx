import React, { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createAppTheme } from "./Theme.js"; 



  const getInitialMode = () => localStorage.getItem("mode") || "dark";
export function Main() {



  const [mode, setMode] = useState(getInitialMode);

  useEffect(()=>{
     localStorage.setItem("mode", mode)
  },[mode])



  const theme = useMemo(() => createAppTheme(mode), [mode]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App mode={mode} setMode={setMode} />
      </Provider>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
