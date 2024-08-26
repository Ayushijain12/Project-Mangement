import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Paper } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { OTPPasswordToEmp } from '../redux/Slice/authSlice';
import SnackbarAlert from './CustomComponents/SnackbarAlert';
import { otpvalidationSchema } from '../utils/validationSchemas';

const defaultTheme = createTheme();


export default function SignInSide() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const handSubmit = async (values) => {
        try {
            const result = await dispatch(OTPPasswordToEmp(values));
            const response = result.payload;
            if (response.status === 200) {
                setOpen(true);
                setMessage(response.message);
                setSeverity("success");
                setTimeout(() => {
                    navigate('/change/password');
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
                            Verify OTP
                        </Typography>
                        <Formik
                            initialValues={{
                                otp: '', 
                                email: localStorage.getItem('email')
                            }}
                            validationSchema={otpvalidationSchema}
                            onSubmit={handSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        name="otp"
                                        as={TextField}
                                        label="OTP"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.otp ? errors.otp : ''}
                                        error={touched.otp && Boolean(errors.otp)}
                                    />

                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Verify
                                    </Button>
                                   
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
