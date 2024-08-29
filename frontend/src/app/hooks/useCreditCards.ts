import { useQuery } from "@tanstack/react-query"
import { getCreditCards } from "../services/paymentMethod"


export function useCreditCards(userId: string) {
    const { data, isPending, isError } = useQuery({
        queryKey: ["userCreditCards"],
        queryFn: () => getCreditCards(userId),
    })
    return {cards: data, isPending, isError}
}