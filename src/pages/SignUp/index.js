import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '~/assets/images/logo.png';
import AccountAPI from '~/api/AccountAPI';
import Avatar from '@mui/material/Avatar';

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [dobError, setDobError] = useState(false);
    const [dobHelperText, setDobHelperText] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [usernameHelperText, setUsernameHelperText] = useState('');
    const [imageError, setImageError] = useState(false);
    const [imageHelperText, setImageHelperText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [universities, setUniversities] = useState([]);
    const [imageSelected, setImageSelected] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await UniversityAPI.getAllForDropDownList();
    //             setUniversities(response);
    //         } catch (error) {
    //             console.error('Error fetching universities:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    const validateEmail = (email) => {
        const emailRegex =
            /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/i;
        return emailRegex.test(email);
    };

    const validateDOB = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 17;
    };

    const validatePassword = (password) => {
        return password.length >= 10;
    };

    const validateUsername = (username) => {
        return username.length >= 5;
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (validImageTypes.includes(fileType)) {
                setImageError(false);
                setImageHelperText('');
                const reader = new FileReader();
                reader.onload = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
                setImageFile(file);
                setImageSelected(true);
            } else {
                setImageError(true);
                setImageHelperText('Only JPEG, JPG, and PNG files are allowed.');
                setImagePreview(null);
                setImageFile(null);
            }
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setImageFile(null);
        setImageError(false);
        setImageHelperText('');
        setImageSelected(false);
        document.getElementById('avatarUrl').value = null;
    };

    const validateAllField = (data) => {
        let result = true;

        const emailValue = data.get('email');
        if (!validateEmail(emailValue)) {
            setEmailError(true);
            setEmailHelperText('Incorrect email format.');
            result = false;
        } else {
            setEmailError(false);
            setEmailHelperText('');
        }

        const dobValue = data.get('dob');
        if (!validateDOB(dobValue)) {
            setDobError(true);
            setDobHelperText('You must be at least 17 years old.');
            result = false;
        } else {
            setDobError(false);
            setDobHelperText('');
        }

        const passwordValue = data.get('password');
        if (!validatePassword(passwordValue)) {
            setPasswordError(true);
            setPasswordHelperText('Password must be at least 10 characters long.');
            result = false;
        } else {
            setPasswordError(false);
            setPasswordHelperText('');
        }

        const usernameValue = data.get('username');
        if (!validateUsername(usernameValue)) {
            setUsernameError(true);
            setUsernameHelperText('Username must be at least 5 characters long.');
            result = false;
        } else {
            setUsernameError(false);
            setUsernameHelperText('');
        }

        return result;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('roleName', 'admin');

        if (validateAllField(data)) {
            try {
                const result = await AccountAPI.createAccount(data);
                navigate('/sign-in', { state: { signupSuccess: true } });
            } catch (error) {
                console.log(error);
            }
        }
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
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        background: 'linear-gradient(180deg, #9CEE8D, #0B749C)',
                    }}
                >
                    <img src={logo} style={{ width: 150, height: 150, margin: '37%' }} alt="Logo" />
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
                            Sign up as mentee
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
                            <TextField
                                type="file"
                                id="avatarUrl"
                                name="avatarUrl"
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                                accept="image/jpeg, image/jpg, image/png"
                            />

                            <Box
                                sx={{
                                    mt: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar
                                    alt="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F452030%2Favatar-default&psig=AOvVaw2Eepet3Jt6CuwNIc10izZr&ust=1718112366877000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOi0-r2R0YYDFQAAAAAdAAAAABAE"
                                    src={imagePreview}
                                    sx={{ width: 90, height: 90, border: 'solid 2px black' }}
                                    helperText="Avatar"
                                />
                            </Box>
                            <Button
                                variant="contained"
                                sx={{ mt: 2, ml: '50%', transform: 'translate(-50%)' }}
                                onClick={
                                    imageSelected
                                        ? handleRemoveImage
                                        : () => document.getElementById('avatarUrl').click()
                                }
                            >
                                {imageSelected ? 'Remove Avatar' : 'Please Choose Avatar'}
                            </Button>
                            <TextField
                                error={usernameError}
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                helperText={usernameHelperText}
                            />
                            {/* <Autocomplete
                                disablePortal
                                required
                                fullWidth
                                id="university"
                                options={universities}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} label="University" margin="normal" />}
                            /> */}
                            <TextField
                                error={dobError}
                                margin="normal"
                                required
                                fullWidth
                                name="dob"
                                label="Date of Birth"
                                type="date"
                                defaultValue="2000-05-31"
                                id="dob"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText={dobHelperText}
                            />
                            <TextField
                                error={emailError}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                type="email"
                                helperText={emailHelperText}
                            />
                            <TextField
                                error={passwordError}
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                autoComplete="phone"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                helperText={passwordHelperText}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign Up
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link to="/sign-in" variant="body2">
                                        Sign In
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
