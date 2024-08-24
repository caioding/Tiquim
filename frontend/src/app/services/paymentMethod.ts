import { CreatePaymentMethodDto } from "../types/payment";
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

export async function createPaymentMethod(cardData: CreatePaymentMethodDto, paymentMethod: string) {
  const formData = new FormData();

  if (paymentMethod === "credit") {
    formData.append("type", "CREDIT");
    formData.append("cardHolderName", cardData.cardHolderName!);
    formData.append("cardExpiryDate", cardData.expirationDate!);
    formData.append("cardLastDigits", cardData.cardLastDigits!);
    formData.append("cvv", cardData.cvv!);

    return api
      .post(`/paymentMethod`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data);
  } else if (paymentMethod === "pix") {
    formData.append("type", "PIX");

    return api
      .post(`/paymentMethod`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data);
  }
}
