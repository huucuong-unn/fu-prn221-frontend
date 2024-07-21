import * as React from 'react';
import { Button, TextField, Paper, Box, Grid, Typography, Alert } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import AccountAPI from '~/api/AccountAPI';
import Logo from '~/assets/images/newlogo.png';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Tortee
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

const validate = values => {
    const errors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /.{6,}/;

    if (!values.email) {
        errors.email = 'Vui lòng nhập email';
    } else if (!emailRegex.test(values.email)) {
        errors.email = 'Email không hợp lệ';
    }

    if (!values.password) {
        errors.password = 'Vui lòng nhập mật khẩu';
    } else if (!passwordRegex.test(values.password)) {
        errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    return errors;
};

export default function SignInSide() {
    const [showAlert, setShowAlert] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.signupSuccess) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000); // Show alert for 5 seconds
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const userInfo = await AccountAPI.login(values);

            if (userInfo) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
        setSubmitting(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {showAlert && (
                <Alert width="50%" variant="filled" severity="success">
                    Login Successfully
                </Alert>
            )}
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    }}
                >
                    <img src={Logo} style={{ width: 250, height: 150, margin: '37%' }} alt="Logo" />
                </Grid>
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
                        <Typography component="h1" variant="h4">
                            Sign in
                        </Typography>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={validate}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, isSubmitting }) => (
                                <Form noValidate>
                                    <Field
                                        as={TextField}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                    <Field
                                        as={TextField}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isSubmitting}>
                                        Sign In
                                    </Button>
                                    <Copyright sx={{ mt: 5 }} />
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
