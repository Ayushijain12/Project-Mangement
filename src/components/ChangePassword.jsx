import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Paper } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useDispatch } from 'react-redux';
import { changePassword } from '../redux/Slice/authSlice'; // Assuming this is the correct action
import SnackbarAlert from './CustomComponents/SnackbarAlert';
import { NEWPASSWORD, CNEWPASSWORD } from '../constants/routes';
import { ChangevalidationSchema } from '../utils/validationSchemas';

const defaultTheme = createTheme();


export default function ChangePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const handleSubmit = async (values) => {
        try {
            const result = await dispatch(changePassword(values));
            const response = result.payload;
            if (response.status === 200) {
                setOpen(true);
                setMessage(response.message);
                setSeverity("success");

                // Redirect to login or another appropriate page
                setTimeout(() => {
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
            setMessage("Something Went Wrong!!");
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
                        backgroundImage: 'url("/test.jpg")',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
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
                            Change Password
                        </Typography>
                        <Formik
                            initialValues={{
                                newPassword: '',
                                confirmPassword: '',
                                email: localStorage.getItem('email')
                            }}
                            validationSchema={ChangevalidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        name="newPassword"
                                        as={TextField}
                                        label={NEWPASSWORD}
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.newPassword ? errors.newPassword : ''}
                                        error={touched.newPassword && Boolean(errors.newPassword)}
                                    />
                                    <Field
                                        name="confirmPassword"
                                        as={TextField}
                                        label={CNEWPASSWORD}
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.confirmPassword ? errors.confirmPassword : ''}
                                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    />
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Change Password
                                    </Button>
                                    <Grid container style={{ margin: '10px 0px', display : 'flex', justifyContent: 'space-between' }}>
                                        <Grid item>
                                            <Link onClick={() => navigate('/login')} variant="body2" sx={{ cursor: 'pointer' }}>
                                                {"Back to Login"}
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
