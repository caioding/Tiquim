"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHearder } from "./CardHeader";

export function CampanhaCard() {
  const campanha = {
    title: "Heading",
    author: "John Doe",
    createdAt: "4 Feb 2022",
    logoUrl: "./lagarto.png",
    completedPercentage: 40,
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
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
