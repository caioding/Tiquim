"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

export default function CreateContribution() {
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [campaignTitle, setCampaignTitle] = useState("");

  useEffect(() => {
    const fetchCampaignTitle = async () => {
      if (!campaignId) return; // Não faz a chamada se campaignId não estiver definido

      try {
        const response = await fetch(`/api/campaign/${campaignId}`);
        const data = await response.json();
        setCampaignTitle(data.title);
      } catch (error) {
        console.error("Error fetching campaign title:", error);
      }
    };

    fetchCampaignTitle();
  }, [campaignId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const contributionData = { amount, userId, campaignId, paymentMethodId };

    try {
      const response = await fetch("/api/contribution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contributionData),
      });

      if (response.ok) {
        console.log("Contribution created successfully");
      } else {
        console.error("Failed to create contribution");
      }
    } catch (error) {
      console.error("Error creating contribution:", error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Tela Contribuição {campaignTitle}
            </Typography>
          </Grid>
        </Grid>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="amount" sx={{ color: "black" }}>
                Valor
              </InputLabel>
              <TextField
                required
                fullWidth
                id="amount"
                name="amount"
                autoComplete="amount"
                autoFocus
                variant="outlined"
                margin="normal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputProps={{ maxLength: 50 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="paymentMethodId" sx={{ color: "black" }}>
                Forma de Pagamento
              </InputLabel>
              <TextField
                required
                fullWidth
                id="paymentMethodId"
                name="paymentMethodId"
                autoComplete="paymentMethodId"
                variant="outlined"
                margin="normal"
                value={paymentMethodId}
                onChange={(e) => setPaymentMethodId(e.target.value)}
                inputProps={{ maxLength: 50 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="userId" sx={{ color: "black" }}>
                ID do Usuário
              </InputLabel>
              <TextField
                required
                fullWidth
                id="userId"
                name="userId"
                autoComplete="userId"
                variant="outlined"
                margin="normal"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="campaignId" sx={{ color: "black" }}>
                ID da Campanha
              </InputLabel>
              <TextField
                required
                fullWidth
                id="campaignId"
                name="campaignId"
                autoComplete="campaignId"
                variant="outlined"
                margin="normal"
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                textTransform: "none",
                backgroundColor: "#32a852",
                color: "white",
                "&:hover": { backgroundColor: "#008000" },
              }}
              onClick={handleSubmit}
            >
              Contribuir
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
