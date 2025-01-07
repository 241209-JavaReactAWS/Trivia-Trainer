import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface QuizData {
    quiz_id: number,
    courseName: string,
    quizTitle: string,
    attemptLimit: number,
    currentAttempt: number,
    timer: number,
    questions: QuestionData[],
}

interface QuestionData {
    question_id: number,
    quiz: QuizData,
    content: string,
    options: string[],
    correct: string
}

interface QuizAttemptData {
    attempt_id: number,
    quiz: QuizData,
    student: StudentData,
    score: number,
    attemptData: string
}

interface StudentData {
    student_id: number,
    quizAttempt: QuizAttemptData[],
}

interface Quiz {
    quizzes: QuizData
}

function Quiz() {
    const [quizData, setQuizData] = useState<QuizData | null>(null);

    useEffect(() => {
        const fetchQuizData = async () => {
            const { data } = await axios.get('http://localhost:8080/quizzes')
            setQuizData(data);
        };
        fetchQuizData();
        
    }, []);

    if (!quizData) {
        return <div>Loading...</div>
    }

    return (
    <div>
        <h1>{quizData.courseName}</h1>
        <h2>{quizData.quizTitle}</h2>
        <h2>Attempt number {quizData.currentAttempt} of {quizData.attemptLimit}</h2>
        <h2> {quizData.timer} minutes left </h2>
        <ol type="1">
            {quizData.questions.map((question) => (
                <li>{question.content}
                    <ol type="A">{question.options.map((option) => (
                        <li>{option}</li>
                    ))}
                    </ol>
                </li>
            ))}
        </ol>
        <button>Submit Quiz</button>
    </div>
    );
}

export default Quiz;

