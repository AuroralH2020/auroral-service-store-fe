export interface IUser {
  username: string;
  password?: string;
  confirmPassword?: string;
  name: string;
  surnames: string;
  email?: string;
  role: string;
  tenantId: string;
}


