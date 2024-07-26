import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import campaigns from "../mocks/campaigns";
import { FormattedInputsProps } from "../types/FormattedInputsProps";
import { Box } from "@mui/material";

export default function Grouped({
  campaignInfo,
  setCampaignInfo,
  register,
  errors,
}: FormattedInputsProps) {
  // Extrai categorias únicas das campanhas
  const uniqueCategories = [...new Set(campaigns.map((campaign) => campaign.category))].map(
    (category) => {
      const firstLetter = category[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        title: category, // Se tirar some os nomes da categoria
      };
    },
  );

  return (
    <>
      <Autocomplete
        id="grouped-demo"
        options={uniqueCategories.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.title}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            type="category"
            id="category"
            label=""
            margin="normal"
            sx={{ backgroundColor: "white" }}
            {...register("category", { required: true })}
            value={campaignInfo?.category}
            onChange={(e) => setCampaignInfo({ ...campaignInfo, category: e.target.value })}
          />
        )}
      />
      {errors.category?.type === "required" && (
        <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
      )}
    </>
  );
}
