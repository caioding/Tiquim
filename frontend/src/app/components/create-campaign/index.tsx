"use client";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Grouped from "../CategoriesInput";
import FormattedInputs from "../NumberFormat";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Campaign, CreateCampaignDto } from "../../types/campaign";
import useSnackbar from "../../hooks/useSnackbar";
import { createCampaign } from "../../services/campaign";
import InputFileUpload from "../FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

interface CreateCampaignProps {
  open: boolean;
  handleClose: () => void;
}

const initialState: CreateCampaignDto = {
  goal: 0,
  deadline: new Date(),
  title: "",
  description: "",
  preview: "",
  category: "",
  userId: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function CreateCampaignModal({ open, handleClose }: CreateCampaignProps) {
  const [campaignInfo, setCampaignInfo] = useState<CreateCampaignDto>(initialState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Campaign>();

  const { setSnackbar } = useSnackbar();

  const handleFormSubmit = async () => {
    const formattedData = {
      ...campaignInfo,
      createdAt: campaignInfo.createdAt,
      updatedAt: campaignInfo.updatedAt,
      deadline: campaignInfo.deadline,
    };

    if (selectedFile) {
      try {
        const response = await createCampaign(formattedData, selectedFile);

        if (response.status != 200) {
          setSnackbar("Erro ao criar a campanha", "error");
          throw new Error(`Error on handle submit creating campaign: ${response.statusText}`);
        }

        setSnackbar("Campanha criada com sucesso!");
        setCampaignInfo(initialState);
        handleClose();
      } catch (error) {
        setSnackbar("Erro na criação da campanha", "error");
      }
    } else {
      setSnackbar("Selecione um arquivo para a campanha", "error");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} scroll="body" maxWidth="md">
      <DialogContent sx={{ p: 6, backgroundColor: "#f8fafa" }}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Criar Campanha
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
          encType="multipart/form-data"
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
                autoComplete="title"
                autoFocus
                variant="outlined"
                margin="normal"
                sx={{ backgroundColor: "white" }}
                inputProps={{ maxLength: 50 }}
                {...register("title", { required: true })}
                value={campaignInfo?.title}
                onChange={(e) => setCampaignInfo({ ...campaignInfo, title: e.target.value })}
              />
              {errors.title?.type === "required" && (
                <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="goal" sx={{ color: "black" }}>
                Meta
              </InputLabel>
              <FormattedInputs
                campaignInfo={campaignInfo}
                setCampaignInfo={setCampaignInfo}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="category" sx={{ color: "black" }}>
                Categorias
              </InputLabel>
              <Grouped
                campaignInfo={campaignInfo}
                setCampaignInfo={setCampaignInfo}
                register={register}
                handleSubmit={handleSubmit} //n eh necessario
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="deadline" sx={{ color: "black" }}>
                Prazo
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={campaignInfo.deadline}
                  onChange={(date) => setCampaignInfo({ ...campaignInfo, deadline: date! })}
                  slotProps={{ textField: { variant: "outlined" } }}
                  format="dd-MM-yyyy"
                  sx={{ backgroundColor: "white", width: "100%" }}
                />
              </LocalizationProvider>
              {errors.deadline?.type === "required" && (
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
                autoComplete="preview"
                autoFocus
                variant="outlined"
                margin="normal"
                sx={{ backgroundColor: "white" }}
                inputProps={{ maxLength: 120 }}
                {...register("preview", { required: true })}
                value={campaignInfo.preview}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCampaignInfo({ ...campaignInfo, preview: e.target.value })
                }
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
                autoComplete="description"
                variant="outlined"
                margin="normal"
                sx={{ backgroundColor: "white" }}
                inputProps={{ maxLength: 1000 }}
                {...register("description", { required: true })}
                value={campaignInfo.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCampaignInfo({ ...campaignInfo, description: e.target.value })
                }
              />
              {errors.description?.type === "required" && (
                <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 200,
                    width: 300,
                    display: selectedFile ? "block" : "none",
                  }}
                  src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
                />
                <InputFileUpload onFileChange={handleFileChange} />
                <IconButton
                  aria-label="delete"
                  color="success"
                  sx={{
                    display: selectedFile ? "block" : "none",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              {selectedFile === null && (
                <Box sx={{ color: "error.main", mt: "8px" }}>Esse campo é obrigatório</Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
