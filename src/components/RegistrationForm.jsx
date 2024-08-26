import React, { useState } from 'react';
import { Button, Grid, Typography, Box, Paper } from '@mui/material';
import { Formik, Form } from 'formik';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RegisterToEmp } from '../redux/Slice/authSlice';
import { registrationValidationSchema } from '../utils/validationSchemas';
import { defaultTheme } from '../utils/theme';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextFieldComponent from './CustomComponents/TextFieldComponent';
import SnackbarAlert from './CustomComponents/SnackbarAlert';


const RegistrationForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");


  const handSubmit = async (values) => {
    if (values.email !== "" && values.password !== "" && values.username !== "") {

      try {
        const result = await dispatch(RegisterToEmp(values));
        const response = result.payload;
        if (response.status === 200) {
          setOpen(true);
          setMessage(response.message);
          setSeverity("success");
          setTimeout(function () {
            navigate('/login');
          }, 1000);
        } else {
          setOpen(true);
          setSeverity("error");
          setMessage(response.error);
        }
      } catch (error) {
        setOpen(true);
        setSeverity("error");
        setMessage("Something Went Wrong!!")
      }
    }
  }

  const handleClose = () => {
    setOpen(!open);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("/test.jpg")',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register Employee
            </Typography>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
              }}
              validationSchema={registrationValidationSchema}
              onSubmit={handSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <TextFieldComponent name="username" label="User Name" touched={touched} errors={errors} required={true} />
                  <TextFieldComponent name="email" label="Email" touched={touched} errors={errors} required={true} />
                  <TextFieldComponent name="password" label="Password" type="password" touched={touched} errors={errors} required={true} />
                  <TextFieldComponent name="companyname" label="Company Name" touched={touched} errors={errors} required={true} />
                  <TextFieldComponent name="department" label="Department" touched={touched} errors={errors} required={true} />
                  <TextFieldComponent name="mobile" label="Mobile" type="number" touched={touched} errors={errors} inputProps={{ maxLength: 10 }} required={true} />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                  </Button>
                  <Grid container style={{ margin: '10px' }}>
                    <Grid item>
                      <Link onClick={() => navigate('/login')} variant="body2"
                        sx={{ cursor: 'pointer' }}>
                        {"Already had account? Login here"}
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
      <SnackbarAlert
        open={open}
        severity={severity}
        onClose={handleClose}
        message={message}
      />
    </ThemeProvider>

  );
};

export default RegistrationForm;
