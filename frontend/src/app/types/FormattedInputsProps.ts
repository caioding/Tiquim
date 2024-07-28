import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Campaign } from "./campaign";

export interface FormattedInputsProps {
  campaignInfo: Omit<Campaign, "id">;
  setCampaignInfo: React.Dispatch<React.SetStateAction<Omit<Campaign, "id">>>;
  register: UseFormRegister<Campaign>;
  handleSubmit: UseFormHandleSubmit<Campaign>;
  errors: FieldErrors<Campaign>;
}
