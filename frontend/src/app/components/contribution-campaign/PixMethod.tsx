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
import PaymentContext from "@/app/states/PaymentProvider";
import { createPaymentMethod } from "@/app/services/paymentMethod";

const initialPixState = {
  // a ideia no momento seria um cartão vazio
};

export default function PixMethod() {
  const [pixKey, setPixKey] = React.useState("");
  const { amount, contributionAmount, cardInfo, addressInfo, paymentMethod, setAmount } =
    React.useContext(PaymentContext);

  React.useEffect(() => {
    setPixKey(uuidv4());
  }, []);

  const handleSubmit = async () => {
    console.log("Forma de pagamento:", paymentMethod);
    try {
      if (paymentMethod === "pix") {
        console.log("entrou no pix uaua");
        const response = await createPaymentMethod(initialPixState, paymentMethod);
        console.log("Forma de pagamento via pix cadastrada");
      }
    } catch (err) {
      console.log("Erro ao cadastrar forma de pagamento:", err);
    }
  };

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
                onClick={handleSubmit}
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
