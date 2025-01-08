import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "../interfaces/Course";
import axios from "axios";

function GeneralHome() {

    /* Search parameter to filter courses */
    const [querStr, setQuerStr] = useState<string>('');
    const [allCourses, setAllCourses] = useState<Course[]>([])
    /* What will be displayed every time a search is requested */
    const [visibleCourses, setVisibleCourses] = useState<Course[]>([])
    const [showResCourses, setShowResCourses] = useState<boolean>(false);
    
    const navigate = useNavigate();
    let goToSearch = () => {
        navigate("/search")
    }

    useEffect(() => {
        axios.get<Course[]>("http://localhost:8080/courses")
          .then((res) => {
            setAllCourses(res.data)
            console.log("Populated enrolled courses successfully")
          })
          .catch((error) => {
            console.error("Could not fetch the course list --> ", error);
          });
      }, [])

    /* Filter courses based on quer parameter and display to any visitor to the website */
    const handleSearch = (quer: string): void => {
        setQuerStr(quer)
        if (quer === '') {
            setShowResCourses(false);
        } else {
          const ignCaseQuer = quer.toLowerCase();
          const resCourses = allCourses.filter(
            (course) =>
              course.name.toLowerCase().includes(ignCaseQuer) ||
              course.description.toLowerCase().includes(ignCaseQuer)
          );
          setVisibleCourses(resCourses);
          console.log(resCourses);
          setShowResCourses(true);
        }
      };

    // On the GeneralHome Page, the nav bar should only show this page, the search page, 
    // and the login button 

    return (
        <div>
            <h1>RevTrivia</h1>

            <h2>
                Whether you're just cirious about a topic or training to be on the next episode of Jeopardy,
                RevTrivia is the one stop shop for your trivia learning needs. Courses are made by our talented
                education team, and with each course comes multiple quizzes to test your knowledge. With
                hundereds of courses made each day, and hundereds more updated with current information, you're
                bound to learn something new about whatever topic you want! Not sure where to start? Try searching
                for a specific topic in the search bar below.
            </h2>

            <br></br>
            <button onClick={goToSearch}>Search Test</button>
            <br></br>
            <br></br>

            <h2>Course Search:</h2>
            {/* Show table of some courses made and show their name, tags, and price*/}
            <input
            placeholder="Search Courses"
            value={querStr}
            onChange={(e) => setQuerStr(e.target.value)}
            />
            <button onClick={() => handleSearch(querStr)}>Look up Course</button>
            {showResCourses && (
                <div>
                {visibleCourses.map((course) => (
                    <li key={course.courseId}>
                        <h3>{course.name}</h3>
                        <p>{course.description}</p>
                        <p>{course.educatorId}</p>
                        <p>${course.fee}</p>
                    </li>
                ))}
                </div>
            )}
            
        </div>
    )
}

export default GeneralHome
