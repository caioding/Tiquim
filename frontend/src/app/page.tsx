"use client";
import React from "react";
import { ListagemHeader } from "./components/ListagemHeader";
import { Box, Container, Typography } from "@mui/material";
import { CampaignCard } from "./components/CampaignCard";
import { useCampaigns } from "./hooks/useCampaigns";

export default function Campanhas() {
  const { campaigns, isPending, isError } = useCampaigns();

  const showCampaigns = () => {
    if (isPending) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Carregando...
        </Typography>
      );
    } else if (isError) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Ocorreu um erro ao carregar as campanhas.
        </Typography>
      );
    } else if (campaigns?.length == 0) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Não há campanhas disponíveis no momento.
        </Typography>
      );
    } else {
      return campaigns?.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />);
    }
  };

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
        {showCampaigns()}
      </Box>
    </Container>
  );
}
