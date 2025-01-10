import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Course } from "../interfaces/Course";
import axios from "axios";
import { CourseDTO } from "../interfaces/CourseDTO";
import NewCourse from "./NewCourse";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Modal, TextField, Typography } from "@mui/material";
import React from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CourseCreateMUI() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // State variables 
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [edCourses, setEdCourses] = useState<Course[]>([])
  /* Popup for editing an existing course */
  const [showAddCoursePopup, setShowAddCoursePopup] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [courseName, setCourseName] = useState<string>("");
  const [courseDesc, setCourseDesc] = useState<string>("");
  const [courseFee, setCourseFee] = useState<number>(0);
  const [educatorId, setEducatorId] = useState<number>(0);
  const [userRole, setUserRole] = useState<string>("");
  /* Setting role to conditionally render CRUD operations on courses */
  const [roleEd, setRoleEd] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    /*  Only display editable and deletable courses if the user is an educator, and if the educator is the creater of the courses. */
    const role = localStorage.getItem("roles");
    let edId = localStorage.getItem("educator_id");
    if (role === "EDUCATOR" && edId !== null) {
      setRoleEd(true);
      axios.get<Course[]>("http://localhost:8080/courses")
        .then((res) => {
          setAllCourses(res.data)
          res.data.forEach(course => console.log("In res data Courses - Course Name --> ", course.name));
          res.data.forEach(course => console.log("In res data Courses - Course Educator Id --> ", course.educator.educatorId));
          const correspondingCourses = res.data.filter((course) => course.educator.educatorId == parseInt(edId));
          console.log("Corresponding courses --> ", correspondingCourses);
          console.log("edID --> ", edId);
          setEdCourses(correspondingCourses)
          console.log("Populated educator corresponding courses successfully")
        })
        .catch((error) => {
          console.error("Could not fetch the ed corresponding course list --> ", error);
        });
    } else {
      setRoleEd(false);
      console.log("User is not an educator, or login unsuccessful.")
    }
  }, []
  )

  /* Add new course */
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
      <h1>Welcome to the Proctor's Course List Page</h1>

      {edCourses.map((course) => {
        return (
          <Card key={course.courseId} sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {course.name}
              </Typography><Typography gutterBottom variant="h6" component="div">
                {course.description}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                ${course.fee}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => editCourse(course)}>Edit</Button>
              <Button size="small" onClick={() => delCourse(course.courseId)}>Delete</Button>
            </CardActions>
          </Card>
        )
      })}

      <br />
      <br />
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

      {roleEd && (
        <div>
          <br />
          <br />

          {/* Adding MUI components -- Button for creating new couurses for educators */}
          <Button onClick={handleOpen}>Create New Course</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create a New Course
              </Typography>
              {/* We need to add in some inputs for the values */}
              <TextField label="Course Name" variant="outlined" margin="normal"
                onChange={(e: SyntheticEvent) =>
                  setCourseName((e.target as HTMLInputElement).value)
                } />

              <TextField label="Course Description" variant="outlined" margin="normal"
                onChange={(e: ChangeEvent) => {
                  setCourseDesc((e.target as HTMLTextAreaElement).value);
                }} />

              <TextField label="Course Educator ID" variant="outlined" margin="normal" type="number"
                onChange={(e: SyntheticEvent) => {
                  setEducatorId((e.target as HTMLInputElement).value as unknown as number);
                }} />

              <TextField label="Course Fee" variant="outlined" margin="normal" type="number"
                onChange={(e: SyntheticEvent) => {
                  setCourseFee((e.target as HTMLInputElement).value as unknown as number);
                }} />
              <br />
              <br />
              <br />
              <br />
              <Button onClick={createCourse}>Create Course</Button>
            </Box>
          </Modal>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Button onClick={createQuiz}>Create Quiz Button (for testing purposes) </Button>
        </div>
      )}
      {!roleEd && (
        <h2> This Page is only for Proctors </h2>
      )}
    </div>

  )
}

export default CourseCreateMUI;