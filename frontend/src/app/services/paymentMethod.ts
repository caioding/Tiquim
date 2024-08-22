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
