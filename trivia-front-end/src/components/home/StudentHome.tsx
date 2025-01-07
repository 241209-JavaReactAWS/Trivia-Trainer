import { useNavigate } from "react-router-dom"

function StudentHome() {

  // TODO: Use a useEffect to get the enrolled courses
  // - Get the enrollments based on the user's student_id, and then get the courses that have 
  //   the same course_id as those enrollments. 
  // - Then, show all the courses in a table, and stylize it later. 
  //   - Make sure to include the quiz scores as well. 

  const navigate = useNavigate();

  let goToEnroll = () => {
    navigate("/enroll")
  }

  let goToPayment = () => {
    navigate("/payment")
  }

  return (
    <div>
      <h1>Welcome, (REPLACE) name!</h1>

      <h2>Enrolled courses:</h2>
      {/* Show all enrolled courses here (See useEffect todo) */}
      <br></br>
      <br></br>
      <button onClick={goToEnroll}>Enrollment Test</button>
      <br></br>
      <br></br>
      <button onClick={goToPayment}>Payment Test</button>
      <br></br>
      <br></br>

      <h2>Change information</h2>
    </div>
  )
}

export default StudentHome
