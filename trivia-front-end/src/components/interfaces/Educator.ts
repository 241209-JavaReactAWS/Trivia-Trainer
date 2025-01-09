/* Object to represent the backend model class Educator */
import { Course } from "./Course";

export interface Educator {
    educatorId: number,
    details: string,
    courses: Course[]
}