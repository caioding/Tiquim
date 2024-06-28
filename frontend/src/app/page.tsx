"use client";
import React from "react";
import { ListagemHeader } from "./components/ListagemHeader";
import { Box, Container } from "@mui/material";
import { CampanhaCard } from "./components/CampanhaCard";
import campanhas from "./mocks/campanhas";

export default function Campanhas() {
  return (
    <Container>
      <ListagemHeader />
      <Box
        height="auto"
        width="100%"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
        my={4}
        gap={4}
        p={2}
      >
        {campanhas.map((campanha) => (
          <CampanhaCard key={campanha.id} campanha={campanha} />
        ))}
      </Box>
    </Container>
  );
}
