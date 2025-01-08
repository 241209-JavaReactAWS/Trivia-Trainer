import { useLocation, useNavigate } from "react-router-dom";
import { Course } from "../interfaces/Course";

function CourseInfo() {
  const location = useLocation();
  const navigate = useNavigate();

  const course: Course = location.state?.course;

  if (!course) {
    return <p>No course selected!</p>;
  }

  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.description}</p>
      <p>Educator ID: {course.courseId}</p>
      <p>Fee: ${course.fee}</p>

      <button onClick={() => navigate("/quizCreate", { state: { course } })}>
        Create Quiz
      </button>
    </div>
  );
}

export default CourseInfo;