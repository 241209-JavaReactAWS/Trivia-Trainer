import { Link } from "react-router-dom"
import "./Nav.css"

function Nav() {
  return (
    <div className="menu">
      <Link to="/">Login Testing</Link>
      <Link to="/home">Home</Link>
      <Link to="/test1">Payment Test</Link>
      <Link to="/search">Search Test</Link>

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
