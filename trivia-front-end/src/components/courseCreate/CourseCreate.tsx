import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Course } from "../interfaces/Course";
import axios from "axios";

function CourseCreate() {

  // State variables 
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [courseName, setCourseName] = useState<string>("");
  const [courseDesc, setCourseDesc] = useState<string>("");
  const [courseFee, setCourseFee] = useState<number>(0);
  const [educatorId, setEducatorId] = useState<number>(0);

  const navigate = useNavigate();

  /** Tester Function: Sending a get request to the database getting all courses. */
  let getCourses = () => {
    axios.get("http://localhost:8080/courses"
    ).then((res) => {
        console.log("Here are the current courses in the database: ", res.data);
    }).catch((err) => {
        console.log(err);
    })
  }

  // Function responsible for 
  let createCourse = () => {
    if (!courseName || !courseDesc || educatorId <= 0 || courseFee <= 0) {
      alert("Some fields may be missing, please try again.");
      return;
    }
    console.log("Creating Course-->")

    /* Storing given course object into a variable to be sent through Axios to the backend. */
    const newCourse: Course & { educatorId: number } = {
      name: courseName,
      description: courseDesc,
      educatorId: educatorId,
      fee: courseFee
    };

    axios
      .post("http://localhost:8080/courses", newCourse)
      .then((res) => {
        console.log("New course created successfully --> ", res.data);
        setAllCourses((prevCourses) => [...prevCourses, res.data]);
        alert("Course created successfully!");
        setCourseName("");
        setCourseDesc("");
        setEducatorId(0);
        setCourseFee(0);
      })
      .catch((err) => {
        console.log("Encountered error whilst creating course --> ", err);
        alert("Failed to create the course, please try again.");
      });
  }

  let createQuiz = () => {
    navigate("/QuizCreate");
  }

  return (
    <div>
      <h1>Create New Course</h1>
      <button id="getcourses" onClick={getCourses}>Get Course List</button>
      <br/>
      <br/>
      <label>
        {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
        Name - {" "}
        <input
          type="text"
          id="courseNameField"
          value={courseName}
          onChange={(e: SyntheticEvent) =>
            setCourseName((e.target as HTMLInputElement).value)
          }
        />
      </label>

      <br></br>
      <br></br>

      <label>
        {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
        Description - {" "}
        <br></br>
        <textarea
          id="courseDescField"
          value={courseDesc}
          onChange={(e: ChangeEvent) => {
            setCourseDesc((e.target as HTMLTextAreaElement).value);
          }}
          style={{ width: "500px", height: "100px" }}
        />
      </label>

      <br></br>
      <br></br>

        {/* To be erased after successfully getting educator id from usecontext, here for testing purposes */}
      <label>
        {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
        Educator ID - {" "}
        <br></br>
        <input
          type="number"
          id="educatorIdField"
          value={educatorId}
          onChange={(e: SyntheticEvent) => {
            setEducatorId((e.target as HTMLInputElement).value as unknown as number);
          }}
        />
      </label>

      <br></br>
      <br></br>
      
      <label>
        {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
        Price - {" "}
        <br></br>
        <input
          type="number"
          id="courseFeeField"
          value={courseFee}
          onChange={(e: SyntheticEvent) => {
            setCourseFee((e.target as HTMLInputElement).value as unknown as number);
          }}
        />
      </label>

      <br></br>
      <br></br>

      <button onClick={createCourse}>Create Course</button>
      {/* <button onClick={addNewCourseToList}>Create Course</button> */}

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <button onClick={createQuiz}>Create Quiz Button (for testing purposes) </button>

    </div>
  )
}

export default CourseCreate
