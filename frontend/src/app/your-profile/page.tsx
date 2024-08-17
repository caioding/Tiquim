"use client"

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useSnackbar from "../hooks/useSnackbar";
import { updateUser } from "../services/user";
import useAuthContext from "../hooks/useAuthContext";
import { Card, CardContent, Tooltip } from "@mui/material";
import { useYourCampaigns } from "../hooks/useYourCampaigns";
import { useQueryClient } from "@tanstack/react-query";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function YourProfile() {

  const { id } = useAuthContext();
  const [searchQuery, setSearchQuery] = React.useState("");
  const queryClient = useQueryClient();
  const { campaigns, isPending, isError} = useYourCampaigns(searchQuery) 

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
          Realize o login para visualizar suas campanhas.
        </Typography>
      );
    } else if (isError) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Ocorreu um erro ao carregar suas campanhas.
        </Typography>
      );
    } else if (campaigns?.length === 0) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Você ainda não criou nenhuma campanha.
        </Typography>
      );
    } else {
      return campaigns?.map((campaign) => (
        <Grid item xs={12} sm={4} key={campaign.id}>
          <Card sx={{ p: 2, borderRadius: 2 }}>
            <CardContent>
              <Grid container alignItems="center">
                <Grid item sx={{width:'20%'}}>
                  <Avatar
                    alt={campaign.title}
                    src={campaign.imageUrl}
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid>
                <Grid item sx={{ width:'80%', minWidth:0}}>
                  <Tooltip title={campaign.title}>
                    <Typography 
                      variant="body2" 
                      fontWeight="bold" 
                      sx={{
                        whiteSpace: 'nowrap', 
                        overflow:"hidden", 
                        textOverflow: 'ellipsis',
                        ml:1,}}>
                      {campaign.title}
                    </Typography>
                  </Tooltip>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))
        
    }
  };



    return (
        <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 5, mb: 5}}>
          {/* Foto do Usuário */}
          <Avatar
            alt="Helena Maria"
            src="url-da-imagem"
            sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
          />
    
          {/* Nome do Usuário */}
          <Typography variant="h4" component="h1" fontWeight="bold" sx={{mb: 10}}>
            Helena Maria
          </Typography>
    

          {/* Campanhas */}
          <Box sx={{ mt: 15, textAlign: 'left' }}>
            <Typography variant="h6" fontSize="25px" fontWeight="bold">
              Suas Campanhas
            </Typography>
    
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {showYourCampaigns()}
            </Grid>
          </Box>

          {/* Campanhas que esse perfil apoiou */}
          <Box sx={{ mt: 10, textAlign: 'left' }}>
            <Typography variant="h6" fontSize="25px" fontWeight="bold">
              Campanhas que você apoiou
            </Typography>
    
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {[1, 3].map((index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ p: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Grid container alignItems="center">
                      <Grid item alignContent={"left"}>
                        <Avatar
                          alt={`Campanha ${index}`}
                          src={`url-da-imagem-campanha-${index}`}
                          sx={{ width: 56, height: 56 }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" fontWeight="bold" sx={{ml: 2}}>
                          Campanha {index}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          </Box>
        </Container>
      );
}