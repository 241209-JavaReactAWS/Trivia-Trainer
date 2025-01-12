import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Course } from "../interfaces/Course";

function StudentHome() {

  // Show all the quizzes 
  const [allCourses, setAllCourses] = useState<Course[]>([])

  const navigate = useNavigate();

  // Function responsible for redirection to the enroll page 
  let goToEnroll = () => {
    navigate("/enroll")
  }

  // Function responsible for redirection to the payment page 
  let goToPayment = () => {
    navigate("/payment")
  }

  // Function responsible for redirection to the course information page 
  let goToCourseInfo = (course: Course) => {
    navigate("/courseInfoMUI", { state: { course: course } })
  }

  // Get all enrolled courses whenever the page is loaded. 
  useEffect(() => {
    axios.get<Course[]>("http://localhost:8080/courses")
      .then((res) => {
        setAllCourses(res.data)
        console.log("Populated enrolled courses successfully")
      })
      .catch((error) => {
        console.error("Could not fetch the course list --> ", error);
      });
  }, [])

  return (
    <div>
      <h1>Welcome, (REPLACE) name!</h1>

      <h2>Enrolled courses:</h2>
      {/* Show all enrolled courses here (See useEffect todo) */}
      {allCourses.map((course) => (
        <li key={course.courseId}>
          <h3>{course.name}</h3>
          <p>{course.description}</p>
          <p>{course.educator.educatorId}</p>
          <p>${course.fee}</p>
          <button onClick={() => goToCourseInfo(course)}>View Course</button>
        </li>
      ))}
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
