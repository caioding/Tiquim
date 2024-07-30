import { Box, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

interface CardHearderProps {
  title: string;
  author: string;
  createdAt: string;
  completedPercentage: number;
}

export function CardHeader({ title, author, createdAt, completedPercentage }: CardHearderProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box sx={{ width: "calc(100% - 60px)" }}>
        <Tooltip title={title} placement="top" arrow>
          <Typography
            variant="body1"
            component={"h1"}
            sx={{
              fontWeight: "bold",
              fontSize: "17px",
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {title}
          </Typography>
        </Tooltip>

        <Typography variant="caption" color="text.secondary" component="h2" sx={{ mb: 1.5 }}>
          {author} • Criado em {createdAt.toString()}
        </Typography>
      </Box>

      <Box
        sx={{
          mb: 1.5,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          minWidth: 60,
        }}
      >
        <PieChart
          series={[
            {
              data: [
                { value: completedPercentage, color: "green" },
                { value: 100 - completedPercentage, color: "#D1FFBD" },
              ],
              innerRadius: 18,
              outerRadius: 25,
              cx: 20,
            },
          ]}
          width={50}
          height={50}
        />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: "52%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        >
          {Math.floor(completedPercentage)}%
        </Typography>
      </Box>
    </Stack>
  );
}
