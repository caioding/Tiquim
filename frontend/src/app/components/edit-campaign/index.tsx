"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CssBaseline,
  Grid,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Campaign, UpdateCampaignDto } from "@/app/types/campaign";
import { updateCampaign } from "@/app/services/campaign";
import useSnackbar from "@/app/hooks/useSnackbar";
import { useQueryClient } from "@tanstack/react-query";

interface EditCampaignProps {
  open: boolean;
  handleClose: () => void;
  campaign: Campaign;
}

const initialState = {
  title: "",
  preview: "",
  description: "",
  imageUrl: "",
};

export default function EditCampaignModal({ campaign, open, handleClose }: EditCampaignProps) {
  const queryClient = useQueryClient();

  const [campaignInfo, setCampaignInfo] = useState<UpdateCampaignDto>(initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Campaign>();

  const { setSnackbar } = useSnackbar();

  useEffect(() => {
    if (campaign) {
      setCampaignInfo({
        title: campaign.title,
        preview: campaign.preview,
        description: campaign.description,
        imageUrl: campaign.imageUrl,
      });
      // Update form values
      setValue("title", campaign.title);
      setValue("imageUrl", campaign.imageUrl);
      setValue("preview", campaign.preview);
      setValue("description", campaign.description);
    }
  }, [campaign, setValue]);

  const handleFormSubmit = async () => {
    try {
      const response = await updateCampaign(campaign.id, campaignInfo);
      if (response) {
        setSnackbar("Campanha editada com sucesso!");
        setCampaignInfo(initialState);
        handleClose();
      }
    } catch (error) {
      setSnackbar("Erro ao editar a campanha", "error");
    }
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
      <Box maxWidth="md" sx={{ m: "auto" }}>
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
          <Card
            variant="elevation"
            sx={{
              minWidth: 275,
              backgroundColor: "#f8fafa",
              border: "20px solid #f8fafa",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Editar Campanha
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#32a852",
                      color: "white",
                      "&:hover": { backgroundColor: "#008000" },
                    }}
                    onClick={handleSubmit(handleFormSubmit)}
                  >
                    Salvar
                  </Button>
                </Grid>
              </Grid>
              <Box
                component="form"
                onSubmit={handleSubmit(handleFormSubmit)}
                sx={{ mt: 3, width: "100%" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="title" sx={{ color: "black" }}>
                      Título
                    </InputLabel>
                    <TextField
                      required
                      fullWidth
                      id="title"
                      variant="outlined"
                      margin="normal"
                      sx={{ backgroundColor: "white" }}
                      inputProps={{ maxLength: 50 }}
                      {...register("title", { required: true })}
                      value={campaignInfo?.title}
                      onChange={(e) => {
                        setCampaignInfo({ ...campaignInfo, title: e.target.value });
                        setValue("title", e.target.value);
                      }}
                    />
                    {errors.title?.type === "required" && (
                      <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="imageUrl" sx={{ color: "black" }}>
                      ImageURL
                    </InputLabel>
                    <TextField
                      required
                      fullWidth
                      id="imageUrl"
                      variant="outlined"
                      margin="normal"
                      sx={{ backgroundColor: "white" }}
                      {...register("imageUrl", { required: true })}
                      value={campaignInfo.imageUrl}
                      onChange={(e) => {
                        setCampaignInfo({ ...campaignInfo, imageUrl: e.target.value });
                        setValue("imageUrl", e.target.value);
                      }}
                    />
                    {errors.imageUrl?.type === "required" && (
                      <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="preview" sx={{ color: "black" }}>
                      Resumo
                    </InputLabel>
                    <TextField
                      required
                      fullWidth
                      id="preview"
                      variant="outlined"
                      margin="normal"
                      sx={{ backgroundColor: "white" }}
                      inputProps={{ maxLength: 120 }}
                      {...register("preview", { required: true })}
                      value={campaignInfo.preview}
                      onChange={(e) => {
                        setCampaignInfo({ ...campaignInfo, preview: e.target.value });
                        setValue("preview", e.target.value);
                      }}
                    />
                    {errors.preview?.type === "required" && (
                      <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="description" sx={{ color: "black" }}>
                      Descrição
                    </InputLabel>
                    <TextField
                      required
                      fullWidth
                      id="description"
                      multiline
                      rows={4}
                      variant="outlined"
                      margin="normal"
                      sx={{ backgroundColor: "white" }}
                      inputProps={{ maxLength: 1000 }}
                      {...register("description", { required: true })}
                      value={campaignInfo.description}
                      onChange={(e) => {
                        setCampaignInfo({ ...campaignInfo, description: e.target.value });
                        setValue("description", e.target.value);
                      }}
                    />
                    {errors.description?.type === "required" && (
                      <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Modal>
  );
}
