
import AllPost from "./AllPost"
import NavBar from "./NavBar"
import Log_In from "./Log_In"
import CreatAccount from "./CreatAccount";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App( {mode , setMode}) {

  return (
    <>
    <BrowserRouter>
      <NavBar mode={mode} setMode={setMode}/>
      <Routes>
        <Route path="/CreatAccount" element={<CreatAccount/>}/>
        <Route path="/" element={<AllPost />} />
        <Route path="/login" element={<Log_In />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
