import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuizAttempt from "../interfaces/QuizAttempt"

import { 
    Box, 
    Button, 
    Container, 
    FormControl,
    FormLabel,
    FormControlLabel, 
    Paper, 
    Radio, 
    RadioGroup, 
    Typography 
  } from '@mui/material';

interface QuizData {
    quiz_id: number;
    courseName: string;
    quizTitle: string;
    attemptLimit: number;
    currentAttempt: number;
    questions: QuestionData[];
}

interface QuestionData {
    question_id: number;
    content: string;
    options: string[];
    correct: string;
}

interface QuizAttemptData {
    attempt_id: number;
    quiz: QuizData;
    student: StudentData;
    score: number;
    attemptDate: string;
}

interface StudentData {
    student_id: number;
    quizAttempt: QuizAttemptData[];
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Quiz() {
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [attemptResult, setAttemptResult] = useState<QuizAttemptData | null>(null);

    const [attemptCount, setAttemptCount] = useState<number>(0);

    const { quizId } = useParams();

    function calculateScore(quiz: QuizData, userAnswers: Record<number, string>): number {
        let correctCount = 0;
        let ans = null;

        quiz.questions.forEach((question) => {
            const userAnswer = userAnswers[question.question_id];
            console.log(userAnswer);
            console.log(question.correct);
            console.log(question.options.lastIndexOf(userAnswer));

            /*
            if (question.options.lastIndexOf(userAnswer) == 0) {
                ans = "A";
            } else if (question.options.lastIndexOf(userAnswer) == 1) {
                ans = "B";
            } else if (question.options.lastIndexOf(userAnswer) == 2) {
                ans = "C";
            } else {
                ans = "D";
            }
            */

            if (userAnswers[question.question_id] == question.correct) {
                correctCount++;
            }
            console.log(userAnswers[question.question_id] === question.correct);
            /*if (ans === question.correct) {
                correctCount++;
            }*/
        });

        const scorePercentage = (correctCount / quiz.questions.length) * 100;
        return parseFloat(scorePercentage.toFixed(1));
    }

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/quizzes/${quizId}`);

                // Transform data to match QuizData interface
                const transformedData: QuizData = {
                    quiz_id: data.quizId,
                    courseName: data.course.name,
                    quizTitle: data.title,
                    attemptLimit: data.attemptLimit,
                    currentAttempt: 0, // Assuming initial attempt is 0 (adjust as needed)
                    questions: data.questions.map((q: any) => ({
                        question_id: q.questionId,
                        content: q.content,
                        options: q.options.split(","), // Convert comma-separated string to array
                        correct: q.correct,
                    })),
                };

                setQuizData(transformedData);
            } catch (err) {
                console.error(err);
            }
        };

        if (quizId) {
            fetchQuizData();
        }
    }, [quizId]);

    useEffect (() => {
     axios.get<QuizAttempt[]>(
            `${backendUrl}/attempts/${quizId}/student/${localStorage.getItem("student_id")}`
        )
        .then((res) => {
            console.log(res.data);
            setAttemptCount(res.data.length + 1);
        })
    }, [attemptResult])

    const submitQuiz = async () => {
        if (!quizData) return;

        const computedScore = calculateScore(quizData, answers);
        const studentIdString = localStorage.getItem("student_id");

        if (!studentIdString) {
            alert("No student ID found, please log in.");
            return;
        }

        const student_Id = parseInt(studentIdString);

        try {
            setQuizData((prev) =>
                prev
                    ? {
                            ...prev,
                            currentAttempt: quizData.currentAttempt + 1,
                        }
                    : null
            );

            const response = await axios.post(`${backendUrl}/attempts`, {
                quizId: quizData.quiz_id,
                studentId:student_Id,
                score: computedScore,
                attemptDate: new Date().toUTCString(),
                currentAttempt: quizData.currentAttempt
            });
            setAttemptResult(response.data);

            alert("Quiz attempt submitted!");

        } catch (err) {
            console.error(err);
            alert("Something went wrong submitting your quiz!");
        }
    };



    if (!quizData) {
        return <div>Loading...</div>;
    }

    return (

        <Container maxWidth="md" sx={{ mt: 4}}>
            <Paper elevation={30} sx={{ p: 9}}>
            <Typography variant ="h4" gutterBottom>{quizData.courseName}</Typography>
            <Typography variant ="h5" gutterBottom>{quizData.quizTitle}</Typography>
            {
                attemptCount > quizData.attemptLimit ? 
<               Typography variant ="subtitle1" gutterBottom>
                No attempts remaining
                </Typography>
                :
                <Typography variant ="subtitle1" gutterBottom>
                Attempt number {attemptCount} of {quizData.attemptLimit}
                </Typography>
            }

            {/* Questions */}
            {/* 
            <ol type="1">
                {quizData.questions.map((question) => (
                    <li key={question.question_id}>
                        {question.content}
                        <ol type='A'>
                            {question.options.map((option, idx) => (
                                <li key={option}>
                                    <input
                                        type="radio"
                                        name={`question_${question.question_id}`}
                                        value={option}
                                        onChange={() =>
                                            setAnswers((prev) => ({
                                                ...prev,
                                                [question.question_id]: option,
                                            }))
                                        }
                                    />
                                    {option}
                                </li>
                            ))}
                        </ol>
                    </li>
                ))}
            </ol>
*/}

{quizData.questions.map((question) => (
        <Box key={question.question_id} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {question.content}
          </Typography>
          
          <RadioGroup
            name={`question_${question.question_id}`}
            onChange={(e) =>
              setAnswers((prev) => ({
                ...prev,
                [question.question_id]: e.target.value,
              }))
            }
          >
            {question.options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </Box>
      ))}

            
            <Button variant="contained" color="primary"
                onClick={submitQuiz}
                disabled={attemptCount > quizData.attemptLimit}
            >
                Submit Quiz
            </Button>

            {attemptResult && (
                <Paper elevation={2} sx={{ p: 2, mt: 3}}>
                    <Typography variant="h6">Quiz Attempt Summary</Typography>
                    {/*<p>Attempt ID: {attemptResult.attempt_id}</p>*/}
                    <Typography variant="body1">Score: {attemptResult.score}</Typography>
                    <Typography variant="body1">Attempt Date: {attemptResult.attemptDate}</Typography>
                </Paper>
            )}
            </Paper>
        </Container>
    );
}

export default Quiz;