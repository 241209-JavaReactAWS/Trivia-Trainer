import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

function Quiz() {
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [attemptResult, setAttemptResult] = useState<QuizAttemptData | null>(null);
    const { quizId } = useParams();

    function calculateScore(quiz: QuizData, userAnswers: Record<number, string>): number {
        let correctCount = 0;

        quiz.questions.forEach((question) => {
            const userAnswer = userAnswers[question.question_id];
            if (userAnswer === question.correct) {
                correctCount++;
            }
        });

        const scorePercentage = (correctCount / quiz.questions.length) * 100;
        return scorePercentage;
    }

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/quizzes/${quizId}`);

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
            const response = await axios.post("http://localhost:8080/attempts", {
                quizId: quizData.quiz_id,
                studentId:student_Id,
                score: computedScore,
                attemptDate: new Date().toISOString(),
            });
            alert("1");
            setAttemptResult(response.data);

            alert("Quiz attempt submitted!");

            setQuizData((prev) =>
                prev
                    ? {
                            ...prev,
                            currentAttempt: prev.currentAttempt + 1,
                        }
                    : null
            );
        } catch (err) {
            console.error(err);
            alert("Something went wrong submitting your quiz!");
        }
    };

    if (!quizData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{quizData.courseName}</h1>
            <h2>{quizData.quizTitle}</h2>
            <h2>
                Attempt number {quizData.currentAttempt} of {quizData.attemptLimit}
            </h2>

            {/* Questions */}
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
            <button
                onClick={submitQuiz}
                disabled={quizData.currentAttempt >= quizData.attemptLimit}
            >
                Submit Quiz
            </button>

            {attemptResult && (
                <div style={{ marginTop: "2rem" }}>
                    <h3>Quiz Attempt Summary</h3>
                    <p>Attempt ID: {attemptResult.attempt_id}</p>
                    <p>Score: {attemptResult.score}</p>
                    <p>Attempt Date: {attemptResult.attemptDate}</p>
                </div>
            )}
        </div>
    );
}

export default Quiz;

