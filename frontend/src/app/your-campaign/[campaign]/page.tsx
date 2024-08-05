"use client";
import { AboutTabPanel } from "@/app/components/AboutTabPanel";
import {
  Box,
  Chip,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import useCampaignOwner from "@/app/hooks/useCampaignOwner";
import useSnackbar from "@/app/hooks/useSnackbar";
import { deleteCampaign, getImageCampaign } from "@/app/services/campaign";
import EditCampaignModal from "@/app/components/edit-campaign";
import { useQueryClient } from "@tanstack/react-query";
import AlertDialog from "@/app/components/DialogConfirmationDelete";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function YourCampaign() {
  const router = useRouter();
  const params = useParams();

  const { setSnackbar } = useSnackbar();

  const [tabValue, setTabValue] = useState(0);

  const idCampaign = params.campaign as string;

  const { isPending, isError, isOwner, campaign } = useCampaignOwner(idCampaign);

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string>("null");

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

  if (isPending) {
    return (
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}>
        Carregando...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}>
        Ocorreu um erro ao carregar as informações da campanha ou a campanha não existe.
      </Typography>
    );
  }

  if (!campaign) {
    return (
      <Container>
        <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}>
          Não há detalhes disponíveis para esta campanha no momento.
        </Typography>
      </Container>
    );
  }

  if (!isOwner) {
    return (
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}>
        Você não tem permissão para acessar essa página.
      </Typography>
    );
  }

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleConfirmOpen = (idCampaign: string) => {
    setCampaignToDelete(idCampaign);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setCampaignToDelete("null");
    setConfirmOpen(false);
  };

  const handleDelete = async () => {
    const success = await deleteCampaign(campaignToDelete);

    if (success) {
      setSnackbar("Campanha deletada com sucesso!");
      router.push("/your-campaigns");
    } else {
      setSnackbar("Erro ao deletar campanha", "error");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={{ width: "80%", m: "auto" }}>
      <Grid container component="main" sx={{ height: "487px" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          margin={0}
          sx={{
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={6} component={"div"}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              mt: { xs: 0 },
              ml: { xs: 0, sm: 6, md: 10 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Chip label={campaign.category} sx={{ backgroundColor: "#32A852", color: "white" }} />
              <Box>
                <IconButton aria-label="edit" color="success" onClick={handleOpen}>
                  <EditIcon />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  color="success"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConfirmOpen(campaign.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {campaign.title}
            </Typography>

            <Typography variant="body1" sx={{ color: "#828282", mt: 6 }}>
              {campaign.preview}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ width: "100%", mt: 5 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Sobre" />
            <Tab label="Atualizações" />
            <Tab label="Comentários" />
            <Tab label="Apoiadores" />
          </Tabs>
        </Box>
        <AboutTabPanel campaign={campaign} value={tabValue} index={0} />
        <CustomTabPanel value={tabValue} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          Item Three
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={3}>
          Item Four
        </CustomTabPanel>
      </Box>

      <EditCampaignModal campaign={campaign} open={open} handleClose={handleClose} />

      <AlertDialog
        open={confirmOpen}
        onConfirm={handleDelete}
        onCancel={handleConfirmClose}
        message="Deseja apagar essa campanha de sua lista de campahas?"
      />
    </Container>
  );
}
