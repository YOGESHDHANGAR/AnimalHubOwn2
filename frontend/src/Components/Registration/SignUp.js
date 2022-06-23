import React, { useState, useEffect } from "react";
import "./Style/SignUp.css";
import MetaData from "../../Metadata/Metadata";
import app from "../../Firebase/firebase";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/actions/userActions";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import { i18n } from "../../Languages/Setups/i18nSetup";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [role, setrole] = useState("user");
  const [otp, setotp] = useState("");
  const [show, setShow] = useState(false);

  const handleUserName = (e) => setname(e.target.value);
  const handleNumber = (e) => setnumber(e.target.value);
  const handleUserRole = (e) => setrole(e.target.value);
  const handleOTP = (e) => setotp(e.target.value);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    i18n.changeLanguage("hi");
  }, []);

  const auth = getAuth(app);
  auth.languageCode = "it";

  const captch = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response);
          onSignInSubmit();
        },
      },
      auth
    );
  };

  const onSignInSubmit = (event) => {
    event.preventDefault();
    captch();
    handleShow();
    const phoneNumber = "+91" + number;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("otp has been sent");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitOTP = async (event) => {
    event.preventDefault();
    handleClose();
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        // const user = result.user;
        console.log(result.user);
        window.alert("user is verified");
        dispatch(
          register({
            name: name,
            mobileNumber: number,
            role: role,
          })
        );
        setotp("");
        setnumber("");
        setname("");
        setrole("user");
        history.push("/");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...f
        console.log(error);
      });
  };

  const tempFunc = () => {
    dispatch(
      register({
        name: name,
        mobileNumber: number,
        role: role,
      })
    );
    history.push("/");
  };
  return (
    <>
      <MetaData title="अपना खता बनाये" />
      <div className="signUp_div">
        <div className="signup_container container mt-3">
          <form action="">
            <div className="heading text-center mt-4">
              <h1>{t("userinformation")}</h1>
            </div>
            <div className="" id="sign-in-button"></div>
            <div className="">
              <div className="name mt-3 mb-1 text-center">
                <TextField
                  id="outlined-basic"
                  label={t("namelabel")}
                  variant="outlined"
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={handleUserName}
                />
              </div>
              <div className="mobile mt-3 mb-1 text-center">
                <TextField
                  id="outlined-basic"
                  label={t("mobile")}
                  variant="outlined"
                  type="number"
                  required
                  onChange={handleNumber}
                  value={number}
                />
              </div>

              <div className="usertype text-center mt-2">
                <FormControl component="fieldset">
                  <FormLabel component="legend">{t("useroption")}</FormLabel>
                  <RadioGroup
                    aria-label="userType"
                    name="controlled-radio-buttons-group"
                    value={role}
                    onChange={handleUserRole}
                  >
                    <div className="radion_opto">
                      <FormControlLabel
                        value="Agent"
                        control={<Radio />}
                        label={t("agent")}
                      />

                      <FormControlLabel
                        value="user"
                        control={<Radio />}
                        label={t("user")}
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
                {role === "Agent" ? (
                  <>
                    <div className="email">
                      <TextField
                        id="outlined-basic"
                        label={t("email")}
                        variant="outlined"
                        type="email"
                      />
                    </div>
                  </>
                ) : null}
              </div>
              <div className="submit_button text-center mb-3 mt-2">
                <Button
                  variant="contained"
                  onClick={onSignInSubmit}
                  className="mb-3"
                  // onClick={tempFunc}
                >
                  Generate OTP
                </Button>
              </div>
            </div>
          </form>

          <Modal
            size="lg"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Body>
              <div className="input_otp mt-2 mb-2">
                <TextField
                  id="outlined-basic"
                  label="OTP"
                  variant="outlined"
                  type="number"
                  onChange={handleOTP}
                  value={otp}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="contained"
                className="ms-2 me-2"
                onClick={onSubmitOTP}
              >
                Submit
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  handleClose();
                }}
                style={{ background: "black", color: "white" }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default SignUp;
