import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "@/components/copyright";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hook/toolkitHook";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { createUser } from "@/store/features/authReducer";
import { registerSchema } from "@/schemaValidator";
import FieldErrorMessage from "@/components/fieldErrorMessage";

export type TRegister = z.infer<typeof registerSchema>;

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: TRegister) => {
    if (isValid) {
      dispatch(createUser(data));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form>
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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <FieldErrorMessage errors={errors} name="name">
                  <Controller
                    name={"name"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        autoFocus
                        margin="normal"
                        required
                        fullWidth
                        label="Full Name"
                        type="text"
                        autoComplete="given-name"
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </FieldErrorMessage>
              </Grid>
              <Grid item xs={12}>
                <FieldErrorMessage errors={errors} name="email">
                  <Controller
                    name={"email"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </FieldErrorMessage>
              </Grid>
              <Grid item xs={12}>
                <FieldErrorMessage errors={errors} name="password">
                  <Controller
                    name={"password"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </FieldErrorMessage>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default RegisterScreen;
