"use client";
import React from "react";
import { Box, Container, Fab, Typography } from "@mui/material";
import { CampaignCard } from "../components/CampaignCard";
import { YourCampaignsHeader } from "../components/YourCampaignsHeader";
import { useYourCampaigns } from "../hooks/useYourCampaigns";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

export default function Campanhas() {
  const { campaigns, isPending, isError } = useYourCampaigns();
  const router = useRouter();

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
          Você ainda não criou campanhas.
        </Typography>
      );
    } else {
      return campaigns?.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />);
    }
  };

  const handleAddCampaign = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    router.push("/create-campaigns"); // Navega para a página de criação de campanhas
  };

  return (
    <Container>
      <YourCampaignsHeader />
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
      <Fab
        color="success"
        aria-label="add"
        onClick={handleAddCampaign}
        sx={{
          position: "fixed",
          bottom: 50,
          right: 80,
        }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}
