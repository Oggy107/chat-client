import React from "react";

import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { AuthPageProps, AuthPageType } from "../../types/auth";
import UserContext from "../../context/user";
import { postFormData } from "../../utils/service";

const theme = createTheme({});

const Login = ({ setPage }: AuthPageProps): JSX.Element => {
    const userContext = React.useContext(UserContext);
    const [loading, setLoading] = React.useState<boolean>(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string
        }

        // formData.append('email', formData.get('email') as string);
        // formData.append('password', formData.get('password') as string);

        // console.log({
        //     email: data.get("email"),
        //     password: data.get("password"),
        // });

        // TODO: refactor to send actual data

        // try {
        //     const respose = await axios({
        //         method: "post",
        //         url: `${SERVER_URL}/login`,
        //         data: qs.stringify(data),
        //         headers: { "content-Type": "application/x-www-form-urlencoded" },
        //     })
            
        //     userContext.login(respose.data);
        // } catch (error) {
        //     setLoading(false)
        //     console.log(error)
        // }

        const response = await postFormData('login', data)
        // userContext.login(response);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
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
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            fullWidth
                            onAnimationEnd={() => setLoading(true)}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </LoadingButton>
                        <Container>
                            <Typography
                                variant="body2"
                                onClick={() => {setPage(AuthPageType.SIGNUP)}}
                                textAlign="center"
                                sx={{ cursor: "pointer", color: "primary.main" }}
                            >
                                {"Don't have an account? Sign Up"}
                            </Typography>
                        </Container>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    );
}

export default Login;