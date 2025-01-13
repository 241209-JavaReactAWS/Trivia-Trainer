import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { Box, Button, Card, CardContent, CssBaseline, Paper, Stack, Typography } from "@mui/material";
import { Course } from "../interfaces/Course";
import { EnrollmentDTO } from "../interfaces/EnrollmentDTO";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Profile(props: { disableCustomTheme?: boolean , educatorId: string}) {

    // Usable things from react-router-dom
    const navigate = useNavigate();
    const location = useLocation();
    const educatorId = location.state?.educatorId;

    const [courseAdmin, setCourseAdmin] = useState({});
    const [adminFirstName, setAdminFirstName] = useState<string>("");
    const [adminLastName, setAdminLastName] = useState<string>("");
    const [educatorCourses, setEducatorCourses] = useState<Course[]>([]);
    const [currentStudent, setCurrentStudent] = useState<number>(0)
    const username = localStorage.getItem("username")
    /* Welcome message variables */
    const [profDetails, setProfDetails] = useState("");
    // var eduId = localStorage.getItem("educator_id")

    let changeDetails = () => {
        navigate("/changeDetails")
    }

    // While navigating the search results, a Student can enroll in courses
    const enrollInCourse = (clickedCourse: number): void => {
        console.log(`Course ID: ${clickedCourse}`)
        console.log(`Student ID: ${localStorage.getItem("student_id")}`)
        //var currentStudent = +localStorage.getItem("student_id")
        let newEnrollment: EnrollmentDTO = {
            studentId: currentStudent,
            courseId: clickedCourse,
            enrollmentDate: "1/1/24",
            enrollStatus: 0,
            review: "empty review",
            rating: 0
        }
        console.log(newEnrollment)
        axios.post(`${backendUrl}/enrollment`, newEnrollment)
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        const role = localStorage.getItem("roles");
        let studId = localStorage.getItem("student_id");
        if (role === "STUDENT" && studId !== null) {
            setCurrentStudent(parseInt(studId));
        }
        console.log(educatorId)
    }, [])

    // Use effect for educator details 
    useEffect(() => {
        {/*if (!eduId) {
            // alert("Please log in to view your profile");
            navigate("/login");
        }*/}
        axios
            .get(`${backendUrl}/educator/${educatorId}`)
            .then((response) => {
                setCourseAdmin(response.data);
                setAdminFirstName(response.data.user.firstName);
                setAdminLastName(response.data.user.lastName);
                setProfDetails(response.data.details);
            })
            .catch((error) => {
                console.error("Error fetching educator details:", error);
            });
    }, [educatorId]);

    // UseEffect for educator courses
    useEffect(() => {
        axios
            .get(`${backendUrl}/courses/proctor/${educatorId}`)
            .then((response) => {
                setEducatorCourses(response.data);
            })
            .catch((error) => {
                console.error("Error fetching educator courses:", error);
            });
    }, [educatorId]);


    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <div>
                <h1>{adminFirstName} {adminLastName}</h1>
                <h2>Professional Details: {profDetails}</h2>

                {/* STEP 1: Make sure educator can change their professional details */}
                {/* <button onClick={changeDetails}>Change Professional Details</button> */}
                {/* <h1>{userId}</h1> */}

            </div>

            {/* Show current courses made by this user */}
            <div>
                <h2>Courses Created by this Proctor:</h2>
                {/* <ul>
                    {educatorCourses?.map((course: any) => (
                        <li key={course.id}>{course.name}</li>
                    ))}
                </ul> */}
                {/* {educatorId && (
                    <button onClick={() => navigate("/generalHome")}>Proctor Home</button>
                )}

                {!educatorId && (
                    <button onClick={() => navigate("/studentHomeMUI")}>Student Home</button>
                )} */}
            </div>

            <Stack spacing={2}>
                {educatorCourses.map((course) => (
                    <Card key={course.courseId} sx={{ backgroundColor: "#f9f9f9" }}>
                        <CardContent>
                            <Typography variant="h5">{course.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {course.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Educator ID: {course.educator.educatorId}
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                ${course.fee}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => enrollInCourse(course.courseId)}
                                sx={{ marginTop: 1 }}
                            >
                                Enroll
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

        </AppTheme>
    )
}

export default Profile
