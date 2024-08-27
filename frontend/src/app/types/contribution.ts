export default interface Contribution {
  id: string;
  amount: number;
  userId: string;
  campaignId: string;
  paymentMethodId: string;
  createdAt: Date;
  updatedAt: Date;
}
