"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useSnackbar from "../hooks/useSnackbar";
import { updateUser } from "../services/user";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { UserDto } from "../types/user";
import { useUser } from "../hooks/useUser";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function EditAccount() {
  const { setSnackbar } = useSnackbar();
  const { id } = useAuthContext();
  const [userInfo, setUserInfo] = useState<UserDto>(initialState);
  const { user } = useUser(id);

  useEffect(() => {
    if (user) {
      setUserInfo({ name: user?.name, email: user?.email, password: "" });
    }
  }, [user]);

  if (id == "") {
    return (
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", my: 5 }}>
        Realize o login para editar as informações do seu perfil.
      </Typography>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedUserInfo = {
      name: userInfo.name.toString(),
      email: userInfo.email.toString(),
      password: userInfo.password.toString(),
    };

    try {
      const response = await updateUser(id, formattedUserInfo);
      setSnackbar("Informações editadas com sucesso!");
    } catch (err) {
      setSnackbar("Erro ao efetuar a edição das informações", "error");
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#32a852" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Editar Conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Nome Completo"
                autoFocus
                value={userInfo.name}
                onChange={(event) => {
                  setUserInfo({ ...userInfo, name: event.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                value={userInfo.email}
                onChange={(event) => {
                  setUserInfo({ ...userInfo, email: event.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
                value={userInfo.password}
                onChange={(event) => {
                  setUserInfo({ ...userInfo, password: event.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Eu quero receber inspiração, promoções de marketing e atualizações por e-mail."
              />
            </Grid>
          </Grid>
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
            Editar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
