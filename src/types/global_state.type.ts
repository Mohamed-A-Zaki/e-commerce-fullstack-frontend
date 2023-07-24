import User from "./user.type";

type Global_State = {
  auth: {
    token: string;
    user: User | null;
  };
  users: {
    users: User[];
    user: User;
    error: string;
    loading: boolean;
  };
  editForm: {
    open: boolean;
  };
  toast: {
    open: boolean;
    message: string;
  };
};

export default Global_State;
