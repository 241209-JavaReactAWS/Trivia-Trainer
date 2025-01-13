import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { RevTriviaLogo } from '../shared-theme/RevTriviaLogo.png';
import axios from 'axios';
import { decodeAccessTokenInStorage } from '../../utils/JwtDecoder.ts';
import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
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

export default function SignInCard() {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordError || usernameError) {
      event.preventDefault();
      return;
    }
    axios.post(`${backendUrl}/auth/authenticate`, {
      username,
      password
    })
    .then((response) => {
      localStorage.clear()
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      decodeAccessTokenInStorage()
      navigate("/")
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
  };

  const handleSignUpNav = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate('/signup');
  };

  const validateInputs = () => {
    let isValid = true;
    if (!username) {
      setUsernameError(true);
      setUsernameErrorMessage('Username must be at least 4 characters long.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    return isValid;
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', 
          textAlign: 'left'
        }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2}}
      >
        <FormControl>
        <FormLabel sx={{ textAlign: 'left' }}>Username</FormLabel>
          <TextField
            error={usernameError}
            helperText={usernameErrorMessage}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={'primary'}
          />
        </FormControl>
        <FormControl>
        <FormLabel sx={{ textAlign: 'left' }}>Password</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            value={password}
            type="password"
            placeholder="••••••"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
          Sign in
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <span>
            <Link
              onClick={handleSignUpNav}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  );
}
