import { useNavigate } from "react-router-dom";

function Enrollment() {

    const navigate = useNavigate();

    let enroll = () => {
        navigate("/payment")
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
            <h1> {/* This is where the course name will go */}
                (REPLACE) Test Trivia Course
            </h1>

            <h2> {/* This is where the course description will go */}
                (REPLACE) A free course meant to introduce people to the world of trivia!
            </h2>

            <h2> {/* This is where the course cost will go */}
                Cost: (REPLACE) $100
            </h2>

            <button onClick={enroll}> {/* Will enroll in the course; Will be greyed out if already enrolled */}
                Enroll 
            </button>
            <div></div>
            <button onClick={enroll}> {/* Will drop enrollment from the course; Will be greayed out if not enrolled */}
                Leave Course 
            </button>
        </div>
    )
}

export default Enrollment
