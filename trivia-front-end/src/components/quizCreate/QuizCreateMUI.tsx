import { SyntheticEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Course } from "../interfaces/Course";
import { Box, Button, TextField, Typography } from "@mui/material";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function QuizCreate() {
    // State variables
    const [quizName, setQuizName] = useState("");
    const [timer, setTimer] = useState(0);
    const [attemptLimit, setAttemptLimit] = useState(0);
    const [questions, setQuestions] = useState([
        { content: "", correct: "", incorrectAnswers: ["", "", ""] },
    ]);

    // Usable things from react-router-dom
    const location = useLocation();
    const navigate = useNavigate();
    const course: Course = location.state?.course;

    // Change the question information based on the input values
    const questionChange = (
        index: number,
        field: "content" | "correct" | "incorrectAnswers",
        value: string,
        incorrectIndex?: number
    ) => {
        const updatedQuestions = [...questions];
        if (field === "incorrectAnswers" && incorrectIndex !== undefined) {
            updatedQuestions[index].incorrectAnswers[incorrectIndex] = value
        } else if (field === "content") {
            updatedQuestions[index].content = value
        } else if (field === "correct") {
            updatedQuestions[index].correct = value
        }
        setQuestions(updatedQuestions);
    };

    // Function responsible for adding a question to the quiz
    const addQuestion = () => {
        setQuestions([
            ...questions,
            { content: "", correct: "", incorrectAnswers: ["", "", ""] },
        ]);
    };

    // Function responsible for removing the last question from the quiz
    const removeQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    // Function responsible for creating the quiz
    let createQuiz = () => {
        if (!quizName.trim()) {
            alert("Please enter a quiz name");
            return;
        }

        if (attemptLimit <= 0) {
            alert("Please enter a valid attempt limit");
            return;
        }

        if (
            questions.some(
                (question) =>
                    !question.content.trim() ||
                    !question.correct.trim() ||
                    question.incorrectAnswers.some((answer) => !answer.trim())
            )
        ) {
            alert("Please fill out all question fields");
            return;
        }

        const questionObjects = questions.map((question) => ({
            content: question.content,
            options: [...question.incorrectAnswers, question.correct].join(","),
            correct: question.correct,
        }));

        axios
            .post(`${backendUrl}/quizzes`, {
                courseId: course.courseId,
                title: quizName,
                timer: timer,
                attemptLimit: attemptLimit,
                questions: questionObjects,
            })
            .then((res) => {
                console.log(res.data);
                alert("Quiz Created!");
                navigate("/proctorHome");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Box p={3} sx={{ marginTop: { xs: '80px', sm: '30px' } }}>
            <Typography variant="h4" gutterBottom>
                Create a Quiz
            </Typography>

            {/* Quiz Name */}
            <TextField
                label="Quiz Name"
                fullWidth
                value={quizName}
                onChange={(e: SyntheticEvent) =>
                    setQuizName((e.target as HTMLInputElement).value)
                }
                margin="normal"
            />

            {/* Timer */}
            {/* <TextField
        label="Time Limit (in minutes)"
        type="number"
        fullWidth
        value={timer}
        onChange={(e: SyntheticEvent) =>
          setTimer((e.target as HTMLInputElement).value as unknown as number)
        }
        margin="normal"
      /> */}

            {/* Attempt Limit */}
            <TextField
                label="Attempt Limit"
                type="number"
                fullWidth
                value={attemptLimit}
                onChange={(e: SyntheticEvent) =>
                    setAttemptLimit((e.target as HTMLInputElement).value as unknown as number)
                }
                margin="normal"
            />

            <Box mt={3}>
                {questions.map((question, index) => (
                    <Box
                        key={index}
                        mb={3}
                        p={4}
                        border="1px solid #aaa"
                        borderRadius="10px"
                        sx={{
                            width: "100%",
                            maxWidth: "800px",
                            margin: "0 auto",
                        }}
                    >
                        <Typography variant="h6">Question {index + 1}</Typography>

                        {/* Question Content */}
                        <br />
                        {/* <Typography variant="h6" align="left" gutterBottom>
                            Question
                        </Typography> */}
                        <TextField
                            label="Question"
                            fullWidth
                            value={question.content}
                            onChange={(e) => questionChange(index, "content", e.target.value)}
                            margin="normal"
                        />

                        {/* Correct Answer */}
                        {/* <Typography variant="h6" align="left" gutterBottom>
                            Correct Answer
                        </Typography> */}
                        <TextField
                            label="Correct Answer"
                            fullWidth
                            value={question.correct}
                            onChange={(e) => questionChange(index, "correct", e.target.value)}
                            margin="normal"
                        />

                        {/* Incorrect Answers */}
                        {/* <Typography variant="h6" align="left" gutterBottom>
                            Incorrect Answers
                        </Typography> */}
                        {question.incorrectAnswers.map((incorrectAnswer, incorrectIndex) => (
                            <TextField
                                key={incorrectIndex}
                                label={`Incorrect Answer ${incorrectIndex + 1}`}
                                fullWidth
                                value={incorrectAnswer}
                                onChange={(e) =>
                                    questionChange(index, "incorrectAnswers", e.target.value, incorrectIndex)
                                }
                                margin="normal"
                            />
                        ))}

                        <Button
                            color="error"
                            onClick={() => removeQuestion(index)}
                            sx={{mt: 2, padding: "10px", border:"1px solid #aaa", borderRadius:"10px"}}
                            >
                            Remove Question
                        </Button>
                    </Box>
                ))}

                <br />
                {/* Add Question Button */}
                <Button
                    // variant="contained"
                    color="primary"
                    onClick={addQuestion}
                    sx={{mt: 2, padding: "10px", border:"1px solid #aaa", borderRadius:"10px"}}
                >
                    Add Another Question
                </Button>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>

                    {/* Create Quiz Button */}
                    <Button
                        // variant="contained"
                        color="primary"
                        onClick={createQuiz}
                        sx={{mt: 2, padding: "10px", border:"1px solid #aaa", borderRadius:"10px"}}
                        >
                        Create Quiz
                    </Button>

                    {/* Go Back Button */}
                    <Button
                        // variant="contained"
                        color="primary"
                        onClick={() => navigate("/proctorHome", { state: { course } })}
                        sx={{mt: 2, padding: "10px", border:"1px solid #aaa", borderRadius:"10px"}}
                        >
                        Go Back
                    </Button>
                </Box>
            </Box>

            <Box mt={3}>
            </Box>
        </Box>
    );
}

export default QuizCreate;
