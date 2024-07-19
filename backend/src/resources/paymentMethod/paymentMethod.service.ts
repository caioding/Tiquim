import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { PaymentMethodDto, CreatePaymentMethodDto } from "./paymentMethod.types";

const prisma = new PrismaClient();

export const createPaymentMethod = async (
  paymentMethod: CreatePaymentMethodDto,
  uid: string,
): Promise<PaymentMethodDto> => {
  return await prisma.paymentMethod.create({
    select: {
      id: true,
      type: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...paymentMethod,
      userId: uid,
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
      type: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { userId: uid },
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
      type: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id: id, userId: uid },
  });
};

export const updatePaymentMethod = async (
  id: string,
  updatedPaymentMethod: CreatePaymentMethodDto,
  uid: string,
): Promise<PaymentMethodDto | null> => {
  return await prisma.paymentMethod.update({
    where: { id: id, userId: uid },
    data: updatedPaymentMethod,
  });
};

export const deletePaymentMethod = async (id: string, uid: string): Promise<PaymentMethodDto> => {
  return await prisma.paymentMethod.delete({ where: { id: id, userId: uid } });
};
