import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Button, Divider, Drawer, List } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useHistory } from "react-router-dom";
import MedicationIcon from "@mui/icons-material/Medication";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, loadUser } from "../../Redux/actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../Redux/constants/userConstants";
import "./Style/TopNav.css";
const TopNav = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { error, isUpdated } = useSelector((state) => state.profile);

  const [avatarPreview, setAvatarPreview] = useState("");
  const [username, setusername] = useState("");
  const [place, setPlace] = useState("स्थान");

  const [state, setstate] = useState(false);
  const toggleDrawer = (open) => setstate(open);

  const hadleLocation = () => {
    let lng = 0;
    let lat = 0;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const myForm = new FormData();

          lng = position.coords.longitude;
          lat = position.coords.latitude;

          // myForm.set("locationData");
          myForm.set("longitude", lng);
          myForm.set("latitude", lat);
          dispatch(updateProfile(myForm));
        },
        (error) => {
          if (error.PERMISSION_DENIED) {
            console.log("Error: permission denied  please allow your location");
          } else {
            console.log("Other kind of error: " + error);
          }
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (user && loading === false) {
      setusername(user.name);
      setAvatarPreview(user.avatar.url);
      if (user.place) {
        setPlace(user.place);
      }
    }
  }, [user, loading, error]);

  useEffect(() => {
    console.log("isUpdateds:" + isUpdated);
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [isUpdated, dispatch, user, place]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="bg-dark">
        <Toolbar>
          {/* <Typography
            variant="h6"
            noWrap
            // component="div"
            color='inherit'
            sx={{ display: { xs: "block", sm: "block" },color:'blue',backgroundColor:'black' }}
          >
            AnimalHub
          </Typography> */}
          <div>
            <h2>AnimalHub</h2>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open drawer"
              aria-haspopup="true"
              sx={{ mr: 0 }}
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={state}
              onClose={() => toggleDrawer(false)}
              PaperProps={{
                sx: {
                  backgroundColor: "#121212",
                  color: "white",
                },
              }}
            >
              <Box
                sx={{ width: 250, backgroundColor: "" }}
                role="presentation"
                onClick={() => toggleDrawer(false)}
                onKeyDown={() => toggleDrawer(false)}
              >
                <List>
                  <IconButton onClick={() => toggleDrawer(false)}>
                    <CloseIcon className="ms-2 mt-2 text-light" />
                  </IconButton>
                  <div className="profile text-center">
                    <IconButton
                      sx={{ p: 0 }}
                      onClick={() => history.push("/account")}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={avatarPreview}
                        sx={{
                          width: 100,
                          height: 100,
                          marginStart: 4,
                          marginEnd: 0,
                        }}
                      />
                    </IconButton>
                  </div>
                  <div className="drawer_user_name  ms-2 text-center  mt-2  d-flex">
                    <p>{username}</p>
                    <NavLink to="/account" className="ms-2">
                      <EditIcon />
                    </NavLink>
                  </div>
                </List>
                <List>
                  <Divider />
                  <div className="items mt-2">
                    <NavLink to="/doctor" className=" mt-2 mb-2">
                      <MedicationIcon className="me-2 ms-2" /> पशु चिकित्सक
                    </NavLink>
                    <div onClick={hadleLocation} className=" mt-2 mb-2">
                      <LocationOnIcon className="me-2 ms-2" />
                      {place}
                    </div>
                  </div>
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default TopNav;
