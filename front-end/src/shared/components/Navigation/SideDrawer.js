import "./SideDrawer.css";
import PortalReactDOM from 'react-dom'

const SideDrawer = (props) => {
  const content = <aside className="side-drawer">{props.children}</aside>;
  return PortalReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};
export default SideDrawer;
