export interface Campaign {
  id: string;
  title: string;
  preview: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deadline: Date;
  category: string;
  goal: number;
  userId: string;
}
