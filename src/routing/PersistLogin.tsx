import { setToken } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";

type Props = {
  children: React.ReactNode;
};

const PersistLogin = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  dispatch(setToken(localStorage.getItem("token") || ""));

  return children;
};

export default PersistLogin;
