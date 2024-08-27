import { PaymentMethod } from "@prisma/client";

export type CreatePaymentMethodDto = Pick<PaymentMethod, "type">;

export type PaymentMethodDto = PaymentMethod;
