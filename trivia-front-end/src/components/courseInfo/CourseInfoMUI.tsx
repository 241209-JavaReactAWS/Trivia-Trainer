import { useLocation, useNavigate } from "react-router-dom";
import { Course } from "../interfaces/Course";
import { Card, CardContent, Typography, CardActions, Button, CssBaseline } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import { Educator } from "../interfaces/Educator";

function CourseInfoMUI(props: { disableCustomTheme?: boolean }) {
    /* Setting role to conditionally render create quiz option */
    const [roleEd, setRoleEd] = useState<boolean>(false);
    const [educator, setEducator] = useState<Educator>();

    /// Usable things from react-router-dom
    const location = useLocation();
    const navigate = useNavigate();

    // Get the course from a course in StudentHome.tsx and get the courseId
    const course: Course = location.state?.course;
    if (!course) {
        return <p>No course selected!</p>;
    }

    useEffect(() => {
        /*  Only display editable and deletable courses if the user is an educator, and if the educator is the creater of the courses. */
        const role = localStorage.getItem("roles");
        let edId = localStorage.getItem("educator_id");
        if (role === "EDUCATOR" && edId !== null && course.educator.educatorId == parseInt(edId)) {
            setRoleEd(true);
        } else {
            setRoleEd(false);
            console.log("Create Quiz option disabled for normal user.")
        }
    }, []
    )

    useEffect(() => {
        let edId = course.educator.educatorId;
        axios.get<Educator>(`http://localhost:8080/educators/${edId}`)
            .then((res) => {
                setEducator(res.data)
            })
            .catch((error) => {
                console.error("Could not fetch the educator object --> ", error)
            });
    }, []
    )

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <div>
                <Typography gutterBottom variant="h1" component="div">
                    {course.name}
                </Typography>
                <hr /> <br />
                <Typography gutterBottom variant="h2" component="div">
                    {course.description}
                </Typography>
                <Typography gutterBottom variant="h2" component="div">
                    Educator ID: {course.educator.educatorId}
                </Typography>
                {/* <Typography gutterBottom variant="h2" component="div">
                    Educator: {educator?.user?.firstName}
                </Typography> */}
                <Typography gutterBottom variant="h2" component="div">
                    Fees: ${course.fee}
                </Typography>
                <Button size="large" onClick={() => navigate("/studentHomeMUI")}>
                    Back to Student Home
                </Button>
            </div>
        </AppTheme>
    );
}

export default CourseInfoMUI;