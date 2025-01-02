import { useNavigate } from "react-router-dom";

function Enrollment() {

    const navigate = useNavigate();

    let enroll = () => {
        navigate("/payment")
    }

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
            <button onClick={enroll}> {/* Will enroll in the course; Will be greayed out if not enrolled */}
                Leave Course 
            </button>
        </div>
    )
}

export default Enrollment
