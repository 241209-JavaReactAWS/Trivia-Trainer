import { Course } from "./Course";
import { Student } from "./Student";

export interface Payment{
    payment_id?: number,
    student: Student,
    course: Course,
    amount: number,
    payment_date: string,
    status: number
}