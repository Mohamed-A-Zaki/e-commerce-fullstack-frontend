import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

type Props = {
  children: React.ReactNode;
};

const RequiredAuth = ({ children }: Props) => {
  const { token } = useAppSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" replace />;
};

export default RequiredAuth;
