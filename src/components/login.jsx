import React, { useState } from 'react';
import { Button, Grid, Typography, Box, Paper } from '@mui/material';
import { Formik, Form } from 'formik';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import { ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useDispatch } from 'react-redux';
import { loginToEmp } from '../redux/Slice/authSlice';
import SnackbarAlert from './CustomComponents/SnackbarAlert';
import { loginValidationSchema } from '../utils/validationSchemas';
import { defaultTheme } from '../utils/theme';
import TextFieldComponent from './CustomComponents/TextFieldComponent';
import { EMAIL, PASSWORD } from '../constants/routes';



export default function SignInSide(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");


    const handSubmit = async (values) => {
        try {
            const result = await dispatch(loginToEmp(values));
            const response = result.payload;
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data[0]));
                localStorage.setItem('isLogin', 'true');

                setOpen(true);
                setMessage(response.message);
                setSeverity("success");
                setTimeout(() => {
                    props.onLogin();
                    navigate('/');
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
    };

    const handleClose = () => {
        setOpen(!open);
    };

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
                            Login Employee
                        </Typography>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={loginValidationSchema}
                            onSubmit={handSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <TextFieldComponent
                                        name="email"
                                        label={EMAIL}
                                        touched={touched}
                                        errors={errors}
                                        required={true}
                                    />
                                    <TextFieldComponent
                                        name="password"
                                        label={PASSWORD}
                                        type="password"
                                        touched={touched}
                                        errors={errors}
                                        required={true}
                                    />
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Login
                                    </Button>
                                    <Grid container style={{ margin: '10px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                        <Grid item>
                                            <Link onClick={() => navigate('/register')} variant="body2" sx={{ cursor: 'pointer' }}>
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link onClick={() => navigate('/forget/password')} variant="body2" sx={{ cursor: 'pointer' }}>
                                                {"Forgot Password?"}
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
}
