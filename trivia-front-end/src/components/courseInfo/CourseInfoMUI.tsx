import { useLocation, useNavigate } from "react-router-dom";
import { Course } from "../interfaces/Course";
import { Card, CardContent, Typography, CardActions, Button, CssBaseline } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { useEffect, useState } from "react";
import axios from "axios";

function CourseInfoMUI(props: { disableCustomTheme?: boolean }) {
    /* Setting role to conditionally render create quiz option */
    const [roleEd, setRoleEd] = useState<boolean>(false);

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

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <div>
                {/* MUI Card to display the selected Course */}
                <Card key={course.courseId} sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            {course.name}
                        </Typography><Typography gutterBottom variant="body1" component="div">
                            {course.description}
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div">
                            Educator ID: {course.educator.educatorId}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                            ${course.fee}
                        </Typography>
                    </CardContent>
                    {/* Button only for educators who had created the displayed course */}
                    {roleEd && (
                        <CardActions>
                            <Button size="small" onClick={() => navigate("/quizCreate", { state: { course } })}>Create Quiz</Button>
                        </CardActions>
                    )}
                    
                    {/* Profile Button for Everyone (conditional render?) */}
                    <CardActions>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => navigate("/profile")}
                        >
                            Go to Profile
                        </Button>
                    </CardActions>
                </Card>

            </div>
        </AppTheme>
    );
}

export default CourseInfoMUI;