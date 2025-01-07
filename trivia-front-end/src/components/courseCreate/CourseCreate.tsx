import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Course } from "../interfaces/Course";

function CourseCreate() {
  const [allCourses, setAllCourses] = useState<Course[]>([])
  // const [courseName, setCourseName] = useState<string>("");
  // const [courseDesc, setCourseDesc] = useState<string>("");
  // const [courseFee, setCourseFee] = useState<number>(0);
  // MAKE SURE TO GET EDUCATOR ID FROM LOGIN USECONTEXT ONCE AUTHENTICATE IS GOOD TO GO

  const navigate = useNavigate();

  /* Create a new Course */
  const addNewCourseToList = (newCourse: Course) => {
    setAllCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  let createCourse = () => {

    // if (courseName == "") {
    //   alert("Please enter a course name")
    //   return
    // } 
    // else if (courseDesc == "") {
    //   alert("Please enter a course description")
    //   return
    // }
    // else if (courseFee == 0) {
    //   alert("Please enter the course price")
    //   return;
    // }
    
    // console.log(courseName)
    // console.log(courseDesc)
    // console.log(courseFee)
    console.log("Creating Course")

    // TODO: Get the educator id from the useContext 

    // TODO: Get the educator from the educator id 

    // TODO: Axios request goes here once the course is made 
  }

  let createQuiz = () => {
    navigate("/QuizCreate");
  }

  return (
    <div>
      <h1>Create a new Course</h1>
      <label>
        {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
        Name:{" "}
        {/*<input
          type="text"
          id="courseNameField"
          value={courseName}
          onChange={(e: SyntheticEvent) => {
            setCourseName((e.target as HTMLInputElement).value);
          }}
        />*/}
      </label>

      <br></br>
      <br></br>

      <label>
        {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
        Description:{" "}
        <br></br>
        {/*<textarea
          id="courseDescField"
          value={courseDesc}
          onChange={(e: ChangeEvent) => {
            setCourseDesc((e.target as HTMLTextAreaElement).value);
          }}
          style={{ width: "500px", height: "100px" }}
        />*/}
      </label>

      <br></br>
      <br></br>

      <label>
        {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
        Price:{" "}
        <br></br>
        {/*<input
          type="number"
          id="courseFeeField"
          value={courseFee}
          onChange={(e: SyntheticEvent) => {
            setCourseFee((e.target as HTMLInputElement).value as unknown as number);
          }}
        />*/}
      </label>

      <br></br>
      <br></br>

      <button onClick={createCourse}>Create Course</button>

      <br></br>
      <br></br>

      <br></br>
      <br></br>

      <button onClick={createQuiz}>Create Quiz Button (for testing purposes) </button>

    </div>
  )
}

export default CourseCreate
