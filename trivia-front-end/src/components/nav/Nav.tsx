import { Link, useNavigate } from "react-router-dom"
import "./Nav.css"
import { Button } from "@mui/material"
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Nav() {
  const navigate = useNavigate();
  const logout = () => {
    const token = localStorage.getItem('accessToken');
    axios.post(
      `${backendUrl}/auth/logout`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      }
    )
    localStorage.clear()
    navigate("/")
  }
  return (
    <div className="menu">
      <Link to="/">General Home Page</Link>
      {/* <Link to="/search">Search Test</Link> */}
      <Link to="/login">Login / Register Test</Link>
      <Link to="/studentHome">Student Home</Link>
      {/* <Link to="/enroll">Enrollment Test</Link>

      <Link to="/payment">Payment Test</Link> */}
      {/* <Link to="/courseCreate">Course Creation Test</Link> */}

      {/* Course Create MUI Tester */}
      <Link to="/courseCreateMUI">Proctor Courses</Link>
      
      <Link to="/profile">Profile</Link>
      <Button onClick={logout}>Log out</Button>
      {/* <Link to="/test1">Payment Test</Link>
      <Link to="/test2">Enrollment Test</Link>
      <Link to="/test3">Course Test</Link>
      <Link to="/test4">Quiz Test</Link>
      <Link to="/test5">Program Test</Link>
      <Link to="/test6">Question Test</Link>
      <Link to="/test7">QuizAttempt Test</Link> */}
    </div>
  )
}

export default Nav
