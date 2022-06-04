import React, { useState } from "react";
import {
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  clearErrors,
  getAnimals,
  getQueries,
} from "../../Redux/actions/animalActions";
import "./Style/TopNav.css";
import {
  cowBreedsArr,
  buffaloBreedsArr,
  animalCategoryArr,
} from "../../Utility/arrays";

const FilterBar = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [animalCategory, setAnimalCategory] = useState();
  const [milk, setmilk] = useState(25);
  const [radius, setradius] = useState(5);
  const [rate, setrate] = useState(500000);
  const [breedArr, setbreedArr] = useState();
  const [language, setlanguage] = useState("hn");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChangeAnimalCategory = (event) => {
    setAnimalCategory(event.target.value);
    event.target.name === animalCategoryArr[1] ||
    event.target.name === animalCategoryArr[3]
      ? setbreedArr(cowBreedsArr)
      : setbreedArr(buffaloBreedsArr);
  };
  const handleChangeMilk = (event) => setmilk(event.target.value);
  const handleChangeRadius = (event) => setradius(event.target.value);
  const handleChangeRate = (event) => setrate(event.target.value);
  const handleChangeLanguages = (event) => setlanguage(event.target.value);

  const handleCheckBreedArr = (event) => {
    const filter = breedArr.filter((elem) => {
      return elem.name !== event.target.name;
    });
    var t = parseInt(event.target.id);
    filter.push({
      id: t,
      name: event.target.name,
      value: event.target.value,
      check: event.target.checked,
    });
    const array = filter.sort((a, b) => a.id - b.id);
    setbreedArr(array);
  };

  const getQueriedData = async () => {
    dispatch(getAnimals(1, milk, animalCategory, radius, rate, breedArr));
    dispatch(
      getQueries({
        milk: milk,
        animalCategory: animalCategory,
        radius: radius,
        rate: rate,
        breedArr: breedArr,
      })
    );
    handleClose();
  };

  return (
    <>
      <div className="top_nav_bar">
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          fullscreen="true"
        >
          <Modal.Header>
            <Modal.Title style={{ color: "black", margin: "auto" }}>
              <h1>Make Filters</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="/" method="post">
              <div className="row">
                <div className="col  col-lg-4 col-md-4  col-sm-4 mb-5 ">
                  <FormControl autoWidth="true" style={{ width: "100px" }}>
                    <InputLabel id="demo-simple-select-label">दूध</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={milk}
                      label="milk"
                      onChange={handleChangeMilk}
                    >
                      <MenuItem value={5}>0-5</MenuItem>
                      <MenuItem value={10}>5-10</MenuItem>
                      <MenuItem value={15}>10-15</MenuItem>
                      <MenuItem value={20}>15-20</MenuItem>
                      <MenuItem value={25}>20+</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col  col-lg-4 col-md-4 col-sm-4 mb-5">
                  <FormControl autoWidth style={{ width: "100px" }}>
                    <InputLabel id="demo-simple-select-label">दूरी</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={radius}
                      label="radius"
                      onChange={handleChangeRadius}
                    >
                      <MenuItem value={1}>30km</MenuItem>
                      <MenuItem value={2}>50km</MenuItem>
                      <MenuItem value={3}>70km</MenuItem>
                      <MenuItem value={4}>100km</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col  col-lg-4 col-md-4  col-sm-4  mb-5">
                  <FormControl autoWidth style={{ width: "100px" }}>
                    <InputLabel id="demo-simple-select-label">कीमत</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={rate}
                      label="price"
                      onChange={handleChangeRate}
                    >
                      <MenuItem value={30000}>30,000</MenuItem>
                      <MenuItem value={50000}>50,000</MenuItem>
                      <MenuItem value={75000}>75,000</MenuItem>
                      <MenuItem value={500000}>90,000</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="row">
                <div className="col  col-lg-4 col-md-6 col-sm-6 col-6  mb-3 animal_select_div">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      <h3>पशु</h3>
                    </FormLabel>
                    <RadioGroup
                      aria-label="animal"
                      name="controlled-radio-buttons-group"
                      value={animalCategory}
                      onChange={handleChangeAnimalCategory}
                    >
                      {animalCategoryArr.map((elem, index) => {
                        return (
                          <div key={index}>
                            <FormControlLabel
                              value={index}
                              control={<Radio />}
                              name={elem}
                              label={elem}
                            />
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className="col col-lg-4 col-md-6 col-sm-6 col-6 mb-3 chose_div">
                  {animalCategory === "1" || animalCategory === "3" ? (
                    <>
                      <h3>नस्ल</h3>
                      {breedArr.map((elem, index) => {
                        return (
                          <>
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                id={elem.id}
                                name={elem.name}
                                value={elem.index}
                                checked={elem.check}
                                index={elem.id}
                                onChange={handleCheckBreedArr}
                              />
                              <label htmlFor={`custom-checkbox-${elem.id}`}>
                                {elem.name}
                              </label>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : animalCategory === "0" || animalCategory === "2" ? (
                    <>
                      <h3>नस्ल</h3>
                      {breedArr.map((elem, index) => {
                        return (
                          <>
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                id={elem.id}
                                name={elem.name}
                                value={elem.value}
                                checked={elem.check}
                                index={elem.id}
                                onChange={handleCheckBreedArr}
                              />
                              <label htmlFor={`custom-checkbox-${elem.id}`}>
                                {elem.name}
                              </label>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
              }}
              style={{ background: "black", color: "white" }}
            >
              Close
            </Button>
            <Button
              variant="secondary"
              style={{ background: "#0d6efd", color: "white" }}
              className="btn btn-primary ms-2"
              onClick={getQueriedData}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="top_nav_btn d-flex">
          <div className="bottons mt-2">
            <Button
              onClick={() => {
                handleShow();
              }}
            >
              खोज पशु
            </Button>
          </div>
          <div className="select_language ms-5 mt-1 mb-1">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">lang</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={language}
                label="Age"
                onChange={handleChangeLanguages}
              >
                <MenuItem value="hn">हिन्दी</MenuItem>
                <MenuItem value="tamil">தமிழ்</MenuItem>
                <MenuItem value="telugu">తెలుగు</MenuItem>
                <MenuItem value="kannada">ಕನ್ನಡ</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <hr
          style={{
            color: "black",
            backgroundColor: "red",
            height: 5,
            marginTop: 0,
          }}
        />
      </div>
    </>
  );
};

export default FilterBar;
