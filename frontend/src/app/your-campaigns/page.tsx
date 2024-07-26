"use client";
import React from "react";
import { Box, Container, Fab, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { YourCampaignsHeader } from "../components/YourCampaignsHeader";
import { useYourCampaigns } from "../hooks/useYourCampaigns";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { YourCampaignCard } from "../components/YourCampaignCard";
import useAuthContext from "../hooks/useAuthContext";

export default function YourCampaigns() {
  const router = useRouter();
  const { id } = useAuthContext();

  const [searchQuery, setSearchQuery] = React.useState("");
  const { campaigns, isPending, isError } = useYourCampaigns(searchQuery);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (id === "") {
    return (
      <Container sx={{ width: "80%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", m: 5 }}>
          Realize o login para visualizar suas campanhas.
        </Typography>
      </Container>
    );
  }
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
          Ocorreu um erro ao carregar as campanhas.
        </Typography>
      </Container>
    );
  }

  const loadCampaigns = () => {
    if (campaigns?.length == 0) {
      return (
        <Container sx={{ width: "80%" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", m: 5 }}>
            Nenhuma campanha encontrada!
          </Typography>
        </Container>
      );
    } else {
      return campaigns?.map((campaign) => (
        <YourCampaignCard key={campaign.id} campaign={campaign} />
      ));
    }
  };


  const handleAddCampaign = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    router.push("/create-campaign"); // Navega para a página de criação de campanhas
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1,
        }}
      >
        <YourCampaignsHeader />
        <Box
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: 1,
            borderColor: "rgba(150, 150, 150, 1)",
            borderRadius: 3,
            mt: { xs: 4 },
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
        sx={{ p: { xs: 0, sm: 2 } }}
      >
        {loadCampaigns()}
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
