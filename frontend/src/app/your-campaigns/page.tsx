"use client";
import React, { useState } from "react";
import { Box, Container, Fab, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { YourCampaignsHeader } from "../components/YourCampaignsHeader";
import { useYourCampaigns } from "../hooks/useYourCampaigns";
import AddIcon from "@mui/icons-material/Add";
import { YourCampaignCard } from "../components/YourCampaignCard";
import useAuthContext from "../hooks/useAuthContext";
import CreateCampaignModal from "../components/create-campaign";
import EditCampaignModal from "../components/edit-campaign";
import { Campaign } from "../types/campaign";

export default function YourCampaigns() {
  const { id } = useAuthContext();

  const [searchQuery, setSearchQuery] = React.useState("");
  const { campaigns, isPending, isError } = useYourCampaigns(searchQuery);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [campaign, setCampaign] = useState({} as Campaign);

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
        <YourCampaignCard key={campaign.id} campaign={campaign} handleOpen={handleOpenEdit} />
      ));
    }
  };

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const handleOpenEdit = (campaign: Campaign) => {
    setCampaign(campaign);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

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
            autoFocus
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
        onClick={handleOpenCreate}
        sx={{
          position: "fixed",
          bottom: 50,
          right: 80,
        }}
      >
        <AddIcon />
      </Fab>
      <CreateCampaignModal open={openCreate} handleClose={handleCloseCreate} />
      <EditCampaignModal campaign={campaign} open={openEdit} handleClose={handleCloseEdit} />
    </Container>
  );
}
