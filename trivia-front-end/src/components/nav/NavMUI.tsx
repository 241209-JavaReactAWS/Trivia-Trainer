import { AppBar, Toolbar, IconButton, Typography, Box, Button, CssBaseline } from "@mui/material"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function NavMUI(props: { disableCustomTheme?: boolean }) {

    var eduId = localStorage.getItem("educator_id")

    var stuId = localStorage.getItem("student_id")

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
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <AppBar component="nav" sx={{ backgroundColor: "#FF8C00" }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                        </IconButton>
                        <img src="RevTriviaLogo.png" style={{ 
                            width: '140px', 
                            height: '60px',  
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",}}
                        />
                        {/* <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                position: "absolute",
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        >
                            RevTrivia
                        </Typography> */}
                        
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                            {!(stuId || eduId) && (
                            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                            )}
                            {/* <Button color="inherit" onClick={() => navigate('/login')}>Login</Button> */}
                            {/*<Button color="inherit" onClick={() => navigate('/studentHomeMUI')}>Student Home</Button>*/}
                            {/*<Button color="inherit" onClick={() => navigate('/proctorHome')}>Proctor Home</Button>*/}
                            { eduId && (
                            <Button color="inherit" onClick={() => navigate("/proctorHome")}>Profile</Button>
                            )}
                            {stuId && (
                            <Button color="inherit" onClick={() => navigate("/studentHomeMUI")}>Profile</Button>
                            )}

                            {(stuId || eduId) && (
                            <Button color="inherit" onClick={logout}>Log Out</Button>
                            )}

                        </Box>

                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            {/* Color Mode Dropdown for smaller screens */}
                            <ColorModeIconDropdown />
                        </Box>
                        {/* Color Mode Select for larger screens */}
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                        </Box>
                    </Toolbar>
                </AppBar>
            </AppTheme>
        </>
    )
}

export default NavMUI;

