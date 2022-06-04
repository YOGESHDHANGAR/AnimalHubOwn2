import React, { useState, useEffect, Fragment } from "react";
import MetaData from "../../Metadata/Metadata";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import { Button, TextField } from "@mui/material";
import "./Style/Account.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../Redux/actions/userActions";
const Account = () => {
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [btn, setbtn] = useState(false);
  const [username, setusername] = useState("");
  const [editusername, seteditusername] = useState(false);

  const handleUserProfile = (e) => {
    const tempFile = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(URL.createObjectURL(e.target.files[0]));
      }
    };
    reader.readAsDataURL(tempFile);
    setbtn(true);
  };
  const handleEditIcon = (e) => {
    e.preventDefault();
    setbtn(true);
    seteditusername(true);
  };
  const handleUserName = (e) => setusername(e.target.value);
  const handleSave = () => {
    const myForm = new FormData();

    myForm.set("name", username);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
    seteditusername(false);
    setbtn(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (user && loading === false) {
      setusername(user.name);
      setAvatarPreview(user.avatar.url);
    }
  }, [user, loading, error]);

  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <Fragment>
          <MetaData title={user.name + " जी"} />
          <div className="container">
            <div className="profile text-center mt-4">
              {avatarPreview === null ? (
                <>
                  <div className="avator">
                    <Avatar
                      alt="Remy Sharp"
                      src={``}
                      sx={{ width: 150, height: 150 }}
                      className="avator"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="avator">
                    <Avatar
                      alt="Remy Sharp"
                      src={`${avatarPreview}`}
                      sx={{ width: 150, height: 150 }}
                      className="avatar"
                    />
                  </div>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                name="profile"
                id="userdp"
                onChange={handleUserProfile}
              />
              <label htmlFor="userdp" className="label">
                <PhotoCameraIcon
                  sx={{ width: 50, height: 50, color: "green" }}
                  className="photo_icon"
                />
              </label>
            </div>
            <div className="username text-center mt-4 mb-3">
              {editusername === false ? (
                <>
                  <h2>{username}</h2>
                  <IconButton className="edit_button" onClick={handleEditIcon}>
                    <EditIcon />
                  </IconButton>
                </>
              ) : editusername === true ? (
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  onChange={handleUserName}
                  className="mb-4 "
                />
              ) : null}
            </div>
            <div className="save_button editAccount mt-2">
              {btn === true ? (
                <Button variant="contained" onClick={handleSave}>
                  Save
                </Button>
              ) : null}
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Account;
