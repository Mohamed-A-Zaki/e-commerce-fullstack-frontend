import Brand from "./Brand";
import MainLink from "./MainLink";
import MainNavbar from "./MainNavbar";

const Topbar = () => {
  return (
    <MainNavbar>
      <Brand />
      <MainLink to="/">Go to Home</MainLink>
    </MainNavbar>
  );
};

export default Topbar;
