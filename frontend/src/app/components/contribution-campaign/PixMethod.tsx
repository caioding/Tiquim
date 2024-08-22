import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import QRCode from "qrcode.react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { Button } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export default function PixMethod() {
  const [pixKey, setPixKey] = React.useState("");

  React.useEffect(() => {
    setPixKey(uuidv4());
  }, []);

  return (
    <Box sx={{ width: "80%", m: "auto" }}>
      <Stack spacing={{ sm: 6 }}>
        {pixKey && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Alert severity="warning" icon={<WarningRoundedIcon />}>
              Seu pedido será processado assim que recebermos a confirmação da transferência via
              Pix.
            </Alert>
            <Typography variant="body1" gutterBottom>
              Por favor, faça a transferência escaneando o QR Code abaixo ou a chave Pix.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <QRCode value={`${pixKey}-${Math.random().toString(36).substr(2, 9)}`} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Chave Pix:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {pixKey}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                sx={{
                  width: { xs: "100%", sm: "fit-content" },
                  textTransform: "none",
                  backgroundColor: "#32a852",
                  color: "white",
                  "&:hover": { backgroundColor: "#008000" },
                }}
              >
                Confirmar
              </Button>
            </Box>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
