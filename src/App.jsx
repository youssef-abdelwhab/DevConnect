
import AllPost from "./AllPost"
import NavBar from "./NavBar"
import Log_In from "./Log_In"
import CreatAccount from "./CreatAccount";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommentModel from "./CommentModel";




function App() {

  return (
    <>
    {/* <CommentModel></CommentModel> */}
    <BrowserRouter>
      <NavBar/>
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
