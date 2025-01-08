import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Course } from "../interfaces/Course";

function StudentHome() {

  // TODO: Use a useEffect to get the enrolled courses
  // - Get the enrollments based on the user's student_id, and then get the courses that have 
  //   the same course_id as those enrollments. 
  // - Then, show all the courses in a table, and stylize it later. 
  //   - Make sure to include the quiz scores as well. 
  const [allCourses, setAllCourses] = useState<Course[]>([])

  const navigate = useNavigate();

  let goToEnroll = () => {
    navigate("/enroll")
  }

  let goToPayment = () => {
    navigate("/payment")
  }

  let goToCourseInfo = (course: Course) => {
    navigate("/courseInfo", { state: { course: course } })
  }

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
          <p>{course.educatorId}</p>
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
