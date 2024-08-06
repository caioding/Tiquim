"use client";
import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { useCampaigns } from "./hooks/useCampaigns";
import { RecentCampaignsHeader } from "./components/RecentCampaignsHeader";
import { PopularCampaignsHeader } from "./components/PopularCampaignsHeader";
import { CampaignCarousel } from "./components/CampaignCarousel";
import { Campaign } from "./types/campaign";
import { useCampaignsSupporters } from "./hooks/useCampaignsSupporters";

export default function Campaigns() {
  const { campaigns, isPending: campaignsPending, isError: campaignsError } = useCampaigns("");
  const {
    supporters,
    isPending: supportersPending,
    isError: supportersError,
  } = useCampaignsSupporters();

  const isSmallScreen = useMediaQuery("(max-width:790px)");
  const isMediumScreen = useMediaQuery("(max-width:1155px)");

  let cardsPerSlide = 1;
  if (isSmallScreen) {
    cardsPerSlide = 1;
  } else if (isMediumScreen) {
    cardsPerSlide = 2;
  } else {
    cardsPerSlide = 3;
  }

  const showRecentCampaigns = () => {
    if (campaignsPending) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Carregando...
        </Typography>
      );
    } else if (campaignsError) {
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
    } else if (campaigns) {
      const groupedNewCampaigns: Array<Campaign[]> = [];
      const newCampaigns = campaigns.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      for (let i = 0; i < Math.min(newCampaigns.length, 12); i += cardsPerSlide) {
        groupedNewCampaigns.push(newCampaigns.slice(i, i + cardsPerSlide));
      }
      return (
        <CampaignCarousel groupedCampaigns={groupedNewCampaigns} cardsPerSlide={cardsPerSlide} />
      );
    }
  };

  const showPopularCampaigns = () => {
    if (supportersPending) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Carregando...
        </Typography>
      );
    } else if (supportersError) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Ocorreu um erro ao carregar as campanhas.
        </Typography>
      );
    } else if (supporters?.length === 0) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Não há campanhas disponíveis no momento.
        </Typography>
      );
    } else if (supporters && campaigns) {
      const supportersCountMap = new Map(supporters.map((item) => [item.campaignId, item.count]));

      const groupedNewCampaigns: Array<Campaign[]> = [];
      const newCampaigns = campaigns.sort((a, b) => {
        const countA = supportersCountMap.get(a.id) || 0;
        const countB = supportersCountMap.get(b.id) || 0;
        return countB - countA;
      });
      for (let i = 0; i < Math.min(newCampaigns.length, 12); i += cardsPerSlide) {
        groupedNewCampaigns.push(newCampaigns.slice(i, i + cardsPerSlide));
      }
      return (
        <CampaignCarousel groupedCampaigns={groupedNewCampaigns} cardsPerSlide={cardsPerSlide} />
      );
    }
  };

  return (
    <Container>
      <PopularCampaignsHeader />
      {showPopularCampaigns()}
      <Box sx={{ mt: 10 }} />
      <RecentCampaignsHeader />
      {showRecentCampaigns()}
      <Box sx={{ mb: 10 }} />
    </Container>
  );
}
