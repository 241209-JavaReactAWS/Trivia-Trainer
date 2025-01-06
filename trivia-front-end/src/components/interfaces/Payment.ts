export interface Payment{
    payment_id?: number,
    student: number,
    course: number,
    amount: number,
    payment_date: string,
    status: number
}