import { useBnbValue } from 'climbingweb/src/hooks/useBnB';
import NavBar from './NavBar';
import navButtons from './button';
function NavBarWrapper() {
  const { visible } = useBnbValue();

  const navBar = visible ? <NavBar navButtons={navButtons} /> : null;
  return navBar;
}
export default NavBarWrapper;
