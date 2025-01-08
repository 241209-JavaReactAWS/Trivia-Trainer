import { Course } from "./Course";
import { Student } from "./Student";

export interface Enrollment {
    enrollmentId: number,
    student: Student,
    course: Course,
    enrollmentDate: string,
    enrollStatus: number,
    review: string,
    rating: number
}