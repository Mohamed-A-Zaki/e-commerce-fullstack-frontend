import { setToken } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";

type Props = {
  children: React.ReactNode;
};

const PersistLogin = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("token");

  if (token) {
    dispatch(setToken(token));
  }

  return children;
};

export default PersistLogin;
