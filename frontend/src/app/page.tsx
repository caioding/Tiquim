"use client";
import React from "react";
import { ListagemHeader } from "./components/ListagemHeader";
import { Box, Container } from "@mui/material";
import { CampaignCard } from "./components/CampaignCard";
import campaigns from "./mocks/campaigns";

export default function Campanhas() {
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
