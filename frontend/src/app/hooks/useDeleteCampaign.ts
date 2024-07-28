import { useState } from "react";

const useDeleteCampaign = (idCampaign: string) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isError, setIsError] = useState(false);
    
    
    const deleteCampaign = async (idCampaign: string) => {
        setIsDeleting(true)
        setIsError(false)
        
        try {
            const response = await fetch(`http://localhost:9000/v1/campaign/${idCampaign}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            if(!response.ok) {
                throw new Error(`Error on deleting campaign: ${response.statusText}`)
            }

            setIsDeleting(false);
            return true;
        } catch(error) {
            console.log(error);
            setIsDeleting(false);
            setIsError(true);
            return false;
        }
    };

    return { deleteCampaign, isDeleting, isError}
}

export default useDeleteCampaign