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
import useCampaignOwner from "@/app/hooks/useCampaignOwner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Campaign } from "@/app/types/campaign";

export default function EditCampaign() {
  const params = useParams();

  const idCampaign = params.campaign as string;

  const { isPending, isError, isOwner, campaign } = useCampaignOwner(idCampaign);

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

  useEffect(() => {
    if (campaign) {
      setCampaignInfo(campaign);
    }
  }, [campaign]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Campaign>();

  const handleFormSubmit = (data: Campaign) => {
    console.log(data);
  };

  if (isPending) {
    return (
      <Container sx={{ width: "80%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", m: 5 }}>
          Carregando...
        </Typography>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ width: "80%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", m: 5 }}>
          Ocorreu um erro ao carregar as informações da campanha ou a campanha não existe.
        </Typography>
      </Container>
    );
  }

  if (!campaign) {
    return (
      <Container sx={{ width: "80%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", m: 5 }}>
          Não há detalhes disponíveis para esta campanha no momento.
        </Typography>
      </Container>
    );
  }

  if (!isOwner) {
    return (
      <Container sx={{ width: "80%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", m: 5 }}>
          Você não tem permissão para acessar essa página.
        </Typography>
      </Container>
    );
  }

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
                  Editar Campanha
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
                    <span className="text-danger">Esse campo é obrigatório</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="imageUrl" sx={{ color: "black" }}>
                    ImageURL
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="imageUrl"
                    variant="outlined"
                    margin="normal"
                    sx={{ backgroundColor: "white" }}
                    {...register("imageUrl", { required: true })}
                    value={campaignInfo.imageUrl}
                    onChange={(e) => setCampaignInfo({ ...campaignInfo, imageUrl: e.target.value })}
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
                    variant="outlined"
                    margin="normal"
                    sx={{ backgroundColor: "white" }}
                    inputProps={{ maxLength: 120 }}
                    {...register("preview", { required: true })}
                    value={campaignInfo.preview}
                    onChange={(e) => setCampaignInfo({ ...campaignInfo, preview: e.target.value })}
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
                    value={campaignInfo.description}
                    onChange={(e) =>
                      setCampaignInfo({ ...campaignInfo, description: e.target.value })
                    }
                  />
                  {errors.description?.type === "required" && (
                    <span className="text-danger">Esse campo é obrigatório</span>
                  )}
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
