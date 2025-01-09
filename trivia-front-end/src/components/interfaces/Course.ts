/* Object to represent the backend model class Course */
import { Educator } from "./Educator";

export interface Course {
    courseId: number,
    name: string,
    description: string,
    educator: Educator,
    fee: number
}