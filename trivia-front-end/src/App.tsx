import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Login from "./components/login/Login";
import Home from "./components/home/StudentHome";
import Test1 from "./components/paymentTest/Test1";
import Search from "./components/search/Search";
import Enrollment from "./components/enrollment/Enrollment";
import GeneralHome from "./components/generalHome/GeneralHome";
import StudentHome from "./components/home/StudentHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav></Nav>

        <Routes>
          <Route path="/" element={<GeneralHome></GeneralHome>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/studentHome" element={<StudentHome></StudentHome>}></Route>
          <Route path="/payment" element={<Test1></Test1>}></Route>
          <Route path="/search" element={<Search></Search>}></Route>
          <Route path="/enroll" element={<Enrollment></Enrollment>}></Route>

          {/* <Route path="/test1" element={<Test1></Test1>}></Route>
          <Route path="/test2" element={<Test2></Test2>}></Route>
          <Route path="/test3" element={<Test3></Test3>}></Route>
          <Route path="/test4" element={<Test4></Test4>}></Route>
          <Route path="/test5" element={<Test5></Test5>}></Route>
          <Route path="/test6" element={<Test6></Test6>}></Route>
          <Route path="/test7" element={<Test7></Test7>}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
