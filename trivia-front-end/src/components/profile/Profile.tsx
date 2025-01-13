import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { CssBaseline } from "@mui/material";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Profile(props: { disableCustomTheme?: boolean }) {

    // Usable things from react-router-dom
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({});
    const username = localStorage.getItem("username")
    /* Welcome message variables */
    const f_name = localStorage.getItem("first_name")
    const l_name = localStorage.getItem("last_name")
    const [profDetails, setProfDetails] = useState("");
    var eduId = localStorage.getItem("educator_id")

    let changeDetails = () => {
        navigate("/changeDetails")
    }

    useEffect(() => {
        {/*if (!eduId) {
            // alert("Please log in to view your profile");
            navigate("/login");
        }*/}
        axios
            .get(`${backendUrl}/educator/${eduId}`)
            .then((response) => {
                setCurrentUser(response.data);
                setProfDetails(response.data.details);
            })
            .catch((error) => {
                console.error("Error fetching educator details:", error);
            });
    }, [eduId]);

    return (
        <AppTheme {...props }>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <div>
            <h1>Welcome, {f_name} {l_name}!</h1>
            <h2>Professional Details: {profDetails}</h2>

            {/* STEP 1: Make sure educator can change their professional details */}
            {/* <button onClick={changeDetails}>Change Professional Details</button> */}
            {/* <h1>{userId}</h1> */}
            {eduId && (
            <button onClick={() => navigate("/changeDetails", { state: { eduId } })}>Change Professional Details</button>
            )}
            { eduId && (
                <button onClick={() => navigate("/courseCreateMUI")}>Proctor Home</button>
            )}

            {!eduId && (
                <button onClick={() => navigate("/studentHomeMUI")}>Student Home</button>
            )}
        </div>
        </AppTheme >
    )
}

export default Profile
