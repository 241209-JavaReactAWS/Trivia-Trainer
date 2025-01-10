import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "../interfaces/Course";
import axios from "axios";
import { EnrollmentDTO } from "../interfaces/EnrollmentDTO";
import { Box, Button, Card, CardContent, TextField, Typography, Paper, Stack } from "@mui/material";

function GeneralHomeMUI() {
    const [querStr, setQuerStr] = useState<string>("");
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [visibleCourses, setVisibleCourses] = useState<Course[]>([]);
    const [showResCourses, setShowResCourses] = useState<boolean>(false);
    const [currentStudent, setCurrentStudent] = useState<number>(+localStorage.getItem("student_id"));

    const navigate = useNavigate();

    const goToSearch = () => {
        navigate("/search");
    };

    useEffect(() => {
        axios
            .get<Course[]>("http://localhost:8080/courses")
            .then((res) => {
                setAllCourses(res.data);
                console.log("Populated enrolled courses successfully");
            })
            .catch((error) => {
                console.error("Could not fetch the course list --> ", error);
            });
    }, []);

    const handleSearch = (quer: string): void => {
        setQuerStr(quer);
        if (quer === "") {
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

    const enrollInCourse = (clickedCourse: number): void => {
        console.log(`Course ID: ${clickedCourse}`);
        console.log(`Student ID: ${localStorage.getItem("student_id")}`);

        let newEnrollment: EnrollmentDTO = {
            studentId: currentStudent,
            courseId: clickedCourse,
            enrollmentDate: "1/1/24",
            enrollStatus: 0,
            review: "empty review",
            rating: 0,
        };

        console.log(newEnrollment);
        axios
            .post("http://localhost:8080/enrollment", newEnrollment)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
                <Typography variant="h3" gutterBottom>
                    RevTrivia
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Whether you're just curious about a topic or training to be on the next episode of Jeopardy,
                    RevTrivia is the one-stop shop for your trivia learning needs. Courses are made by our talented
                    education team, and with each course comes multiple quizzes to test your knowledge. With hundreds
                    of courses made each day, and hundreds more updated with current information, you're bound to learn
                    something new about whatever topic you want! Not sure where to start? Try searching for a specific
                    topic in the search bar below.
                </Typography>
                <Button variant="contained" color="primary" onClick={goToSearch} sx={{ marginTop: 2 }}>
                    Search Test
                </Button>
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
                                    Educator ID: {course.educatorId}
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
    );
}

export default GeneralHomeMUI;
