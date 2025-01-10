import { AppBar, Toolbar, IconButton, Typography, Box, Button } from "@mui/material"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function NavMUI() {

    const navigate = useNavigate();

    const logout = () => {
        const token = localStorage.getItem('accessToken');
        axios.post(
            `${backendUrl}/auth/logout`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        )
        localStorage.clear()
        navigate("/login")
    }

    return (
        <>
            <AppBar component="nav" sx={{ backgroundColor: "#F57C00" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        RevTrivia
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                        <Button color="inherit" onClick={() => navigate('/studentHome')}>Student Home</Button>
                        <Button color="inherit" onClick={() => navigate('/courseCreate')}>Course Create</Button>
                        <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
                        <Button color="inherit" onClick={logout}>Log out</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavMUI
