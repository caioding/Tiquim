"use client";

import { Box, Button, Container, CssBaseline, Grid, InputLabel, TextField, Typography } from "@mui/material";

export default function CreateCampaigns() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: '50px'
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Criar Campanha
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ textTransform: "none", backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'black' } }}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor="title" sx={{ color: 'black' }}>Título</InputLabel>
              <TextField
                required
                fullWidth
                id="title"
                name="title"
                autoComplete="title"
                autoFocus
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="goal" sx={{ color: 'black' }}>Meta</InputLabel>
              <TextField
                required
                fullWidth
                id="goal"
                name="goal"
                type="number"
                autoComplete="goal"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="category" sx={{ color: 'black' }}>Categoria</InputLabel>
              <TextField
                required
                fullWidth
                id="category"
                name="category"
                autoComplete="category"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="deadline" sx={{ color: 'black' }} >Prazo</InputLabel>
              <TextField
                required
                fullWidth
                id="deadline"
                name="deadline"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="deadline"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="description" sx={{ color: 'black' }}>Descrição</InputLabel>
              <TextField
                required
                fullWidth
                id="description"
                name="description"
                multiline
                rows={4}
                autoComplete="description"
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
} 
