import * as React from "react";
import { NumericFormatProps } from "react-number-format";
import Stack from "@mui/material/Stack";
import { NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Campaign } from "../types/campaign";
import { FormattedInputsProps } from "../types/FormattedInputsProps";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator="."
        decimalSeparator=","
      // prefix="R$ "
      />
    );
  },
);

export default function FormattedInputs({
  campaignInfo,
  setCampaignInfo,
  register,
  errors,
}: FormattedInputsProps) {
  const [] = React.useState({
    numberformat: "", //aparecer no input
  });

  console.log(campaignInfo)
  
  return (
    <Stack>
      <TextField
        label=""
        fullWidth
        type="goal"
        value={campaignInfo.goal}
        id="goal"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
        variant="outlined"
        margin="normal"
        sx={{ backgroundColor: "white" }}
        {...register("goal", { required: true, min: 1 })}
        onChange={(e) => setCampaignInfo({ ...campaignInfo, goal: parseFloat(e.target.value) })}
      />
      {errors.goal?.type === "required" && (
        <Box sx={{ color: 'error.main' }}>Esse campo é obrigatório</Box>
      )}
      {errors.goal?.type === "min" && (
        <Box sx={{ color: 'error.main' }}>O valor deve ser no mínimo 1</Box>
      )}
    </Stack>
  );
}