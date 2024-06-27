import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

interface CardHearderProps {
  title: string;
  author: string;
  createdAt: string;
  completedPercentage: number;
}

export function CardHearder({ title, author, createdAt, completedPercentage }: CardHearderProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <span>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>

        <Typography variant="caption" color="text.secondary" component="h2" sx={{ mb: 1.5 }}>
          {author} • {createdAt}
        </Typography>
      </span>

      <Box
        sx={{
          mb: 1.5,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          minWidth: 100,
        }}
      >
        <PieChart
          series={[
            {
              data: [
                { value: completedPercentage, color: "orange" },
                { value: 100 - completedPercentage, color: "green" },
              ],
              innerRadius: 18,
              outerRadius: 25,
              cx: 40,
            },
          ]}
          width={50}
          height={50}
        />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: "50%",
            left: "70%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        >
          {completedPercentage}%
        </Typography>
      </Box>
    </Stack>
  );
}
