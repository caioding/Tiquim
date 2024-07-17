"use client";
import { AboutTabPanel } from "@/app/components/AboutTabPanel";
import { useCampaignDetails } from "@/app/hooks/useCampaignDetails";
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
import React, { useState } from "react";

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
  const params = useParams();

  const [tabValue, setTabValue] = useState(0);

  const idCampaign = params.campaign as string;

  const { campaign, isPending, isError } = useCampaignDetails(idCampaign);

  const imageUrl =
    campaign?.imageUrl && campaign.imageUrl.length > 0 ? campaign.imageUrl : "/placeholder.png";

  if (isPending) {
    return (
      <Container sx={{ width: "80%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", m: 5 }}>
          Carregando...
        </Typography>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ width: "80%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", m: 5 }}>
          Ocorreu um erro ao carregar as informações da campanha.
        </Typography>
      </Container>
    );
  }

  if (!campaign) {
    return (
      <Container sx={{ width: "80%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", m: 5 }}>
          Não há detalhes disponíveis para esta campanha no momento.
        </Typography>
      </Container>
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
            }}
          >
            <Chip
              label={campaign.category}
              sx={{ backgroundColor: "#32A852", color: "white", mb: 3 }}
            />
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {campaign.title}
            </Typography>

            <Typography variant="body1" sx={{ color: "#828282", mt: 6 }}>
              {campaign.preview}
            </Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: { xs: "70%", md: "80%" },
              mt: { xs: 0, sm: 2, md: 3 },
              ml: { xs: 0, sm: 6, md: 10 },
              backgroundColor: "#32a852",
              "&:hover": { backgroundColor: "#008000" },
              textTransform: "none",
            }}
          >
            Doar
          </Button>
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
    </Container>
  );
}
