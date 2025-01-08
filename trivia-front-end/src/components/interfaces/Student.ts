import { Enrollment } from "./Enrollment"
import { QuizAttempt } from "./QuizAttempt"

export interface Student{
    studentId: number,
    quizAttempts: QuizAttempt[],
    enrollments: Enrollment[]
}