import { useState } from "react";
import api from "../services/api";
const useDeleteCampaign = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isError, setIsError] = useState(false);

  const deleteCampaign = async (idCampaign: string) => {
    setIsDeleting(true);
    setIsError(false);

    try {
      const response = await api.delete(`/campaign/${idCampaign}`);

      if (response.status !== 200) {
        throw new Error(`Error on deleting campaign: ${response.statusText}`);
      }

      setIsDeleting(false);
      return response.status == 200;
    } catch (error) {
      console.log("Unable to delete campaign:", error);
      setIsDeleting(false);
      setIsError(true);
      return false;
    }
  };

  return { deleteCampaign, isDeleting, isError };
};

export default useDeleteCampaign;
