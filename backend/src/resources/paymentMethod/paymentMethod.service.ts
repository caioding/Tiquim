import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { PaymentMethodDto, CreatePaymentMethodDto, PaymentType } from "./paymentMethod.types";
import { PaymentMethodType } from "../paymentMethodType/paymentMethodType.constants";

const prisma = new PrismaClient();
/*

model PaymentMethod {
  id            String         @id @default(uuid()) @db.Char(36)
  type          String         @db.VarChar(10) //CREDIT || PIX
  cardHolderName String?       @db.VarChar(100) //criptografado
  cardLastDigits String?       @db.Char(4)
  cardExpiryDate String?       @db.Char(5)
  createdAt     DateTime       @default(now()) @map("created_at")
  updatedAt     DateTime       @updatedAt @map("updated_at")
  contributions Contribution[]

  @@map("payment_methods")
}


      cardHolderName: true,
      cardLastDigits: true,
      cardExpiryDate: true,
      cvv: true,
*/
export const createPaymentMethod = async (
  paymentMethod: PaymentType,
  uid: string,
): Promise<PaymentMethodDto> => {
  return await prisma.paymentMethod.create({
    select: {
      id: true,
      paymentTypeId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      paymentTypeId: paymentMethod === "CREDIT" ? PaymentMethodType.CREDIT : PaymentMethodType.PIX,
    },
  });
};

export const listPaymentMethods = async (
  uid: string,
  skip?: number,
  take?: number,
): Promise<PaymentMethodDto[]> => {
  return prisma.paymentMethod.findMany({
    select: {
      id: true,
      paymentTypeId: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
  });
};

export const readPaymentMethod = async (
  id: string,
  uid: string,
): Promise<PaymentMethodDto | null> => {
  return await prisma.paymentMethod.findUnique({
    select: {
      id: true,
      paymentTypeId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
};

export const updatePaymentMethod = async (
  id: string,
  updatedPaymentMethod: PaymentMethodDto,
  uid: string,
): Promise<PaymentMethodDto | null> => {
  return await prisma.paymentMethod.update({
    where: { id },
    data: updatedPaymentMethod,
  });
};

export const deletePaymentMethod = async (id: string): Promise<PaymentMethodDto> => {
  return await prisma.paymentMethod.delete({ where: { id: id } });
};
