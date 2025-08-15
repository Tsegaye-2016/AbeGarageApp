import React, { useState } from 'react';
import {
  Box,
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
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import loginService from '../../../services/login.service';

function LoginForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    let valid = true;

    const newErrors = { email: '', password: '' };

    // Email validation
    if (!email) {
      newErrors.email = 'Please enter your email';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    // Password validation
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      const formData = { employee_email: email, employee_password: password };
      const res = await loginService.loginEmployee(formData);
      const response = await res.json();

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
      setServerError('An error occurred. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        px: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'white',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Sign in to your account
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.password}>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {errors.password && (
            <Typography variant="caption" color="error">
              {errors.password}
            </Typography>
          )}
        </FormControl>

        <FormControlLabel
          control={<Checkbox defaultChecked />}
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

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 14,
          }}
        >
          <RouterLink to="/forgot-password" style={{ color: theme.palette.primary.main }}>
            Forgot password?
          </RouterLink>
          <RouterLink to="/register" style={{ color: theme.palette.primary.main }}>
            Create account
          </RouterLink>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
