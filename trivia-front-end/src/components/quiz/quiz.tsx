import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

interface QuizData {
    quiz_id: number,
    courseName: string,
    quizTitle: string,
    attemptLimit: number,
    currentAttempt: number,
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
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const { quizId } = useParams();

    useEffect(() => {
        const fetchQuizData = async () => {
        try {
            // fetch just one quiz by its ID
            const { data } = await axios.get(`http://localhost:8080/quizzes/${quizId}`);
            setQuizData(data);
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
        try {
            const response = await axios.post(`http://localhost:8080/attempts`, {quizData});
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert("Something went wrong submitting your quiz.");
        }
    };

    if (!quizData) {
        return <div>Loading...</div>
    }

    return (
    <div>
        <h1>{quizData.courseName}</h1>
        <h2>{quizData.quizTitle}</h2>
        <h2>Attempt number {quizData.currentAttempt} of {quizData.attemptLimit}</h2>
        
        <ol type="1">
            {quizData.questions.map((question) => (
                <li key={question.question_id}>{question.content}
                    <ol type="A">{question.options.map((option, idx) => (
                        <li key={option}>
                            <input
                                type="radio"
                                name={`question_${question.question_id}`}
                                value={option}
                                onChange={() => {
                                    setAnswers(prev => ({
                                        ..prev,
                                        [question.question_id]: option
                                    }));
                                }}
                            />
                            {option}
                        </li>
                    ))}
                    </ol>
                </li>
            ))}
        </ol>
        <button onClick ={submitQuiz}>Submit Quiz</button>
    </div>
    );
}

export default Quiz;