import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Course } from "../interfaces/Course";
import { Button, Card, CardActions, CardContent, CssBaseline, Typography } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { Student } from "../interfaces/Student";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function StudentHomeMUI(props: { disableCustomTheme?: boolean }) {

    // Show all the quizzes 
    const [allCourses, setAllCourses] = useState<Course[]>([])
    const [studCourses, setStudCourses] = useState<Course[]>([])
    /* Setting role to conditionally render enrolled courses */
    const [roleStud, setRoleStud] = useState<boolean>(false);
    const [studentId, setStudentId] = useState<number>(0);

    /* Welcome message variables */
    const f_name = localStorage.getItem("first_name")
    const l_name = localStorage.getItem("last_name")
    const navigate = useNavigate();

    // Function responsible for redirection to the enroll page 
    let goToEnroll = () => {
        navigate("/enroll")
    }

    // Function responsible for redirection to the payment page 
    let goToPayment = () => {
        navigate("/paymentHistory")
    }

    // Function responsible for redirection to the course information page 
    let goToCourseInfo = (course: Course) => {
        navigate("/courseInfoMUI", { state: { course: course } })
    }

    // Get all enrolled courses whenever the page is loaded. 
    useEffect(() => {
        /*  Only display courses that the logged in student is enrolled in. */
        const role = localStorage.getItem("roles");
        let studId = localStorage.getItem("student_id");
        if (role === "STUDENT" && studId !== null) {
            setRoleStud(true);
            setStudentId(parseInt(studId));
            axios.get<Course[]>(`${backendUrl}/courses`)
                .then((res) => {
                    setAllCourses(res.data)
                    /* Retrive list of enrollments stored inside student object */
                    axios.get<Student>(`${backendUrl}/students/${studId}`)
                        .then((resEns) => {
                            const enrollmentsStored = resEns.data.enrollments;
                            setStudCourses(res.data.filter(course => enrollmentsStored.some(enrollment => enrollment.course.courseId === course.courseId)))
                        })
                        .catch((error) => {
                            console.error("Could not fetch the student object or enrolled courses --> ", error)
                        });
                })
                .catch((error) => {
                    console.error("Could not fetch the all courses list --> ", error);
                });
        } else {
            setRoleStud(false);
            console.log("Not a student, or login unsuccessful.")
        }
    }, [])

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <div>
                <h1>Welcome, {f_name} {l_name}!</h1>

                <h2>Enrolled courses:</h2>
                {/* Show all enrolled courses here (See useEffect todo) */}

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
                >
                    {studCourses.map((course) => {
                        return (
                            <Card key={course.courseId} sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div">
                                        {course.name}
                                    </Typography>
                                    <Typography gutterBottom variant="body1" component="div">
                                        {course.description}
                                    </Typography>
                                    {/* <Typography gutterBottom variant="body1" component="div">
                                        Educator ID - {course.educator.educatorId}
                                    </Typography>
                                    <Typography gutterBottom variant="body1" component="div">
                                        ${course.fee}
                                    </Typography> */}
                                </CardContent>
                                <CardActions>
                                    <Button size="large" onClick={() => goToCourseInfo(course)}>View Course</Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                </div>
                <br></br>
                <br></br>
                <Button onClick={goToEnroll}>Enrollments</Button>
                <br></br>
                <br></br>
                <Button onClick={goToPayment}>Payment History</Button>
                <br></br>
                <br></br>

                {/* <h2>Change information</h2> */}
            </div>
        </AppTheme>
    )
}

export default StudentHomeMUI
