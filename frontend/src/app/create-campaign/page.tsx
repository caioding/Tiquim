"use client";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Grouped from "../components/CategoriesInput";
import FormattedInputs from "../components/NumberFormat";
import InputFileUpload from "../components/FileUpload";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Campaign } from "../types/campaign";
import useSnackbar from "../hooks/useSnackbar";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function CreateCampaign() {
  const router = useRouter();
  const [campaignInfo, setCampaignInfo] = useState<Omit<Campaign , 'id'>>({
    goal: 0,
    deadline: new Date(),
    title: "",
    description: "",
    preview: "",
    category: "",
    imageUrl: "",
    userId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Campaign>();

  const { setSnackbar } = useSnackbar();

  const handleFormSubmit = async () => {
    const formattedData = {
      ...campaignInfo,
      createdAt: campaignInfo.createdAt.toISOString(),
      updatedAt: campaignInfo.updatedAt.toISOString(),
      deadline: campaignInfo.deadline.toISOString(),
    };

    
    try {
      const response = await fetch("http://localhost:9000/v1/campaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(formattedData),
        credentials: "include"
      });

      if(!response.ok) {
        setSnackbar("Erro ao criar a campanha", "error");
        throw new Error(`Error on handle submit creating campaign: ${response.statusText}`)
      } 
      
      const data = await response.json();

      setSnackbar("Campanha criada com sucesso!");
      router.push("/");
    } catch (error) {
      setSnackbar("Erro ao efetuar o login");
    }

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
                    value={campaignInfo?.title}
                    onChange={(e) => setCampaignInfo({ ...campaignInfo, title: e.target.value })}
                  />
                  {errors.title?.type === "required" && (
                    <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="goal" sx={{ color: "black" }}>
                    Meta
                  </InputLabel>
                  <FormattedInputs
                    campaignInfo={campaignInfo}
                    setCampaignInfo={setCampaignInfo}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="category" sx={{ color: "black" }}>
                    Categorias
                  </InputLabel>
                  <Grouped
                    campaignInfo={campaignInfo}
                    setCampaignInfo={setCampaignInfo}
                    register={register}
                    handleSubmit={handleSubmit} //n eh necessario
                    errors={errors}
                  />
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
                    value={formatDate(campaignInfo.deadline)}
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) =>
                      setCampaignInfo({ ...campaignInfo, deadline: new Date(e.target.value) })
                    }
                  />
                  {errors.deadline?.type === "required" && (
                    <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
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
                    value={campaignInfo.imageUrl}
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => setCampaignInfo({ ...campaignInfo, imageUrl: e.target.value })}
                  />
                  {errors.imageUrl?.type === "required" && (
                    <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
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
                    value={campaignInfo.preview}
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => setCampaignInfo({ ...campaignInfo, preview: e.target.value })}
                  />
                  {errors.preview?.type === "required" && (
                    <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
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
                    value={campaignInfo.description}
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) =>
                      setCampaignInfo({ ...campaignInfo, description: e.target.value })
                    }
                  />
                  {errors.description?.type === "required" && (
                    <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
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