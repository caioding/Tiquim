"use client";
import React, { useEffect, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import { Box, Container, Fab, IconButton, Menu, MenuItem, Typography } from "@mui/material";
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
import { useQueryClient } from "@tanstack/react-query";

export default function YourCampaigns() {
  const { id } = useAuthContext();

  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const { campaigns, isPending, isError } = useYourCampaigns(searchQuery);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [campaign, setCampaign] = useState({} as Campaign);
  const [filteredCampaigns, setFilteredCampaign] = useState(campaigns);
  const [sortBy, setSortBy] = useState<"title" | "date">("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    filterAndSortData(sortBy, sortDirection);
  }, [searchQuery, sortBy, sortDirection, campaigns]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortDirection] = value.split(":");
    setSortBy(newSortBy as "title" | "date");
    setSortDirection(newSortDirection as "asc" | "desc");
    filterAndSortData(newSortBy as "title" | "date", newSortDirection as "asc" | "desc");
    setAnchorEl(null);
  };

  const filterAndSortData = (sortBy: "title" | "date", direction: "asc" | "desc") => {
    if (campaigns) {
      const filtered = campaigns.sort((a, b) => {
        let comparison = 0;
        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === "date") {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          comparison = dateA.getTime() - dateB.getTime();
        }
        return direction === "asc" ? comparison : -comparison;
      });
      setFilteredCampaign(filtered);
    }
  };

  const showCampaigns = () => {
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
    } else if (isError) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Ocorreu um erro ao carregar as campanhas.
        </Typography>
      );
    } else if (campaigns?.length === 0) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Não há campanhas disponíveis no momento.
        </Typography>
      );
    } else {
      return filteredCampaigns?.map((campaign) => (
        <YourCampaignCard key={campaign.id} campaign={campaign} handleOpen={handleOpenEdit} />
      ));
    }
  };
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => {
    setOpenCreate(false);
    queryClient.invalidateQueries({ queryKey: ["yourCampaigns"] });
  };

  const handleOpenEdit = (campaign: Campaign) => {
    setCampaign(campaign);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    queryClient.invalidateQueries({ queryKey: ["yourCampaigns"] });
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
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0)",
              border: 1,
              borderColor: "rgba(150, 150, 150, 1)",
              borderRadius: 3,
              marginRight: 2,
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
                },
              }}
            />
          </Box>

          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} sx={{ height: "100%" }}>
            <SortIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => handleSortChange("title:asc")}>Nome (A-Z)</MenuItem>
            <MenuItem onClick={() => handleSortChange("title:desc")}>Nome (Z-A)</MenuItem>
            <MenuItem onClick={() => handleSortChange("date:asc")}>Data (Mais antigo)</MenuItem>
            <MenuItem onClick={() => handleSortChange("date:desc")}>Data (Mais recente)</MenuItem>
          </Menu>
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
        {showCampaigns()}
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
