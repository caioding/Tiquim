"use client";
import React from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { CampaignsHeader } from "./components/CampaignsHeader";
import { Box, Container, Typography } from "@mui/material";
import { CampaignCard } from "./components/CampaignCard";
import { useCampaigns } from "./hooks/useCampaigns";

export default function Campanhas() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { campaigns, isPending, isError } = useCampaigns(searchQuery);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1,
        }}
      >
        <CampaignsHeader />
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: 1,
            borderColor: "rgba(150, 150, 150, 1)",
            borderRadius: 3,
          }}
        >
          <SearchIcon sx={{ padding: 0.5, color: "rgba(150, 150, 150, 1)" }} />
          <InputBase
            placeholder="Pesquisar…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              color: "inherit",
              paddingLeft: 1,
              "& .MuiInputBase-input": {
                padding: 1,
                width: "100%",
              },
            }}
          />
        </Box>
      </Box>

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
