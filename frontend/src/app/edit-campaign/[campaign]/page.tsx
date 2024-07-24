"use client";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Grouped from "../../components/CategoriesInput";
import FormattedInputs from "../../components/NumberFormat";
import InputFileUpload from "../../components/FileUpload";
import useCampaignOwner from "@/app/hooks/useCampaignOwner";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function EditCampaign() {
  const params = useParams();

  const idCampaign = params.campaign as string;

  const { isPending, isError, isOwner, campaign } = useCampaignOwner(idCampaign);

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

  const [campaignInfo, setCampaignInfo] = useState(campaign);

  const handleSubmit = async () => {};

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
          backgroundColor: "#f8fafa",
          border: "20px solid #f8fafa",
        }}
      >
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
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor="title" sx={{ color: "black" }}>
                Título
              </InputLabel>
              <TextField
                required
                fullWidth
                id="title"
                name="title"
                autoComplete="title"
                autoFocus
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 50 }}
                value={campaignInfo.title}
                onChange={(e) => setCampaignInfo({ ...campaignInfo, title: e.target.value })}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="goal" sx={{ color: "black" }}>
                Meta
              </InputLabel>
              <FormattedInputs></FormattedInputs>
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="category" sx={{ color: "black" }}>
                Categorias
              </InputLabel>
              <Grouped></Grouped>
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="deadline" sx={{ color: "black" }}>
                Prazo
              </InputLabel>
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
            </Grid> */}
            <Grid item xs={12}>
              <InputLabel htmlFor="ImageURL" sx={{ color: "black" }}>
                ImageURL
              </InputLabel>
              <TextField
                required
                fullWidth
                id="ImageURL"
                name="ImageURL"
                autoComplete="ImageURL"
                variant="outlined"
                margin="normal"
                value={campaignInfo.imageUrl}
                onChange={(e) => setCampaignInfo({ ...campaignInfo, imageUrl: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="preview" sx={{ color: "black" }}>
                Preview
              </InputLabel>
              <TextField
                required
                fullWidth
                id="preview"
                name="preview"
                autoComplete="preview"
                autoFocus
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 120 }}
                value={campaignInfo.preview}
                onChange={(e) => setCampaignInfo({ ...campaignInfo, preview: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="description" sx={{ color: "black" }}>
                Descrição
              </InputLabel>
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
                inputProps={{ maxLength: 1000 }}
                value={campaignInfo.description}
                onChange={(e) => setCampaignInfo({ ...campaignInfo, description: e.target.value })}
              />
            </Grid>

            {/* <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <InputFileUpload />
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
