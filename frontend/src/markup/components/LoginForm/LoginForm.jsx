// import React , { useState } from 'react'
// import { useNavigate, useLocation} from 'react-router-dom'
// import loginService from '../../../services/login.service';

// function LoginForm() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [employee_email, setEmail] = useState('');
//   const [employee_password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [serverError, setServerError] = useState('');

//   const handleSubmit = async (e) => {
//     event.preventDefault();
//     // handle Client-side validation
//     let valid = true; // Flag to check if the form is valid
//     if (!employee_email) {
//       setEmailError('Please enter your email');
//       valid = false;
//     } else if (!employee_email.includes('@')) {
//       setEmailError('Invalid email format');
//       valid = false;
//     } else {
//       const regex = /^\S+@\S+\.\S+$/;
//       if (!regex.test(employee_email)) {
//         setEmailError('Invalid email format');
//         valid = false;
//       } else {
//         setEmailError('');
//       }
//     }
//     if (!employee_password || employee_password.length < 6) {
//       setPasswordError('Password must be at least 6 characters long');
//       valid = false;
//     } else {
//       setPasswordError('');
//     }
//     if (!valid) {
//       return;
//     }

//     // handle form submission
//     const formData = {
//       employee_email,
//       employee_password
//     };
//     console.log(formData);
//     const loginEmployee = loginService.loginEmployee(formData);
//     console.log(loginEmployee);
//     loginEmployee.then((response) => response.json())
//        .then((response) =>{
//         console.log(response);
//         if (response.status === 'success') {
//           // Store the token in local storage 
//           if(response.data.employeetoken){
//             localStorage.setItem('employee', JSON.stringify(response.data));
//           }
//           // Redirect to the dashboard or the page you want
//           console.log(location);
//           if (location.pathname === '/login') {
//             window.location.replace('/admin/employees')
//           }else{
//             window.location.reload();
//           }
//         } else{
//           // If there is an error, set the server error message
//           setServerError(response.message);
//         }
//        })
//         .catch((error) => {
//           console.error('Error:', error);
//           setServerError('An error occurred while logging in. Please try again later.');
//         });
//   }
//   return (
//    <section className="contact-section">
//       <div className="auto-container">
//         <div className="contact-title">
//           <h2>Login to your account</h2>
//         </div>
//         <div className="row clearfix">
//           <div className="form-column col-lg-7">
//             <div className="inner-column">
//               <div className="contact-form">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row clearfix">
//                     <div className="form-group col-md-12">
//                       {serverError && <div className='validation-error' role="alert">{serverError}</div>}
//                       <input type="email" value={employee_email} name="employee_email" placeholder="Email" 
//                       onChange={(event)=>setEmail(event.target.value)}/>
//                       {emailError && <div className='validation-error' role="alert">{emailError}</div>}
//                     </div>
//                     <div className="form-group col-md-12">
//                       <input type="password" vlalue={employee_password} name="employee_password" placeholder="Password" 
//                       onChange={(event)=>setPassword(event.target.value)}/>
//                       {passwordError && <div className='validation-error' role="alert">{passwordError}</div>}
//                     </div>
//                     <div className="form-group col-md-12">
//                       <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Login</span></button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default LoginForm
import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Alert,
  Box,
  Typography,
  Link,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import loginService from '../../../services/login.service';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [employee_email, setEmail] = useState('');
  const [employee_password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');
    let valid = true;

    // Validate email
    if (!employee_email) {
      setEmailError('Please enter your email');
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError('Invalid email format');
        valid = false;
      } else {
        setEmailError('');
      }
    }

    // Validate password
    if (!employee_password || employee_password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    try {
      const formData = {
        employee_email,
        employee_password,
      };

      const loginEmployee = await loginService.loginEmployee(formData);
      const response = await loginEmployee.json();

      if (response.status === 'success') {
        if (response.data.employeetoken) {
          localStorage.setItem('employee', JSON.stringify(response.data));
        }

        if (location.pathname === '/login') {
          window.location.replace('/admin/employees');
        } else {
          window.location.reload();
        }
      } else {
        setServerError(response.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setServerError('An error occurred. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: 'auto', mt: 8, px: 2 }}
      noValidate
    >
      <Typography variant="h5" align="center" gutterBottom>
        Login to Your Account
      </Typography>

      {serverError && <Alert severity="error">{serverError}</Alert>}

      <TextField
        fullWidth
        label="Email"
        name="employee_email"
        type="email"
        value={employee_email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        error={!!emailError}
        helperText={emailError}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />

      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel htmlFor="password" error={!!passwordError}>
          Password
        </InputLabel>
        <OutlinedInput
          id="password"
          name="employee_password"
          type={showPassword ? 'text' : 'password'}
          value={employee_password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {passwordError && (
          <Typography variant="caption" color="error">
            {passwordError}
          </Typography>
        )}
      </FormControl>

      <FormControlLabel
        control={<Checkbox name="remember" color="primary" />}
        label="Remember me"
        sx={{ mt: 1 }}
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Login
      </Button>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/forgot-password" variant="body2">
          Forgot password?
        </Link>
        <Link href="/register" variant="body2">
          Sign up
        </Link>
      </Box>
    </Box>
  );
}

export default LoginForm;
