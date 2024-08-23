import { Container, Grid } from "@mui/material";
import { SupporterCard } from "./SupporterCard";
import { useCampaignSupporters } from "@/app/hooks/useCampaignSupporters";

interface SupportersTabPanelProps {
  idCampaign: string;
  index: number;
  value: number;
}

export function SupportersTabPanel({ idCampaign, value, index }: SupportersTabPanelProps) {
  const { supporters } = useCampaignSupporters(idCampaign);

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
      {value === index && (
        <Container
          component="main"
          sx={{
            width: "100%",
            height: "auto",
            minHeight: "487px",
            p: 3,
          }}
        >
          <Grid container spacing={3}>
            {supporters?.supporters.map((supporter) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={supporter.id}>
                <SupporterCard
                  name={supporter.name}
                  avatarUrl={supporter.avatarUrl ?? ""}
                  userId={supporter.id}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
}
