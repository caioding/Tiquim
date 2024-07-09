"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHearder } from "./CardHeader";
import { Campaign } from "../types/campaign";
import { useRouter } from "next/navigation";

interface CampaignCardProps {
  campaign: Campaign;
}

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "America/Manaus",
  hour12: false,
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const router = useRouter();

  const datetime: string = campaign.createdAt.toLocaleString("pt-BR", TIME_FORMAT);

  const openCampaignDetails = (idCampaign: string) => {
    router.push(`/campaign/${idCampaign}`);
  };

  const handleDonateToCampaign = (e: React.SyntheticEvent) => {
    // TODO: ir para a página de doação
    e.stopPropagation();
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onClick={() => openCampaignDetails(campaign.id)}
    >
      <CardMedia component="img" alt={campaign.title} height="140" image={campaign.imageUrl} />
      <CardContent sx={{ mx: 1.5, overflow: "hidden" }}>
        <CardHearder
          title={campaign.title}
          author={campaign.author}
          createdAt={datetime}
          completedPercentage={campaign.completedPercentage}
        />
        <Typography variant="body2" color="text.secondary">
          {campaign.preview}
        </Typography>
      </CardContent>
      <CardActions sx={{ m: 2, mb: 3.5 }}>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "#32a852",
            textTransform: "none",
            "&:hover": { backgroundColor: "#008000" },
          }}
          onClick={handleDonateToCampaign}
        >
          Doar
        </Button>
      </CardActions>
    </Card>
  );
}
