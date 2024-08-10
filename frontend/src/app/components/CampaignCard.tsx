"use client";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader } from "./CardHeader";
import { Campaign } from "../types/campaign";
import { useRouter } from "next/navigation";
import { useUser } from "../hooks/useUser";
import { useCampaignPercentage } from "../hooks/useCampaignPercentage";
import { getImageCampaign } from "../services/campaign";
import { formatDate } from "../utils/datetime";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const router = useRouter();

  const datetime = formatDate(campaign.createdAt);

  const { user, isPending: userPending, isError: userError } = useUser(campaign.userId);

  const [imageUrl, setImageUrl] = useState<string>("/placeholder.png");

  useEffect(() => {
    const fetchImage = async () => {
      if (campaign?.imageUrl && campaign.imageUrl.length > 0) {
        const image = await getImageCampaign(campaign.imageUrl);
        setImageUrl(image);
      }
    };
    fetchImage();
  }, [campaign]);

  const {
    percentage,
    isPending: percentagePending,
    isError: percentageError,
  } = useCampaignPercentage(campaign.id);

  if (userPending || percentagePending) {
    return <div>Loading...</div>;
  }

  if (userError || percentageError) {
    return <div>Error loading data</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  let completedPercentage = 0;

  if (percentage) {
    const percentageValue = typeof percentage === "number" ? percentage : Number(percentage);
    completedPercentage = Math.min(percentageValue * 100, 100);
  }

  const openCampaignDetails = (idCampaign: string) => {
    router.push(`/campaign/${idCampaign}`);
  };

  const handleDonateToCampaign = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    router.push(`/contribution`);
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
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "14px", mt: 1 }}>
          {campaign.preview}
        </Typography>
      </CardContent>
      <CardActions sx={{ mb: 3, mx: 2 }}>
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
