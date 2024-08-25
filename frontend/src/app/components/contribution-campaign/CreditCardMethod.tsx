import * as React from "react";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import Review from "./Review";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm from "./AddressForm";
import CreditCardDetails from "./CreditCardDetails";
import PaymentContext from "@/app/states/PaymentProvider";
import { createAddress } from "@/app/services/address";
import { createCreditCard, createPaymentMethod } from "@/app/services/paymentMethod";
import { createContribution } from "@/app/services/contribution";
import { usePathname, useRouter } from "next/navigation";
import useSnackbar from "@/app/hooks/useSnackbar";
import { Campaign } from "@/app/types/campaign";
import { useContext } from "react";

interface CampaignCreditProps {
  campaign: Campaign;
}

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

const initialContributionData = {
  amount: 0,
  campaignId: "",
  paymentMethodId: ",",
};
export default function CreditCardMethod({ campaign }: CampaignCreditProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const { setSnackbar } = useSnackbar();
  const router = useRouter();

  //verificar melhor como obter o id da campanha: Utilizar contexto
  const pathname = usePathname();
  const campaignId = pathname ? pathname.split("/").pop() : null;

  const {
    amount,
    contributionAmount,
    cardInfo,
    addressInfo,
    paymentMethod,
    saveAddress,
    saveCard,
    setAmount,
  } = React.useContext(PaymentContext);
  // saveAddress, setSaveAddress do context para pegar os dados

  const handleNext = () => {
    if (activeStep === 2 && paymentMethod === "credit") {
      //hora que confirma o pagamento pq chegou na última aba e o usuário escolheu cartão de crédito
      handleSubmit(campaignId!);
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (idCampaign: string) => {
    console.log("fim da pagina, hora de guardar os dados");
    console.log("confirmando operação.");
    console.log(amount);
    console.log(contributionAmount);
    console.log(cardInfo);
    console.log(addressInfo);

    if (saveAddress) {
      //se address já estiver la nao salva, uma dica pode ser verificar cep e numero do endereço

      console.log("o usuario escolheu salvar o endereço");

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

      console.log("Sending address data:", formatedAddressData);
      const savedAddress = await createAddress(formatedAddressData);
    } else {
      console.log("o usuario escolheu não salvar o endereço");
    }
    //como nao temos como salvar o cartão, mas sim o método de pagamento,

    //update: coloquei o cartão no método de pagamento

    if (saveCard) {
      console.log("o usuario escolheu salvar o cartao");

      const formattedCardData = {
        ...initialCardDataState,
        cardNumber: cardInfo.cardNumber,
        cardHolderName: cardInfo.cardHolderName,
        expirationDate: cardInfo.expirationDate,
        cardLastDigits: cardInfo.cardNumber.slice(-4),
        cvv: cardInfo.cvv,
      };
      const saveCard = await createCreditCard(formattedCardData);
      console.log("Sending Card data:", formattedCardData);
    } else {
      console.log("o usuario escolheu nao salvar o cartao");
    }

    console.log("Forma de pagamento", paymentMethod);

    try {
      const savedPaymentMethod = await createPaymentMethod(paymentMethod);

      console.log("Forma de pagamento via cartão cadastrada");

      const formattedContribution = {
        ...initialContributionData,
        amount: amount,
        campaignId: campaignId!,
        paymentMethodId: savedPaymentMethod.id,
      };

      const savedContribution = await createContribution(formattedContribution);
      setSnackbar("Contribuição realizada com sucesso!", "success");
      router.push(`/campaign/${idCampaign}`);
    } catch (err) {
      setSnackbar("Erro ao criar a contribuição", "error");
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
