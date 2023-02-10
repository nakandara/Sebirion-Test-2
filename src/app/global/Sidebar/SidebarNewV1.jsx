import { useState } from "react";

import { Box, useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import useAuth from "../../../Application/fndbas/hooks/useAuth";

//import { userAuthContext } from "../../base/context/UserAuthContext";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaArchway,
  FaRegLaughWink,
  FaHeart,
  FaDatabase,
  FaUnity,
  FaRegBuilding,
  FaLaptopHouse,
  FaUserAlt,
  FaBuilding,
  FaUserFriends,
} from "react-icons/fa";

import { AutoAwesome, ViewAgenda } from "@mui/icons-material";

const SidebarNewV1 = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const { auth } = useAuth();
  const [role, setRole] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
        breakPoint="md"
        style={{
          zIndex: "387456378853",
        }}
      >
        {/* Header */}
        <SidebarHeader>
          <Menu iconShape="circle">
            {collapsed ? (
              <MenuItem
                icon={<FaAngleDoubleRight />}
                onClick={handleCollapsedChange}
              ></MenuItem>
            ) : (
              <MenuItem
                suffix={<FaAngleDoubleLeft />}
                onClick={handleCollapsedChange}
              >
                <div
                  style={{
                    padding: "9px",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: 15,
                    letterSpacing: "1px",
                  }}
                >
                  {auth.username}
                </div>
              </MenuItem>
            )}
          </Menu>
        </SidebarHeader>
        {/* Content */}
        <SidebarContent>
          <Menu
            iconShape="circle"
            style={{
              padding: "5px",
              textTransform: "uppercase",
              fontSize: 6,
              letterSpacing: "1px",
            }}
          >
            <MenuItem style={{ fontSize: 14 }} icon={<FaTachometerAlt />}>
              Dashboard
              <NavLink to="/" />
            </MenuItem>
            <SubMenu
              style={{ fontSize: 14 }}
              title={"Basic Data"}
              icon={<FaDatabase />}
            >
              <MenuItem icon={<FaUnity />}>
                Units <Link to="/units" />
              </MenuItem>
            </SubMenu>

            <SubMenu title={"Accounting Rules"} icon={<FaArchway />}>
              <MenuItem icon={<FaLaptopHouse />}>
                Payment Terms <Link to="/paymentterms" />
              </MenuItem>
            </SubMenu>
            <SubMenu title={"Enterprise"} icon={<FaArchway />}>
              <MenuItem icon={<FaLaptopHouse />}>
                Association <Link to="/association/null" />
              </MenuItem>
              <MenuItem icon={<FaLaptopHouse />}>
                Associations <Link to="/associations" />
              </MenuItem>
              <MenuItem icon={<FaRegBuilding />}>
                company <Link to="/company" />
              </MenuItem>
              <MenuItem icon={<FaRegBuilding />}>
                companies <Link to="/companies" />
              </MenuItem>
              <MenuItem icon={<FaRegBuilding />}>
                Site <Link to="/site/null" />
              </MenuItem>
              <MenuItem icon={<FaRegBuilding />}>
                Sites <Link to="/sites" />
              </MenuItem>
              <MenuItem icon={<FaRegBuilding />}>
                Customer <Link to="/customer/null" />
              </MenuItem>
              <MenuItem icon={<FaRegBuilding />}>
                Customers <Link to="/customers" />
              </MenuItem>
              <MenuItem icon={<FaRegBuilding />}>
                Supplier <Link to="/supplier/null" />
              </MenuItem>
              <MenuItem icon={<FaRegBuilding />}>
                Suppliers <Link to="/suppliers" />
              </MenuItem>
            </SubMenu>
            {/* Order  */}
            <SubMenu title={"Order"} icon={<FaRegLaughWink />}>
              <MenuItem>
                Sales Rep Order <Link to="/Salesreporder" />
              </MenuItem>
              <MenuItem>
                Issue Note <Link to="/Issuenote" />
              </MenuItem>
            </SubMenu>
            {/* Inventory  */}
            <SubMenu title={"Inventory"} icon={<ViewAgenda />}>
              <MenuItem icon={<AutoAwesome />}>
                Inventory Item <Link to="/inventory_item" />
              </MenuItem>
              <MenuItem icon={<AutoAwesome />}>
                Inventory Items <Link to="/inventory_items" />
              </MenuItem>
              <MenuItem icon={<AutoAwesome />}>
                Item Catalog <Link to="/itemcatalog/null" />
              </MenuItem>
              <MenuItem icon={<AutoAwesome />}>
                Catalog Items
                <Link to="/catalogitems" />
              </MenuItem>
            </SubMenu>
            {/* HR */}
            <SubMenu title={"HR"} icon={<FaBuilding />}>
              <MenuItem icon={<FaUserAlt />}>
                Person <Link to="/person/null" />
              </MenuItem>
              <MenuItem icon={<FaUserFriends />}>
                Person List <Link to="/personList" />
              </MenuItem>
            </SubMenu>
            <SubMenu title={"Purchase"} icon={<FaBuilding />}>
              <MenuItem icon={<FaUserAlt />}>
                GRN <Link to="/grn/null" />
              </MenuItem>
              <MenuItem icon={<FaUserFriends />}>
                GRNs <Link to="/grns" />
              </MenuItem>
            </SubMenu>
            
            {/* <SubMenu title={"Multi Level"} icon={<FaList />}>
              <MenuItem>Submenu 1 </MenuItem>
              <MenuItem>Submenu 2 </MenuItem>
              <SubMenu title={"Submenu 3"}>
                <MenuItem>Submenu 3.1 </MenuItem>
                <MenuItem>Submenu 3.2 </MenuItem>
              </SubMenu>
            </SubMenu> */}
            {/* <SubMenu title={"Multi Level"} icon={<FaList />}>
              <MenuItem>Submenu 1 </MenuItem>
              <MenuItem>Submenu 2 </MenuItem>
              <SubMenu title={"Submenu 3"}>
                <MenuItem>Submenu 3.1 </MenuItem>
                <MenuItem>Submenu 3.2 </MenuItem>
              </SubMenu>
            </SubMenu> */}
          </Menu>
        </SidebarContent>
        {/* Footer */}
        {/* <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{ padding: "16px", height: "330px" }}
          >
            <Link
              className="sidebar-btn"
              style={{ cursor: "pointer" }}
              to="/profile"
            >
              <FaUser />
              <span>My Account</span>
            </Link>
          </div>
        </SidebarFooter> */}
      </ProSidebar>
    </>
  );
};

export default SidebarNewV1;
