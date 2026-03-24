export interface IRegisterForm {
  name: string;
  email: string;
  contact: string;
  image: File | null;
  password: string;
  confirmPassword: string;
}