import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Course } from "../interfaces/Course";
import { Card, CardContent, Typography, CardActions, Button, CssBaseline } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import { Educator } from "../interfaces/Educator";
import { Quiz } from "../interfaces/Quiz";
import quizData from "../quiz/quiz";
import { Box } from '@mui/material';

function CourseInfoMUI(props: { disableCustomTheme?: boolean }) {
    /* Setting role to conditionally render create quiz option */
    const [roleEd, setRoleEd] = useState<boolean>(false);
    const [educator, setEducator] = useState<Educator>();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    // const [firstName, setFirstName] = useState<string>("");
    // const [lastName, setLastName] = useState<string>("");

    /// Usable things from react-router-dom
    const location = useLocation();
    const navigate = useNavigate();
    var courseId = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

    // Get the course from a course in StudentHome.tsx and get the courseId
    const course: Course = location.state?.course;
    if (!course) {
        return <p>No course selected!</p>;
    }

    useEffect(() => {
        /*  Only display editable and deletable courses if the user is an educator, and if the educator is the creater of the courses. */
        const role = localStorage.getItem("roles");
        let edId = localStorage.getItem("educator_id");
        if (role === "EDUCATOR" && edId !== null && course.educator.educatorId == parseInt(edId)) {
            setRoleEd(true);
        } else {
            setRoleEd(false);
            console.log("Create Quiz option disabled for normal user.")
        }        
    }, []
    )

    useEffect(() => {
        let edId = course.educator.educatorId;
        axios.get<Educator>(`http://localhost:8080/educator/${edId}`)
            .then((res) => {
                setEducator(res.data);
            })
            .catch((error) => {
                console.error("Could not fetch the educator object --> ", error);
            });
    }, []);


    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await axios.get<Quiz[]>(
                    `${backendUrl}/quizzes/courses/${course.courseId}`
                );
                setQuizzes(res.data);
            } catch (error) {
                console.error("Error fetching quizzes", error)
            }
        };
        fetchQuizzes();
    }, [course.courseId]);

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <div>
                <Typography gutterBottom variant="h1" component="div">
                    {course.name}
                </Typography>
                <hr /> <br />
                <Typography gutterBottom variant="h2" component="div">
                    Proctor: {educator?.user?.firstName} {educator?.user?.lastName}
                </Typography>
                <Typography gutterBottom variant="h2" component="div">
                    {course.description}
                </Typography>
                {/* <Typography gutterBottom variant="h2" component="div">
                    Educator ID: {course.educator.educatorId}
                </Typography> */}
                <Typography gutterBottom variant="h2" component="div">
                    Fees: ${course.fee}
                </Typography>
                <Button size="large" onClick={() => navigate("/studentHomeMUI")}>
                    Back to Student Home
                </Button>

                {quizzes.length === 0 ? (
                    <Typography variant="body1">
                        No quizzes found for this course.
                    </Typography>) : (
                        quizzes.map((quiz) => (
                            <Card key={quiz.quizId} sx={{ maxWidth: 345, mb: 3}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                        {quiz.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Attempts Remaining: {quiz.attemptLimit - quiz.currentAttempt}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Box alignItems="center">
                                        <Button variant="contained" sx = {{top: '0.25rem', right: '-6.5rem' }}
                                        onClick={() => navigate(`/quiz/${quiz.quizId}`)}>
                                            Take Quiz
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>
                        ))
                    )}

                {/* <Card key={course.courseId} sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            {course.name}
                        </Typography><Typography gutterBottom variant="body1" component="div">
                            {course.description}
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div">
                            Educator ID: {course.educator.educatorId}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                            ${course.fee}
                        </Typography>
                    </CardContent>
                    {roleEd && (
                        <CardActions>
                            <Button size="small" onClick={() => navigate("/quizCreate", { state: { course } })}>Create Quiz</Button>
                        </CardActions>
                    )}
                </Card>
                 <br/>
                 <br/>
                 <CardActions>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => navigate("/profile")}
                        >
                            Go to Profile
                        </Button>
                    </CardActions> */}
                    <CardActions>
                        {!roleEd && (
                        <Button size="large" onClick={() => navigate("/studentHomeMUI")}>
                            Back to Profile
                        </Button>
                )}
                    </CardActions>

            </div>
        </AppTheme>
    );
}

export default CourseInfoMUI;
