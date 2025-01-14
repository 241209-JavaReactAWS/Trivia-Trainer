/* Object to represent the backend model class Quiz */ 
export interface Quiz {
    quizId: number,
    title: string,
    attemptLimit: number,
    currentAttempt: number
}