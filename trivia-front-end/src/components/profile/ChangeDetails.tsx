import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function ChangeDetails() {

    const location = useLocation();
    const navigate = useNavigate();

    const [newDetails, setNewDetails] = useState("")
    const { eduId } = location.state || {};

    let confirmChanges = () => {
        console.log(newDetails)
        console.log("Making Changes");

        // Update the professional details        
        axios.patch(`${backendUrl}/educator/${eduId}/${newDetails}`, 
        ).then((res) => {
            console.log(res.data)
            // localStorage.setItem("professional-details", newDetails)
            alert("Professional Details Changed!")
            navigate("/profile")
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <div>
            <h1>Change Details</h1>
            <h2>Update your professional details below:</h2>
            <label>
                Professional Details: {" "}
                <br></br>
                <textarea
                    id="newDetailsField"
                    value={newDetails}
                    onChange={(e: ChangeEvent) => {
                        setNewDetails((e.target as HTMLTextAreaElement).value);
                    }}
                    style={{ width: "500px", height: "100px" }}
                />
            </label>
            <br></br>
            <br></br>
            <button onClick={confirmChanges}>Confirm Changes</button>
        </div>
    )
}

export default ChangeDetails
