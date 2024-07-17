"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Copyright } from "../components/Copyright";
import { Link, Typography } from "@mui/material";
import useAuthContext from "../hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SuccessSnackbar from "../components/SuccessSnackbar";
import ErrorSnackbar from "../components/ErrorSnackbar";
import WarningSnackbar from "../components/WarningSnackbar";

export default function Login() {
  const router = useRouter();
  const { user, setUser } = useAuthContext();

  const [open, setOpen] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user !== "") {
      setMessage("Usuário já logado no sistema");
      setOpen(3);
      router.push("/");
    } else {
      const data = new FormData(event.currentTarget);

      const credentials = {
        email: data.get("email") as string,
        password: data.get("password") as string,
      };

      try {
        const response = await fetch("http://localhost:9000/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          setMessage("Erro ao efetuar o login");
          setOpen(2);
          throw new Error("Error on login attempt");
        }

        const data = await response.json();

        setUser(data.id);

        setMessage("Login efetuado com sucesso!");
        setOpen(1);
        router.push("/");
      } catch (error) {
        console.log(error);
        setMessage("Erro ao efetuar o login!");
        setOpen(2);
      }
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(side_login.svg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          // 551 x 366
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#32a852" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate method="POST" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar meu usuário e senha"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#32a852",
                "&:hover": { backgroundColor: "#008000" },
                textTransform: "none",
              }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Não tem uma conta? Criar conta"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>

      <SuccessSnackbar message={message} open={open == 1} setOpen={setOpen} />
      <ErrorSnackbar message={message} open={open == 2} setOpen={setOpen} />
      <WarningSnackbar message={message} open={open == 3} setOpen={setOpen} />
    </Grid>
  );
}
