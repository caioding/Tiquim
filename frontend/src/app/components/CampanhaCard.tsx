"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHearder } from "./CardHeader";
import { Campanha } from "../types/campanha";

interface CampanhaCardProps {
  campanha: Campanha;
}

export function CampanhaCard({ campanha }: CampanhaCardProps) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia component="img" alt={campanha.title} height="140" image={campanha.logoUrl} />
      <CardContent sx={{ m: 1.5 }}>
        <CardHearder
          title={campanha.title}
          author={campanha.author}
          createdAt={campanha.createdAt}
          completedPercentage={campanha.completedPercentage}
        />
        <Typography variant="body2" color="text.secondary">
          {campanha.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ m: 1.5, mb: 3.5 }}>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "#32a852",
            textTransform: "none",
            "&:hover": { backgroundColor: "#008000" },
          }}
        >
          Doar
        </Button>
      </CardActions>
    </Card>
  );
}
