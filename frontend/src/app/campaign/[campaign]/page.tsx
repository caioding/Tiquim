"use client";
import { AboutTabPanel } from "@/app/components/AboutTabPanel";
import { CommentsTabPanel } from "@/app/components/comments/CommentsTabPanel";
import { useCampaignDetails } from "@/app/hooks/useCampaignDetails";
import { useCampaignPercentage } from "@/app/hooks/useCampaignPercentage";
import { useCampaignsSupporters } from "@/app/hooks/useCampaignsSupporters";
import { getImageCampaign, getSupporters } from "@/app/services/campaign";
import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

export default function Campanha() {
  const params = useParams();

  const [tabValue, setTabValue] = useState(0);

  const idCampaign = params.campaign as string;

  const { campaign, isPending, isError } = useCampaignDetails(idCampaign);

  const { percentage } = useCampaignPercentage(idCampaign);

  const [supporters,setSupporters]  = useState(0);

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

  useEffect(() => {
    const fetchSupporters = async () => {
      try {
        const result = await getSupporters(idCampaign);
        setSupporters(result);
      } catch (error) {
        console.error("Erro ao buscar o número de apoiadores:", error);
      }
    };

    fetchSupporters();
  }, [idCampaign]);

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
        Ocorreu um erro ao carregar as informações da campanha.
      </Typography>
    );
  }

  if (!campaign) {
    return (
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}>
        Não há detalhes disponíveis para esta campanha no momento.
      </Typography>
    );
  }

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
              mb: { xs: 2},
              flexDirection: "column",
            }}
          >
            <Chip
              label={campaign.category}
              sx={{ backgroundColor: "#32A852", color: "white", mt:2, mb: 3 }}
            />
            <Typography  variant="h4" sx={{ fontWeight: "bold" }}>
              {campaign.title}
            </Typography>


            <Box sx={{ mt: 3 }}>
              <Typography variant="h4"  sx={{fontSize:26, fontWeight: "bold", color: "#828282" }}>
                Arrecadado:
              </Typography>
              <Typography variant="h4"   sx={{fontSize:24, color: "#32A852" }}>
                R$
                {typeof percentage === "number" || percentage instanceof Number
                  ? (Math.min(Number(percentage), 1) * campaign.goal).toFixed(2).replace('.',',')
                  : 0}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row", md: "row" },
                justifyContent: "space-between",
                mt: 3,
              }}
            >
              <Box>
                <Typography variant="h5"  sx={{fontSize:23, fontWeight:"bold", color: "#828282" }}>
                  Meta:
                </Typography>
                <Typography variant="h6"  sx={{fontSize:21, color: "#828282" }}>
                  R${Number(campaign.goal).toFixed(2).replace('.',',')}
                </Typography>
              </Box>
              <Box sx={{ mr:{sm:0 ,md:0 ,lg:5} ,  mt:{xs: 2,sm:0, md: 0, lg:0} , ml:{sm:2, md:2}, mb:{xs: 1}}}>
                <Typography variant="h5"  sx={{fontSize:23, fontWeight:"bold", color: "#828282" }}>
                  Apoiadores:
                </Typography>
                <Typography variant="h6"   sx={{fontSize:21, color: "#828282" }}>
                  {supporters}
                </Typography>
              </Box>
            </Box>

          </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: { xs: "100%", sm: "100%", md: "80%" },
                mt: { xs: 0, sm: 2, md: 1 },
                ml: { xs: 0, sm: 6, md: 10 },
                mb: { xs: 4},
                backgroundColor: "#32a852",
                "&:hover": { backgroundColor: "#008000" },
                textTransform: "none",
              }}
            >
              Doar
            </Button>
        </Grid>
      </Grid>

      <Box sx={{ width: "100%", mt: { xs: 5, md: 7, sm: 10 }, mb: {xs: 2} }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt:{xs: 2} }}>
          <Tabs
            value={tabValue}
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleTabChange}
          >
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
        <CommentsTabPanel idCampaign={idCampaign} value={tabValue} index={2} />
        <CustomTabPanel value={tabValue} index={3}>
          Item Four
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
