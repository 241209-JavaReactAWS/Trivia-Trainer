/* Object to represent the backend model class Educator */
import { Course } from "./Course";
import { User } from "./User";

export interface Educator {
    educatorId: number,
    details: string,
    courses: Course[],
    // Make an optional field that accepts a user type
    user?: User
}