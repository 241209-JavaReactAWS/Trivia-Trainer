import { ChangeEvent, SyntheticEvent, useState } from "react";

function CourseCreate() {

  const [courseName, setCourseName] = useState<string>("");
  const [courseDesc, setCourseDesc] = useState<string>("");
  const [courseFee, setCourseFee] = useState<number>(0);
  // MAKE SURE TO GET EDUCATOR ID FROM LOGIN USECONTEXT ONCE AUTHENTICATE IS GOOD TO GO

  let createCourse = () => {

    if (courseName == "") {
      alert("Please enter a course name")
      return
    } 
    else if (courseDesc == "") {
      alert("Please enter a course description")
      return
    }
    else if (courseFee == 0) {
      alert("Please enter the course price")
      return;
    }

    console.log(courseName)
    console.log(courseDesc)
    console.log(courseFee)
    console.log("Creating Course")

    // TODO: Get the educator id from the useContext 

    // TODO: Get the educator from the educator id 

    // TODO: Axios request goes here once the course is made 
  }

  return (
    <div>
      <h1>Course Creator</h1>
      <label>
        {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
        Name:{" "}
        <input
          type="text"
          id="courseNameField"
          value={courseName}
          onChange={(e: SyntheticEvent) => {
            setCourseName((e.target as HTMLInputElement).value);
          }}
        />
      </label>
      <br></br>
      <br></br>
      <label>
        {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
        Description:{" "}
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
      <label>
        {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
        Price:{" "}
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

    </div>
  )
}

export default CourseCreate
