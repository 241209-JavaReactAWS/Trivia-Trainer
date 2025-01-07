import { Link } from "react-router-dom"
import "./Nav.css"

function Nav() {
  return (
    <div className="menu">
      <Link to="/">General Home Page</Link>
      {/* <Link to="/search">Search Test</Link> */}
      <Link to="/login">Login / Register Test</Link>
      <Link to="/studentHome">Student Home</Link>
      {/* <Link to="/enroll">Enrollment Test</Link>
      <Link to="/payment">Payment Test</Link> */}
      <Link to="/courseCreate">Course Creation Test</Link>

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
