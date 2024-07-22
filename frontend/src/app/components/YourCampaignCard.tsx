"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardHearder } from "./CardHeader";
import { Campaign } from "../types/campaign";
import { useRouter } from "next/navigation";
import contributions from "../mocks/contribution";
import { useUser } from "../hooks/useUser";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

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

export function YourCampaignCard({ campaign }: CampaignCardProps) {
  const router = useRouter();

  const createdAt = new Date(campaign.createdAt);

  const datetime: string = createdAt.toLocaleString("pt-BR", TIME_FORMAT);

  const { user, isPending, isError } = useUser(campaign.userId);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user information</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const listOfContributions =
    contributions.filter((element) => element.campaignId == campaign.id) ?? 0;

  const totalContributions = listOfContributions.reduce(
    (sum, contribution) => sum + contribution.amount,
    0,
  );

  const completedPercentage = (totalContributions / campaign.goal) * 100;

  const imageUrl =
    campaign?.imageUrl && campaign.imageUrl.length > 0 ? campaign.imageUrl : "/placeholder.png";

  const openCampaignDetails = (idCampaign: string) => {
    router.push(`/your-campaign/${idCampaign}`);
  };

  const handleEdit = (e: React.SyntheticEvent) => {
    // TODO: ir para a página editar campanha
    e.stopPropagation();
    router.push(`/edit-campaign/${campaign.id}`);
  };

  const handleDelete = (e: React.SyntheticEvent) => {
    // TODO: excluir campanha
    e.stopPropagation();
  };

  return (
    <Card
      sx={{
        width: 345,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onClick={() => openCampaignDetails(campaign.id)}
    >
      <CardMedia component="img" alt={campaign.title} height="140" image={imageUrl} />
      <CardContent sx={{ flexGrow: 1, mx: 1.5, overflow: "hidden" }}>
        <CardHearder
          title={campaign.title}
          author={user.name}
          createdAt={datetime}
          completedPercentage={completedPercentage}
        />
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "14px" }}>
          {campaign.preview}
        </Typography>
      </CardContent>
      <CardActions sx={{ m: 2, mb: 2, display: "flex", justifyContent: "end" }}>
        <IconButton aria-label="edit" color="success" onClick={handleEdit}>
          <EditIcon />
        </IconButton>

        <IconButton aria-label="delete" color="success" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
