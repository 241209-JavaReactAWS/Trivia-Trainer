/* Object to represent the backend model class Course */ 

export interface Course {
    courseId: number,
    name: string,
    description: string,
    educatorId: number,
    fee: number
}