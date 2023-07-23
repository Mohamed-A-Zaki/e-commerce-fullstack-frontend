import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

type Props = {
  children: React.ReactNode;
};

const RequiredAuth = ({ children }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" replace />;
};

export default RequiredAuth;
