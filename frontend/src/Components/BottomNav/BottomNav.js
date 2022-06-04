import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./Style/BottomNav.css";
import { i18n } from "../../Languages/Setups/i18nSetup";
import { useTranslation } from "react-i18next";
const BottomNav = () => {
  const { t } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("hn");
  }, []);
  return (
    <>
      <div className="bottom_nav footer">
        <div className="bottom_div_Links mb-1">
          <NavLink to="/" className="text-center ms-2 ms-lg-5 ps-2">
            <HomeIcon sx={{ width: 30, height: 30 }} />
            <br />
            {t("homelink")}
          </NavLink>
          {/* <NavLink to="/" className="text-center">
            <ChatIcon /> <br />
            चैट
          </NavLink> */}
          <NavLink to="/sell" className="pashu_beche_NavLink text-center">
            <AddCircleOutlineIcon sx={{ width: 30, height: 30 }} /> <br />{" "}
            {t("animalsell")}
          </NavLink>

          {/* <NavLink to="/doctor" className="text-center me-2 me-lg-5">
            <MedicationIcon />
            <br />
            पशु चिकित्सक
          </NavLink> */}
          <NavLink to="/account" className="text-center me-2 me-lg-5 pe-2">
            <AccountCircleIcon sx={{ width: 30, height: 30 }} />
            <br />
            {t("profile")}
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default BottomNav;
