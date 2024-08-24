"use client";
import React from "react";
import { InputBase, Box, Container, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import { CampaignsHeader } from "../components/CampaignsHeader";
import { CampaignCard } from "../components/CampaignCard";
import { useCampaigns } from "../hooks/useCampaigns";
import { useCampaignsSupporters } from "../hooks/useCampaignsSupporters";

export default function AllCampaigns() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { campaigns, isPending, isError } = useCampaigns(searchQuery);
  const {
    supporters,
    isPending: supportersPending,
    isError: supportersError,
  } = useCampaignsSupporters();
  const [filteredCampaigns, setFilteredCampaign] = React.useState(campaigns);
  const [sortBy, setSortBy] = React.useState<"title" | "date">("title");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  React.useEffect(() => {
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
        } else if (sortBy === "popular") {
          const supportersMap = new Map(supporters?.map((item) => [item.campaignId, item.count]));
          const countA = supportersMap?.get(a.id) || 0;
          const countB = supportersMap?.get(b.id) || 0;
          return countB - countA;
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
        <CampaignCard key={campaign.id} campaign={campaign} />
      ));
    }
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
        <CampaignsHeader />
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
            <MenuItem onClick={() => handleSortChange("popular:asc")}>Mais populares</MenuItem>
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
    </Container>
  );
}

//oi
