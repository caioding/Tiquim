import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Campaign } from "./campaign";

export interface FormattedInputsProps {
  campaignInfo: Campaign;
  setCampaignInfo: React.Dispatch<React.SetStateAction<Campaign>>;
  register: UseFormRegister<Campaign>;
  handleSubmit: UseFormHandleSubmit<Campaign>;
  errors: FieldErrors<Campaign>;
}
