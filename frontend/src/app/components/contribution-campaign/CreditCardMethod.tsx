import * as React from "react";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import Review from "./Review";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm from "./AddressForm";
import CreditCardDetails from "./CreditCardDetails";
import PaymentContext from "@/app/states/PaymentProvider";
import { createAddress } from "@/app/services/address";
import { createPaymentMethod } from "@/app/services/paymentMethod";

const steps = ["Detalhes do Pagamento", "Endereço de Cobrança", "Revisão de Pagamento"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <CreditCardDetails />;
    case 1:
      return <AddressForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Passo desconhecido");
  }
}
const initialAddressInfoState = {
  cep: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  uf: "",
  country: "",
};

const initialCardDataState = {
  cardNumber: "",
  cardHolderName: "",
  expirationDate: "",
  cvv: "",
};

export default function CreditCardMethod() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { amount, contributionAmount, cardInfo, addressInfo, paymentMethod, setAmount } =
    React.useContext(PaymentContext);

  const handleNext = () => {
    if (activeStep === 2 && paymentMethod === "credit") {
      //hora que confirma o pagamento pq chegou na última aba e o usuário escolheu cartão de crédito
      handleSubmit();
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    console.log("fim da pagina, hora de guardar os dados");
    console.log("confirmando operação.");
    console.log(amount);
    console.log(contributionAmount);
    console.log(cardInfo);
    console.log(addressInfo);

    //como nao temos como salvar o cartão, mas sim o método de pagamento,

    //update: coloquei o cartão no método de pagamento
    //seguirei por enquanto salvando so o endereço

    const formatedAddressData = {
      ...initialAddressInfoState,
      cep: addressInfo.zip,
      street: addressInfo.zip,
      number: addressInfo.number.toString(),
      neighborhood: addressInfo.neighborhood,
      city: addressInfo.city,
      uf: addressInfo.state,
      country: addressInfo.country,
    };

    const formattedCardData = {
      ...initialCardDataState,
      cardNumber: cardInfo.cardNumber,
      cardHolderName: cardInfo.cardHolderName,
      expirationDate: cardInfo.expirationDate,
      cardLastDigits: cardInfo.cardNumber.slice(-4),
      cvv: cardInfo.cvv,
    };
    //console.log("Sending address data:", formatedAddressData);
    console.log("Sending Card data:", formattedCardData);
    console.log("Forma de pagamento", paymentMethod);
    /*
    try {
      const response = await createAddress(formatedAddressData);
      console.log("Endereço criado com sucesso:", response);
    } catch (error) {
      console.error("Erro ao criar o endereço:", error);
    }
     */

    try {
      if (paymentMethod === "credit") {
        console.log("entrou no credito auau");
        const response = await createPaymentMethod(formattedCardData, paymentMethod);
        console.log("Forma de pagamento via cartão cadastrada");
      } else if (paymentMethod === "pix") {
        // outra página
        const response = await createPaymentMethod(formattedCardData, paymentMethod);
        console.log("Forma de pagamento via pix cadastrada");
      }
    } catch (err) {
      console.log("Erro ao cadastrar forma de pagamento");
    }
  };

  return (
    <Box sx={{ width: "80%", m: "auto" }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                "& .MuiStepIcon-root.Mui-completed": { color: "green" },
                "& .MuiStepIcon-root.Mui-active": { color: "green" },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep)}
      <Box
        sx={[
          {
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            alignItems: "end",
            flexGrow: 1,
            gap: 1,
            pb: { xs: 12, sm: 0 },
            mt: "30px",
          },
          activeStep !== 0 ? { justifyContent: "space-between" } : { justifyContent: "flex-end" },
        ]}
      >
        {activeStep !== 0 && (
          <Button
            startIcon={<ChevronLeftRoundedIcon />}
            onClick={handleBack}
            variant="contained"
            sx={{
              display: { xs: "none", sm: "flex" },
              width: { xs: "100%", sm: "fit-content" },
              textTransform: "none",
              backgroundColor: "#32a852",
              color: "white",
              "&:hover": { backgroundColor: "#008000" },
            }}
          >
            Anterior
          </Button>
        )}
        <Button
          variant="contained"
          endIcon={<ChevronRightRoundedIcon />}
          onClick={handleNext}
          sx={{
            width: { xs: "100%", sm: "fit-content" },
            textTransform: "none",
            backgroundColor: "#32a852",
            color: "white",
            "&:hover": { backgroundColor: "#008000" },
          }}
        >
          {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
        </Button>
      </Box>
    </Box>
  );
}
