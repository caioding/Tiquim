import { PaymentMethod } from "@prisma/client";

//export type CreatePaymentMethodDto = Pick<PaymentMethod, "type">;

export type CreatePaymentMethodDto = {
  type: PaymentType;
  cardHolderName?: string;
  cardLastDigits?: string;
  cardExpiryDate?: string;
};
export type PaymentMethodDto = PaymentMethod;

export type PaymentType = "CREDIT" | "PIX";
