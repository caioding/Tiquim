"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Campaign } from "../types/campaign";
import { useRouter } from "next/navigation";
import contributions from "../mocks/contribution";
import { useUser } from "../hooks/useUser";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import useSnackbar from "../hooks/useSnackbar";
import { deleteCampaign } from "../services/campaign";
import { CardHeader } from "./CardHeader";
import { useQueryClient } from "@tanstack/react-query";

interface CampaignCardProps {
  campaign: Campaign;
  handleOpen: (campaign: Campaign) => void;
}

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "America/Manaus",
  hour12: false,
};

export function YourCampaignCard({ campaign, handleOpen }: CampaignCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createdAt = new Date(campaign.createdAt);

  const datetime: string = createdAt.toLocaleString("pt-BR", TIME_FORMAT);

  const { user, isPending, isError } = useUser(campaign.userId);

  const { setSnackbar } = useSnackbar();

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
    e.stopPropagation();
    handleOpen(campaign);
  };

  const handleDelete = async (e: React.SyntheticEvent, idCampaign: string) => {
    // TODO: excluir campanha
    e.stopPropagation();
    const confirmDelete = window.confirm("Tem certeza que deseja deletar essa camanha?");
    if (confirmDelete) {
      const success = await deleteCampaign(idCampaign);
      if (success) {
        setSnackbar("Campanha deletada com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["yourCampaigns"] });
      } else {
        setSnackbar("Erro ao deletar campanha", "error");
      }
    }
  };

  return (
    <Card
      sx={{
        width: 345,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        m: { xs: "auto", sm: 0 },
      }}
      onClick={() => openCampaignDetails(campaign.id)}
    >
      <CardMedia component="img" alt={campaign.title} height="140" image={imageUrl} />
      <CardContent sx={{ flexGrow: 1, mx: 1.5, overflow: "hidden" }}>
        <CardHeader
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

        <IconButton
          aria-label="delete"
          color="success"
          onClick={(e) => handleDelete(e, campaign.id)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
