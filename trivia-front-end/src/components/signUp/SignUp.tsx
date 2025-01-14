import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import { useNavigate } from 'react-router-dom';
import { FormHelperText, Radio, RadioGroup } from '@mui/material';
import axios from 'axios';
import { decodeAccessTokenInStorage } from '../../utils/JwtDecoder';
import emailValidator from 'email-validator';


const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Card = styled(MuiCard)(({ theme }) => ({
  minHeight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [signupRole, setSignupRole] = React.useState<string>("")
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [signupRoleError, setSignupRoleError] = React.useState("");
  

  

  const navigate = useNavigate();
  const handleSignInNav = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate('/login');
  };

  const validateInputs = () => {
    let isValid = true;

    if (!username || username.length < 4) {
      setUsernameError('Username must be at least 4 characters long.');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!firstName) {
      setFirstNameError('First name is a required field')
      isValid = false;
    } else {
      setFirstNameError('')
    }

    if (!email) {
      setEmailError('Email is a required field')
      isValid = false;
    } else if (!emailValidator.validate(email)){
      setEmailError('Please enter a valid email')
      isValid = false;
    } else {
      setEmailError('')
    }

    if (!lastName) {
      setLastNameError('Last name is a required field')
      isValid = false;
    } else {
      setLastNameError('')
    }

    if (!signupRole) {
      setSignupRoleError('Please choose a role')
      isValid = false;
    } else {
      setSignupRoleError('')
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (firstNameError || lastNameError || emailError || usernameError || passwordError || signupRoleError) {
      event.preventDefault();
      return;
    }
    axios.post(`${backendUrl}/auth/register/${signupRole}`, {
      username,
      password,
      email,
      firstName,
      lastName
    })
    .then((response) => {
      localStorage.clear()
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      decodeAccessTokenInStorage()
      navigate("/")
    })
    .catch((error) => {
      console.error("Register error:", error);
    });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'left'}}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, }}
          >
            <FormControl>
            <FormLabel sx={{ textAlign: 'left' }}>First Name</FormLabel>
              <TextField
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                fullWidth
                placeholder="Jane"
                error={firstNameError != ""}
                helperText={firstNameError}
                color={firstNameError != "" ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
            <FormLabel sx={{ textAlign: 'left' }}>Last Name</FormLabel>
              <TextField
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                fullWidth
                placeholder="Doe"
                error={lastNameError != ""}
                helperText={lastNameError}
                color={lastNameError != "" ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
            <FormLabel sx={{ textAlign: 'left' }}>Email</FormLabel>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                type="email"
                placeholder="example@email.com"
                error={emailError != ""}
                helperText={emailError}
                color={emailError != "" ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
            <FormLabel sx={{ textAlign: 'left' }}>Username</FormLabel>
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
                placeholder="Enter a username"
                error={usernameError != ""}
                helperText={usernameError}
                color={usernameError != "" ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
            <FormLabel sx={{ textAlign: 'left' }}>Password</FormLabel>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                type="password"
                placeholder="Enter a password"
                error={passwordError != ""}
                helperText={passwordError}
                color={passwordError != "" ? "error" : "primary"}
              />
            </FormControl>
            
            <FormControl error={signupRoleError !== ""} required>
              <FormLabel sx={{ textAlign: 'left' }}>Role</FormLabel>
              <RadioGroup
                aria-label="role"
                name="role"
                value={signupRole}
                onChange={(event) => setSignupRole(event.target.value)}
                sx={{ flexDirection: 'row' }}
              >
                <FormControlLabel
                  value="student"
                  control={<Radio />}
                  label="Competitor"
                />
                <FormControlLabel
                  value="educator"
                  control={<Radio />}
                  label="Proctor"
                />
              </RadioGroup>
              {signupRoleError && (
                <FormHelperText>{signupRoleError}</FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              
            >
              Sign up
            </Button>
          </Box>
          </Card>
      </SignUpContainer>
      <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <br></br>
      <Card variant='outlined'>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: '2px' }}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                onClick={handleSignInNav}
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
    </AppTheme>
  );
}