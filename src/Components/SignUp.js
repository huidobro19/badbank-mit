import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { UserContext } from './context';
import { AuthContext } from './context';
import './createaccount.css';

import { useNavigate } from 'react-router-dom';

// Material UI componet

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Paula Huidobro 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp({ previousPage }) {


  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isEmpty, setIsEmpty] = React.useState(true);
  

  
  const ctx = React.useContext(UserContext);  
  const { login } = React.useContext(AuthContext);
  const { isAuthentic} = React.useContext(AuthContext)
  const { showMessage} = React.useContext(AuthContext)
  const { setActiveButton} = React.useContext(AuthContext)

  function validate(field, label){
      if (!field) {
        setStatus('Error: Blank Space in ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleCreate(){
    console.log(name,email,password);
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;

    if (password.length < 8) {
      setStatus('Error: Password must be at least 8 characters long');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    ctx.users.push({name,email,password,balance:100});
    setShow(false);
    console.log(ctx.users)

    login();
    

  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setTimeout(() => setShow(true),300);
  }



  const navigate = useNavigate();
  

  // Función para manejar el clic en un botón
  const validRedirect = () => {
    if (previousPage) {
      // Redirige al usuario a la página anterior
      navigate(previousPage);
    } else {
      // Si no hay página anterior, redirige al inicio
      navigate('/');
      setActiveButton('home')
    }
  };    


  return (
    <div className='container-createAccount'>
      {show?(

        
      <ThemeProvider theme={defaultTheme}>
        <div className='container-Message'>
          {showMessage && <p className='message'>Please log in to access this page.</p>}
        </div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="Name"
                    required
                    fullWidth
                    id="firstName"
                    label="Name"
                    autoFocus
                    value={name} 
                    onChange={(e) => {
                      setName(e.currentTarget.value);
                      setIsEmpty(e.currentTarget.value === '' && email === '' && password === '');
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email} 
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                      setIsEmpty(name === '' && e.currentTarget.value === '' && password === '');
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password} 
                    onChange={(e) => {
                      setPassword(e.currentTarget.value);
                      setIsEmpty(name === '' && email === '' && e.currentTarget.value === '');
                    }}

                  />
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e)=> {e.preventDefault()
                  handleCreate();}}
                disabled={isEmpty}
              >
                Sign Up
              </Button>

            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      ):(
        <div className='container-createAccount'>
          <h5>Success!</h5>
          <h7>Add Another Account:</h7>
          <IconButton aria-label="fingerprint" color="success" onClick={clearForm}>
            <Fingerprint />
          </IconButton>

          <h7>Continue to Your Main Page: </h7>
          <button type="button" class="btn btn-outline-success" style={{marginTop:'10px'}} onClick={(e) => {
                            setActiveButton('home');
                            navigate("/");
                            
                    }} >Take me in!</button>

        </div>
      )}

      {status && (
          <p className="error-message">
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Error:"><use xlinkHref="#exclamation-triangle-fill"/></svg>
              <div>
                {status}
              </div>
            </div>
          </p>
          
          )}

    </div>
  );
}

export { UserContext };