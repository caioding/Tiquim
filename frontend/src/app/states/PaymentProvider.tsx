"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
interface ICardInfo {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
}
interface IAddressInfo {
  zip: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}
interface IPaymentContext {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  cardInfo: ICardInfo;
  setCardInfo: React.Dispatch<React.SetStateAction<ICardInfo>>;
  addressInfo: IAddressInfo;
  setAddressInfo: React.Dispatch<React.SetStateAction<IAddressInfo>>;
  contributionAmount: string;
  setContributionAmount: React.Dispatch<React.SetStateAction<string>>;
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
}

interface PaymentProviderProps {
  children: React.ReactNode;
}

const initialState: IPaymentContext = {
  amount: 0,
  contributionAmount: "R$ ",
  paymentMethod: "credit",
  cardInfo: {
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  },
  addressInfo: {
    zip: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
  },
  setAmount: () => {},
  setCardInfo: () => {},
  setAddressInfo: () => {},
  setContributionAmount: () => {},
  setPaymentMethod: () => {},
};

const PaymentContext = createContext<IPaymentContext>(initialState);

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const [amount, setAmount] = useState(0);
  const [contributionAmount, setContributionAmount] = useState("R$ ");
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  });
  const [addressInfo, setAddressInfo] = useState({
    zip: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
  });

  return (
    <PaymentContext.Provider
      value={{
        amount,
        setAmount,
        cardInfo,
        setCardInfo,
        addressInfo,
        setAddressInfo,
        contributionAmount,
        setContributionAmount,
        paymentMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
