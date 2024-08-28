"use client";

import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getAvatarUser } from "../../services/user";
import useAuthContext from "../../hooks/useAuthContext";
import { Card, CardContent, Tooltip } from "@mui/material";
import { getImageCampaign } from "../../services/campaign";
import { useContributions, useCampaignsByContribution } from "../../hooks/useUserContributions";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserCampaigns } from "@/app/hooks/useUserCampaigns";

export default function Profile() {
  const router = useRouter();
  const { id } = useAuthContext();

  const pathname = usePathname();
  const userId = pathname ? pathname.split("/").pop() : null;
  const { campaigns, isPending, isError } = useUserCampaigns(userId!);

  const { contributions } = useContributions(userId!);
  const {
    yourContributions,
    isPending: isPendingContribution,
    isError: isErrorContribution,
  } = useCampaignsByContribution(contributions ?? []);

  const { user } = useUser(userId!);

  const [avatarUrl, setAvatarUrl] = useState<string>("/placeholder.png");
  const [imagesUrl, setImagesUrl] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchAvatarImage = async () => {
      if (user?.avatarUrl && user.avatarUrl.length > 0) {
        const image = await getAvatarUser(user.avatarUrl);
        setAvatarUrl(image);
      }
    };
    fetchAvatarImage();
  }, [user]);

  useEffect(() => {
    const fetchCampaignImages = async () => {
      const campaignImages: { [key: string]: string } = {};

      const allCampaigns = [...(campaigns ?? []), ...(yourContributions ?? [])];

      for (const campaign of allCampaigns) {
        if (campaign.imageUrl) {
          const image = await getImageCampaign(campaign.imageUrl);
          campaignImages[campaign.id] = image;
        }
      }

      setImagesUrl(campaignImages);
    };

    if (campaigns || yourContributions) {
      fetchCampaignImages();
    }
  }, [campaigns, yourContributions]);

  const showYourCampaigns = () => {
    if (isPending) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Carregando...
        </Typography>
      );
    } else if (id === "") {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Realize o login para visualizar essas campanhas.
        </Typography>
      );
    } else if (isErrorContribution) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Ocorreu um erro ao carregar as campanhas.
        </Typography>
      );
    } else if (campaigns?.length === 0) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Usuário ainda não criou nenhuma campanha.
        </Typography>
      );
    } else {
      return campaigns?.map((campaign) => (
        <Grid item xs={12} sm={4} key={campaign.id}>
          <Card sx={{ p: 2, borderRadius: 2 }}>
            <CardContent>
              <Grid container alignItems="center">
                <Grid item sx={{ width: "20%" }}>
                  <Avatar
                    alt={campaign.title}
                    src={imagesUrl[campaign.id] ?? "/placeholder.png"}
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid>
                <Grid item sx={{ width: "80%", minWidth: 0 }}>
                  <Tooltip title={campaign.title}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        ml: 1,
                      }}
                    >
                      {campaign.title}
                    </Typography>
                  </Tooltip>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ));
    }
  };

  const showCampaignsHelped = () => {
    if (isPendingContribution) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Carregando...
        </Typography>
      );
    } else if (id === "") {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Realize o login para visualizar as contribuições.
        </Typography>
      );
    } else if (isError) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Ocorreu um erro ao carregar as campanhas.
        </Typography>
      );
    } else if (yourContributions?.length === 0) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Usuário ainda não ajudou nenhuma campanha.
        </Typography>
      );
    } else {
      return yourContributions?.map((campaign) => (
        <Grid
          item
          xs={12}
          sm={4}
          key={campaign.id}
          onClick={() => {
            router.push(`/campaign/${campaign.id}`);
          }}
        >
          <Card sx={{ p: 2, borderRadius: 2 }}>
            <CardContent>
              <Grid container alignItems="center">
                <Grid item sx={{ width: "20%" }}>
                  <Avatar
                    alt={campaign.title}
                    src={imagesUrl[campaign.id] ?? "/placeholder.png"}
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid>
                <Grid item sx={{ width: "80%", minWidth: 0 }}>
                  <Tooltip title={campaign.title}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        ml: 1,
                      }}
                    >
                      {campaign.title}
                    </Typography>
                  </Tooltip>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", mt: 5, mb: 5 }}>
      <Box position="relative" display="inline-block" sx={{ mb: 10 }}>
        <Avatar
          alt={user?.name}
          src={avatarUrl ?? "fallback-avatar-url"}
          sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" mb={10}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {user?.name ?? ""}
        </Typography>
      </Box>

      <Box sx={{ mt: 15, textAlign: "left" }}>
        <Typography variant="h6" fontSize="25px" fontWeight="bold">
          Campanhas de {user?.name}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {showYourCampaigns()}
        </Grid>
      </Box>

      <Box sx={{ mt: 10, textAlign: "left" }}>
        <Typography variant="h6" fontSize="25px" fontWeight="bold">
          {user?.name} apoiou
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {showCampaignsHelped()}
        </Grid>
      </Box>
    </Container>
  );
}
