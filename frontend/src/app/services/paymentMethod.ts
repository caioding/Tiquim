import { CreatePaymentMethodDto, CreditCardDto } from "../types/payment";
import api from "./api";

interface PaymentMethod {
  id: string;
  type: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
export async function getPaymentMethod(type: string): Promise<string> {
  const response = await api.get("/paymentMethod").then((response) => response.data);

  const paymentMethod = response.find(
    (paymentMethod: PaymentMethod) => paymentMethod.type === type,
  );

  return paymentMethod.id;
}

export async function createPaymentMethod(paymentMethod: string) {
  return api
    .post(
      `/paymentMethod`,
      { type: paymentMethod.toUpperCase() },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((response) => response.data);
}

export async function createCreditCard(cardData: CreditCardDto) {
  const formData = new FormData();

  formData.append("cardNumber", cardData.cardNumber);
  formData.append("cardHolderName", cardData.cardHolderName);
  formData.append("cardExpiryDate", cardData.expirationDate);
  formData.append("cardLastDigits", cardData.cardLastDigits);
  formData.append("cvv", cardData.cvv!);

  return api
    .post(`/creditCard`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
}
