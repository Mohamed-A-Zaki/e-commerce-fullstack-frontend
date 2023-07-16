import User from "./user.type";

type Data = {
  token: string;
  user: User;
};

type Auth_Res_Data = {
  data: Data;
  message: string;
  status: string;
};

export default Auth_Res_Data;
