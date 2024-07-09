export interface Campaign {
  id: string;
  title: string;
  author: string;
  preview: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  goal: number;
  userId: string;
  completedPercentage: number;
}
