"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Grouped from "../components/CategoriesInput";
import FormattedInputs from "../components/NumberFormat";
import InputFileUpload from "../components/FileUpload";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Campaign } from "../types/campaign";

export default function CreateCampaign() {
  const [campaignInfo, setCampaignInfo] = useState<Campaign>({
    id: "",
    title: "",
    preview: "",
    description: "",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deadline: new Date(),
    category: "",
    goal: 0,
    userId: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Campaign>();

  const handleFormSubmit = (data: Campaign) => {
    console.log(data);
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
          marginBottom: "50px",
        }}
      >
        <Card
          variant="elevation"
          sx={{
            minWidth: 275,
            backgroundColor: "#f8fafa",
            border: "20px solid #f8fafa",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Criar Campanha
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#32a852",
                    color: "white",
                    "&:hover": { backgroundColor: "#008000" },
                  }}
                  onClick={handleSubmit(handleFormSubmit)}
                >
                  Salvar
                </Button>
              </Grid>
            </Grid>
            <Box
              component="form"
              onSubmit={handleSubmit(handleFormSubmit)}
              sx={{ mt: 3, width: "100%" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="title" sx={{ color: "black" }}>
                    Título
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="title"
                    autoComplete="title"
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    sx={{ backgroundColor: "white" }}
                    inputProps={{ maxLength: 50 }}
                    {...register("title", { required: true })}
                  />
                  {errors.title?.type === "required" && (
                    <span className="text-danger">Esse campo é obrigatório</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="goal" sx={{ color: "black" }}>
                    Meta
                  </InputLabel>
                  <FormattedInputs />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="category" sx={{ color: "black" }}>
                    Categorias
                  </InputLabel>
                  <Grouped />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="deadline" sx={{ color: "black" }}>
                    Prazo
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="deadline"
                    type="date"
                    sx={{ backgroundColor: "white" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoComplete="deadline"
                    variant="outlined"
                    margin="normal"
                    {...register("deadline", { required: true })}
                  />
                  {errors.deadline?.type === "required" && (
                    <span className="text-danger">Esse campo é obrigatório</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="imageUrl" sx={{ color: "black" }}>
                    ImageURL
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="imageUrl"
                    autoComplete="imageUrl"
                    variant="outlined"
                    margin="normal"
                    sx={{ backgroundColor: "white" }}
                    {...register("imageUrl", { required: true })}
                  />
                  {errors.imageUrl?.type === "required" && (
                    <span className="text-danger">Esse campo é obrigatório</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="preview" sx={{ color: "black" }}>
                    Preview
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="preview"
                    autoComplete="preview"
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    sx={{ backgroundColor: "white" }}
                    inputProps={{ maxLength: 120 }}
                    {...register("preview", { required: true })}
                  />
                  {errors.preview?.type === "required" && (
                    <span className="text-danger">Esse campo é obrigatório</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="description" sx={{ color: "black" }}>
                    Descrição
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    multiline
                    rows={4}
                    autoComplete="description"
                    variant="outlined"
                    margin="normal"
                    sx={{ backgroundColor: "white" }}
                    inputProps={{ maxLength: 1000 }}
                    {...register("description", { required: true })}
                  />
                  {errors.description?.type === "required" && (
                    <span className="text-danger">Esse campo é obrigatório</span>
                  )}
                </Grid>
                {/* <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <InputFileUpload />
            </Grid> */}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
