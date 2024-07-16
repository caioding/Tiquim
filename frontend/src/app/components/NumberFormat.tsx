import * as React from "react";
import { NumericFormatProps } from "react-number-format";
import Stack from "@mui/material/Stack";
import { NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";

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
        thousandSeparator="." // Alterado de vírgula para ponto
        decimalSeparator="," // Adicionado para definir o separador decimal como vírgula
        prefix="R$ "
      />
    );
  },
);

export default function FormattedInputs() {
  const [values, setValues] = React.useState({
    numberformat: "", //aparecer no input
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Stack>
      <TextField
        label=""
        fullWidth
        value={values.numberformat}
        onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
        variant="outlined"
        margin="normal"
      />
    </Stack>
  );
}
