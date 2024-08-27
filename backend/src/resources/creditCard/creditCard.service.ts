import { PrismaClient } from "@prisma/client";
import {
  CardDto,
  CreateCreditCardDto,
  CreditCardDto,
  UpdateCreditCardDto,
} from "./creditCard.types";
import { genSalt, hash } from "bcryptjs";

const prisma = new PrismaClient();

export const createCreditCard = async (
  creditCard: CreateCreditCardDto,
  uid: string,
): Promise<CardDto> => {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
  const salt = await genSalt(rounds);
  const cardNumber = await hash(creditCard.cardNumber, salt);
  return await prisma.creditCard.create({
    select: {
      id: true,
      userId: true,
      cardHolderName: true,
      cardExpiryDate: true,
      cardLastDigits: true,
      cvv: true,
    },
    data: {
      ...creditCard,
      cardNumber: cardNumber,
      userId: uid,
    },
  });
};

export const readCreditCard = async (uid: string): Promise<CardDto[]> => {
  return await prisma.creditCard.findMany({
    select: {
      id: true,
      userId: true,
      cardExpiryDate: true,
      cardHolderName: true,
      cardLastDigits: true,
      cvv: true,
    },
    where: { userId: uid },
  });
};

export const updateCreditCard = async (
  id: string,
  uid: string,
  creditCard: UpdateCreditCardDto,
): Promise<CardDto> => {
  return await prisma.creditCard.update({
    where: { id, cardLastDigits: creditCard.cardLastDigits, userId: uid },
    data: {
      ...creditCard,
      userId: uid,
    },
    select: {
      id: true,
      userId: true,
      cardHolderName: true,
      cardLastDigits: true,
      cardExpiryDate: true,
      cvv: true,
    },
  });
};

export const deleteCreditCard = async (id: string): Promise<CardDto> => {
  return await prisma.creditCard.delete({ where: { id } });
};
