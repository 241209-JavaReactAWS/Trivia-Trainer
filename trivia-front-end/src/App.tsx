import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Search from "./components/search/Search";
import EnrollmentPage from "./components/enrollment/EnrollmentPage";
import QuizCreate from "./components/quizCreate/QuizCreate";
import Test1 from "./components/payment/MakePayment";
import PaymentHistory from "./components/payment/PaymentHistory";
import Course from "./components/Course/Course";
import Quiz from "./components/quiz/quiz";
import Profile from "./components/profile/Profile";
import ChangeDetails from "./components/courseInfo/ChangeDetails";
import SignInSide from "./components/login/SignInSide";
import SignUpSide from "./components/signUp/SignUpSide";
import SignUp from "./components/signUp/SignUp";
// import CourseCreateMUI from "./components/courseCreate/CourseCreateMUI";
import NavMUI from "./components/nav/NavMUI";
import GeneralHomeMUI from "./components/generalHome/GeneralHomeMUI";
import CourseInfoMUI from "./components/courseInfo/CourseInfoMUI";
import { navigationCustomizations } from "./components/shared-theme/customizations/navigation";
import { createTheme } from '@mui/material/styles';
import StudentHomeMUI from "./components/home/StudentHomeMUI";
import ProctorHomeMUI from "./components/proctorHome/ProctorHomeMUI";
import PaymentHistoryMUI from "./components/payment/PaymentHistoryMUI";

function App() {

  const theme = createTheme({
    components: navigationCustomizations,  // Apply your custom navigation styles here
  });

  return (
    <>
      <BrowserRouter>
        
        {/* <ThemeProvider theme={theme}> */}
          {/* <Nav /> */}
          <NavMUI />
        {/* </ThemeProvider> */}

        <Routes>
          <Route path="/login" element={<SignInSide></SignInSide>}></Route>
          <Route path="/signup" element={<SignUpSide></SignUpSide>}></Route>
          {/* <Route path="/" element={<GeneralHome></GeneralHome>}></Route> */}
          <Route path="/" element={<GeneralHomeMUI></GeneralHomeMUI>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>

          {/* <Route path="/studentHome" element={<StudentHome></StudentHome>}></Route> */}
          <Route path="/studentHomeMUI" element={<StudentHomeMUI></StudentHomeMUI>}></Route>


          <Route path="/payment" element={<Test1></Test1>}></Route>
          <Route path="/search" element={<Search></Search>}></Route>
          <Route path="/enroll" element={<EnrollmentPage></EnrollmentPage>}></Route>

          {/* <Route path="/courseCreate" element={<CourseCreate></CourseCreate>}></Route> */}
          {/* Course Create MUI Test Link */}
          <Route path="/proctorHome" element={<ProctorHomeMUI></ProctorHomeMUI>}></Route>

          <Route path="/quizCreate" element={<QuizCreate></QuizCreate>}></Route>
          <Route path="/test1" element={<Test1></Test1>}></Route>
          <Route path="/paymentHistory" element={<PaymentHistory></PaymentHistory>}></Route>
          <Route path="/paymentHistoryMUI" element={<PaymentHistoryMUI></PaymentHistoryMUI>}></Route>
          <Route path="/quiz/:quizId" element={<Quiz />} />
          <Route path="/course" element={<Course></Course>}></Route>

          {/* <Route path="/courseInfo" element={<CourseInfo></CourseInfo>}></Route> */}
          <Route path="/courseInfoMUI" element={<CourseInfoMUI></CourseInfoMUI>}></Route>

          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/changeDetails" element={<ChangeDetails></ChangeDetails>}></Route>

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
