import { SyntheticEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Course } from "../interfaces/Course";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
        value: string
    ) => {
        const updatedQuestions = [...questions];
        if (field === "incorrectAnswers") {
            updatedQuestions[index].incorrectAnswers = value.split(",");
        } else if (field === "content") {
            updatedQuestions[index].content = value;
        } else if (field === "correct") {
            updatedQuestions[index].correct = value;
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

        if (timer <= 0 || attemptLimit <= 0) {
            alert("Please enter a valid time limit and attempt limit");
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
                navigate("/proctorHomeMUI");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Box p={3}>
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
                    <Box key={index} mb={3} p={2} border="1px solid #ccc" borderRadius="8px">
                        <Typography variant="h6">Question {index + 1}</Typography>

                        {/* Question Content */}
                        <TextField
                            label="Question"
                            fullWidth
                            value={question.content}
                            onChange={(e) => questionChange(index, "content", e.target.value)}
                            margin="normal"
                        />

                        {/* Correct Answer */}
                        <TextField
                            label="Correct Answer"
                            fullWidth
                            value={question.correct}
                            onChange={(e) => questionChange(index, "correct", e.target.value)}
                            margin="normal"
                        />

                        {/* Incorrect Answers */}
                        <TextField
                            label="Incorrect Answers (comma-separated)"
                            fullWidth
                            value={question.incorrectAnswers.join(",")}
                            onChange={(e) =>
                                questionChange(index, "incorrectAnswers", e.target.value)
                            }
                            margin="normal"
                        />

                        <Button
                            color="error"
                            onClick={() => removeQuestion(index)}
                            sx={{ mt: 2 }}
                        >
                            Remove Question
                        </Button>
                    </Box>
                ))}

                {/* Add Question Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addQuestion}
                    sx={{ mt: 2 }}
                >
                    Add Another Question
                </Button>
            </Box>

            <Box mt={3}>
                {/* Create Quiz Button */}
                <Button
                    color="primary"
                    onClick={createQuiz}
                    sx={{ mt: 4 }}
                >
                    Create Quiz
                </Button>

                {/* Go Back Button */}
                <Button
                    color="primary"
                    onClick={() => navigate("/proctorHomeMUI", { state: { course } })}
                    sx={{ mt: 2 }}
                >
                    Go Back
                </Button>
            </Box>
        </Box>
    );
}

export default QuizCreate;
