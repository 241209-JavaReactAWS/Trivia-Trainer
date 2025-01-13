import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "../interfaces/Course";
import axios from "axios";
import { EnrollmentDTO } from "../interfaces/EnrollmentDTO";
import { Box, Button, Card, CardContent, TextField, Typography, Paper, Stack, CssBaseline } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function GeneralHomeMUI(props: { disableCustomTheme?: boolean }) {

    /* Search parameter to filter courses */
    const [querStr, setQuerStr] = useState<string>('');
    const [allCourses, setAllCourses] = useState<Course[]>([])
    /* What will be displayed every time a search is requested */
    const [visibleCourses, setVisibleCourses] = useState<Course[]>([])
    const [showResCourses, setShowResCourses] = useState<boolean>(false);

    const [currentStudent, setCurrentStudent] = useState<number>(0)

    const navigate = useNavigate();
    const goToSearch = () => {
        navigate("/search");
    };

    useEffect(() => {
        const role = localStorage.getItem("roles");
        let studId = localStorage.getItem("student_id");
        if (role === "STUDENT" && studId !== null) {
            setCurrentStudent(parseInt(studId));
        }
        axios.get<Course[]>(`${backendUrl}/courses`)
            .then((res) => {
                setAllCourses(res.data)
                console.log("Populated enrolled courses successfully")
            })
            .catch((error) => {
                console.error("Could not fetch the course list --> ", error);
            });
    }, [])

    /* Filter courses based on quer parameter and display to any visitor to the website */
    const handleSearch = (quer: string): void => {
        setQuerStr(quer)
        if (quer === '') {
            setShowResCourses(false);
        } else {
            const ignCaseQuer = quer.toLowerCase();
            const resCourses = allCourses.filter(
                (course) =>
                    course.name.toLowerCase().includes(ignCaseQuer) ||
                    course.description.toLowerCase().includes(ignCaseQuer)
            );
            setVisibleCourses(resCourses);
            console.log(resCourses);
            setShowResCourses(true);
        }
    };

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

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <Box sx={{ padding: 3 }}>
                <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
                    <Typography variant="h1" gutterBottom sx={{ fontSize: '1.5rem' }}>
                        RevTrivia
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{ fontSize: '1.5rem' }}>
                        Whether you're just curious about a topic or training to be on the next episode of Jeopardy,
                        RevTrivia is the one-stop shop for your trivia learning needs. Courses are made by our talented
                        education team, and with each course comes multiple quizzes to test your knowledge. With hundreds
                        of courses made each day, and hundreds more updated with current information, you're bound to learn
                        something new about whatever topic you want! Not sure where to start? Try searching for a specific
                        topic in the search bar below!
                    </Typography>
                    {/* <Button variant="contained" color="primary" onClick={goToSearch} sx={{ marginTop: 2 }}>
                    Search Test
                </Button> */}
                </Paper>

                <Typography variant="h4" gutterBottom>
                    Course Search:
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <TextField
                        label="Search Courses"
                        variant="outlined"
                        value={querStr}
                        onChange={(e) => setQuerStr(e.target.value)}
                        sx={{ marginRight: 2, flex: 1 }}
                    />
                    <Button variant="contained" color="secondary" onClick={() => handleSearch(querStr)}>
                        Look up Course
                    </Button>
                </Box>

                {showResCourses && (
                    <Stack spacing={2}>
                        {visibleCourses.map((course) => (
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
                                    {currentStudent !== 0 && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => enrollInCourse(course.courseId)}
                                            sx={{ marginTop: 1 }}
                                        >
                                            Enroll
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                )}
            </Box>
        </AppTheme>
    );
}

export default GeneralHomeMUI;
