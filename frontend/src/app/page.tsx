"use client";
import React from "react";
import { ListagemHeader } from "./components/ListagemHeader";
import { Box, Container, Typography } from "@mui/material";
import { CampaignCard } from "./components/CampaignCard";
import { useCampaigns } from "./hooks/useCampaigns";

export default function Campanhas() {
  const { campaigns, isPending, isError } = useCampaigns();

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
          Ocorreu um erro ao carregar os produtos.
        </Typography>
      </Container>
    );
  }

  if (!campaigns) {
    return (
      <Container sx={{ width: "80%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", m: 5 }}>
          Não há campanhas disponíveis no momento.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <ListagemHeader />
      <Box
        height="auto"
        width="100%"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
        my={4}
        gap={4}
        p={2}
      >
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </Box>
    </Container>
  );
}
