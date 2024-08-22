import * as React from "react";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import Review from "./Review";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm from "./AddressForm";
import CreditCardDetails from "./CreditCardDetails";

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

export default function CreditCardMethod() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
