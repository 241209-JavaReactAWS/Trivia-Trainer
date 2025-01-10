import axios from "axios";
import { useEffect, useState } from "react";
import { Enrollment } from "../interfaces/Enrollment";
import { Course } from "../interfaces/Course";
import { PaymentDTO } from "../interfaces/PaymentDTO";

function EnrollmentPage() {

    const [enrollments, setEnrollments] = useState<Enrollment[]>([])
    const [deletedCourse, setDeletedCourse] = useState<number>(0)
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

    //Note: Remove from this page during integration with Sanjana's course search
    useEffect( () => {
        axios.get(`${backendUrl}/enrollment/${localStorage.getItem("student_id")}`
        ).then((res) => {
            console.log("Here are the current enrollments in the database: ", res.data);
            setEnrollments(res.data)
        }).catch((err) => {
            console.log(err);
        })
      }, [deletedCourse])
    
    let payFee = (course: Course, enrollId: number) => {
        console.log(course)
        console.log("Making Payment");
        console.log(`Student ID: ${localStorage.getItem("student_id")}`);
        console.log(`Course ID: ${course.courseId}`);
        console.log(`Amount: ${course.fee}`);
        let studentStr = localStorage.getItem("student_id")
        if(studentStr != null){
        let newPaymentDTO : PaymentDTO = {
          studentId: parseInt(studentStr),
          courseId: course.courseId,
          amount: course.fee
        }
        console.log(newPaymentDTO)
        axios.post(`${backendUrl}/payment`, newPaymentDTO)
          .then((res) => {
            console.log(res.data)
          }).catch((err) => {
            console.log(err)
          })
        //Update payment status to paid
        axios.patch(`${backendUrl}/enrollment/payFee/${enrollId}`)
          .then((res) => {
            setDeletedCourse(enrollId)
            console.log(`Paid for enrollment ${enrollId}`)
            console.log(res.data)
          }).catch((err) => {
            console.log(err)
          })}
    }

    let leaveCourse = (enrollment: Enrollment) => {
        console.log(enrollment.enrollmentId)
        let studentStr = localStorage.getItem("student_id")
        if(studentStr != null){
            //Make a refund payment
            let newPaymentDTO : PaymentDTO = {
              studentId: parseInt(studentStr),
              courseId: enrollment.course.courseId,
              amount: -enrollment.course.fee
            }
            console.log(newPaymentDTO)
            axios.post(`${backendUrl}/payment`, newPaymentDTO)
              .then((res) => {
                console.log(res.data)
              }).catch((err) => {
                console.log(err)
              })

            //Delete the enrollment
            axios.delete(`${backendUrl}/enrollment/${enrollment.enrollmentId}`).
            then(() => {
                setDeletedCourse(enrollment.enrollmentId)
                console.log(`Deleted enrollment ${enrollment.enrollmentId}`)
            }).
            catch((err) => {
                console.log(err);
            })
        }

    }

    /*
        What needs to happen:
            A student needs to add an enrollment object to their enrollment list when clicking a button on course

            The process of enrolling in a course:
                1. A student clicks the enroll button 
                    - This creates the enrollment object, grabbing the Course (use a DTO and the courseId) and the Student (use a DTO and Student Id)
                    - The new object will have its payment status set to UNPAID, rating set to 0
                2. In the Enrollments page, the status will be listed as UNPAID, with a button next to it labelled "Pay"
                    - Clicking Pay will create a payment object with the same "amount" as Course Fee, same Student and Course Ids
                    - Payment history will need to be added to Student Home at a later date
                
            Enrollment will serve as the main way a Student can interact with their courses, using the Course field to populate necessary parameters
                1. Enrollments will need to be added as a page to Student Home
                    - Links in a table, named the same as the course name, will redirect the student to the course page
                2. This is where the "drop course" button will be
                    - Will create a new "refunded" payment in the payment history, showing a negative dollar value (if within 5 days of start time???)
                    - Will set Enrollment status to CANCELLED.
            
            TODO Later:
                1. If a Student opens a course they are not enrolled in, they should be somehow prompted to enroll in it

            Enrollment and Payment need to be hooked up. The enrollment cost will create the price for a given payment, and Enrollment Status will
            only be set to Active after payment. 

            Payment should be able to take all its important data from enrollment
    */
    return (
        <div>
            <h1>Enrollment Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Enrollment Status</th>
                        <th>Entrance Fee</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                    enrollments.map((enrollment) => {
                    return (
                        <tr key={enrollment.enrollmentId}>
                            <td>{enrollment.course.courseId}</td>
                            <td>{enrollment.course.name}</td>
                            <td>{enrollment.status}</td>
                            <td>{enrollment.course.fee}</td>
                            <td><button onClick={() => payFee(enrollment.course, enrollment.enrollmentId)}>Pay</button></td>
                            <td><button onClick={() => leaveCourse(enrollment)}>Leave</button></td>
                        </tr>
                        )
                    })
                }
                </tbody>
            </table>


        </div>
    )
}

export default EnrollmentPage
