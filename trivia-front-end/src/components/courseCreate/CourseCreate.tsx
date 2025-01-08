import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Course } from "../interfaces/Course";
import axios from "axios";
import { CourseDTO } from "../interfaces/CourseDTO";
import NewCourse from "./NewCourse";

function CourseCreate() {
  const [allCourses, setAllCourses] = useState<Course[]>([])
  /* Popup for editing an existing course */
  const [showAddCoursePopup, setShowAddCoursePopup] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  const [courseName, setCourseName] = useState<string>("");
  const [courseDesc, setCourseDesc] = useState<string>("");
  const [courseFee, setCourseFee] = useState<number>(0);
  // MAKE SURE TO GET EDUCATOR ID FROM LOGIN USECONTEXT ONCE AUTHENTICATE IS GOOD TO GO
  const [educatorId, setEducatorId] = useState<number>(0);

  const navigate = useNavigate();

  /** Tester Function: Sending a get request to the database getting all courses. */
  // let getCourses = () => {
  //   axios.get("http://localhost:8080/courses"
  //   ).then((res) => {
  //       console.log("Here are the current courses in the database: ", res.data);
  //   }).catch((err) => {
  //       console.log(err);
  //   })
  // }

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
  
  /**Add new course */
  const addNewCourseToList = (newCourse: Course) => {
    setAllCourses((prevBooks) => [...prevBooks, newCourse]);
  };

  const editCourse = (course: Course) => {
    setCourseToEdit(course);
    setShowAddCoursePopup(true); 
  };

  const delCourse = (courseId: number) => {
    axios.delete(`http://localhost:8080/courses/${courseId}`)
    .then(response => {
      console.log("Course deleted successfully --> ", response.data);
    })
    .catch(error => {
      console.error("Error deleting course --> ", error);
    });
  };

  let createCourse = () => {
    if (!courseName || !courseDesc || educatorId <= 0 || courseFee <= 0) {
      alert("Some fields may be missing, please try again.");
      return;
    }
    console.log("Creating Course-->")

    // TODO: Get the educator id from the useContext 

    /* Storing given course object into a variable to be sent through Axios to the backend. */
    const newCourse: CourseDTO & { educatorId: number } = {
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

  let getCourseId = (course: Course) => {
    return course.courseId;
  }

  return (
    <div>
      <h1>Create New Course</h1>
      {/* <button id="getcourses" onClick={getCourses}>Get Course List</button> */}
      {/* Show all enrolled courses here (See useEffect todo) */}
      {allCourses.map((course) => (
            <li key={course.courseId}>
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p>${course.fee}</p>
              <button onClick={() => editCourse(course)}>Edit</button>
              <button onClick={() => delCourse(course.courseId)}>Delete</button>
            </li>
      ))}
      <br/>
      <br/>
      {/* Show fields to modify */}
      {showAddCoursePopup && (
  <NewCourse
    onClose={() => {
      setShowAddCoursePopup(false);
      setCourseToEdit(null);
    }}
    onCourseUpdated={(updatedCourse) => {
      setAllCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.courseId === updatedCourse.courseId ? updatedCourse : course
        )
      );
    }}
    courseToEdit={courseToEdit}
  />
)}
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
