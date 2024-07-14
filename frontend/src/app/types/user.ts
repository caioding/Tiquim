export default interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userTypeId: string;
}
