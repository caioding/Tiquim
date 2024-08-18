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
import { Card, CardContent, Tooltip } from "@mui/material";
import { useYourCampaigns } from "../hooks/useYourCampaigns";
import { useQueryClient } from "@tanstack/react-query";
import { getCampaignDetails } from "../services/campaign";
import { useContributions, useContributionsByCampaign } from "../hooks/useUserContributions";

export default function YourProfile() {
  const { id } = useAuthContext();
  const queryClient = useQueryClient();
  const { campaigns, isPending, isError } = useYourCampaigns("");
  const { contributions } = useContributions();
  const {
    yourContributions,
    isPending: isPendingContribution,
    isError: isErrorContribution,
  } = useContributionsByCampaign(contributions ?? []);
  {
    /*
  mapear o vetor contributions de forma unica por id da campanha, para nao repetir campanha
  depois disso pegar todas as campanhas pelo seu id 
  e colocaals em um vetor
  e depois colocalas em um card
   */
  }

  const showYourCampaigns = () => {
    if (isPending) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Carregando...
        </Typography>
      );
    } else if (id === "") {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Realize o login para visualizar suas campanhas.
        </Typography>
      );
    } else if (isErrorContribution) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Ocorreu um erro ao carregar suas campanhas.
        </Typography>
      );
    } else if (campaigns?.length === 0) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Você ainda não criou nenhuma campanha.
        </Typography>
      );
    } else {
      return campaigns?.map((campaign) => (
        <Grid item xs={12} sm={4} key={campaign.id}>
          <Card sx={{ p: 2, borderRadius: 2 }}>
            <CardContent>
              <Grid container alignItems="center">
                <Grid item sx={{ width: "20%" }}>
                  <Avatar
                    alt={campaign.title}
                    src={campaign.imageUrl}
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid>
                <Grid item sx={{ width: "80%", minWidth: 0 }}>
                  <Tooltip title={campaign.title}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        ml: 1,
                      }}
                    >
                      {campaign.title}
                    </Typography>
                  </Tooltip>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ));
    }
  };

  const showCampaignsYouHelped = () => {
    if (isPendingContribution) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Carregando...
        </Typography>
      );
    } else if (id === "") {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Realize o login para visualizar suas contribuições.
        </Typography>
      );
    } else if (isError) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Ocorreu um erro ao carregar suas campanhas.
        </Typography>
      );
    } else if (campaigns?.length === 0) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Você ainda não ajudou nenhuma campanha.
        </Typography>
      );
    } else {
      return yourContributions?.map((campaign) => (
        <Grid item xs={12} sm={4} key={campaign.id}>
          <Card sx={{ p: 2, borderRadius: 2 }}>
            <CardContent>
              <Grid container alignItems="center">
                <Grid item sx={{ width: "20%" }}>
                  <Avatar
                    alt={campaign.title}
                    src={campaign.imageUrl}
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid>
                <Grid item sx={{ width: "80%", minWidth: 0 }}>
                  <Tooltip title={campaign.title}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        ml: 1,
                      }}
                    >
                      {campaign.title}
                    </Typography>
                  </Tooltip>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", mt: 5, mb: 5 }}>
      {/* Foto do Usuário */}
      <Avatar
        alt="Helena Maria"
        src="url-da-imagem"
        sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
      />

      {/* Nome do Usuário */}
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 10 }}>
        Helena Maria
      </Typography>

      {/* Campanhas */}
      <Box sx={{ mt: 15, textAlign: "left" }}>
        <Typography variant="h6" fontSize="25px" fontWeight="bold">
          Suas Campanhas
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {showYourCampaigns()}
        </Grid>
      </Box>

      {/* Campanhas que esse perfil apoiou */}
      <Box sx={{ mt: 10, textAlign: "left" }}>
        <Typography variant="h6" fontSize="25px" fontWeight="bold">
          Campanhas que você apoiou
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {showCampaignsYouHelped()}
        </Grid>
      </Box>
    </Container>
  );
}
