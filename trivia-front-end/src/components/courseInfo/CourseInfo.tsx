import { useLocation, useNavigate } from "react-router-dom";
import { Course } from "../interfaces/Course";

function CourseInfo() {

  /// Usable things from react-router-dom
  const location = useLocation();
  const navigate = useNavigate();

  // Get the course from a course in StudentHome.tsx and get the courseId
  const course: Course = location.state?.course;
  if (!course) {
    return <p>No course selected!</p>;
  }

  return (
    <div>
      {/* Show information about the course  */}
      <h1>{course.name}</h1>
      <p>{course.description}</p>
      <p>Educator ID: {course.courseId}</p>
      <p>Fee: ${course.fee}</p>

      {/* Button responsible for redirecting the educator to the quiz creation page */}
      <button onClick={() => navigate("/quizCreate", { state: { course } })}>
        Create Quiz
      </button>
    </div>
  );
}

export default CourseInfo;