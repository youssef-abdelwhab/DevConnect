import AllPost from "./AllPost";
import NavBar from "./navBar/NavBar";
import Log_In from "./Log_In";
import CreatAccount from "./CreatAccount";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Snackbars from "./SnackBar";
import Portfolio from "./Portfolio";
import { FC } from "react";
import { ThemeModeType } from "../types/ThemeMode";

const App: FC<ThemeModeType> = ({ mode, setMode }) => {
  return (
    <>
      <BrowserRouter>
        <NavBar mode={mode} setMode={setMode} />
        <Snackbars></Snackbars>
        <Routes>
          <Route path="/Portfolio/:id" element={<Portfolio />} />
          <Route path="/CreatAccount" element={<CreatAccount />} />
          <Route path="/" element={<AllPost />} />
          <Route path="/login" element={<Log_In />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
