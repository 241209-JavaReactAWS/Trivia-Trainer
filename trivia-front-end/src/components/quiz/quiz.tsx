import React, { useState, useEffect } from 'react';

interface QuizData {
    quiz_id: number,
    courseName: string,
    quizTitle: string,
    attemptLimit: number,
    currentAttempt: number,
    timer: ReturnType<typeof setTimeout>,
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

function quiz({quizzes}: Quiz) {
    const [quiz, setQuiz] = useState({courseName: '', quizTitle: '', currentAttempt: 0, attemptLimit: 0, timer: 0});
    const [timer, setTimer] = useState(null);
    
    return (
        <div>
        <h1>{quiz.courseName}</h1>
        <h2>{quiz.quizTitle}</h2>
        <h3> Attempt {quiz.currentAttempt} of {quiz.attemptLimit}</h3>
        <h3> Time Left: {quiz.timer}</h3>
        <ol>
        {quizzes.questions.map((question) => (
            <li key={question.question_id}>
                {question.question_id}. {question.content}
                <ul>
                    {question.options.map((options, index) => (<li key={index}>{options}</li>))}
                </ul>
            </li>
        ))}
        </ol>
        <button>Submit Quiz</button>
        </div>

    )
}

export default quiz
