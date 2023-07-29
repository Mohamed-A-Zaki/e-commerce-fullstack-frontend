import User from "./user.type";

type Data = {
  token: string;
  user: User;
};

export type Auth_Res_Data = {
  data: Data;
  message: string;
  status: string;
};

export type SignupData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginData = {
  email: string;
  password: string;
};
