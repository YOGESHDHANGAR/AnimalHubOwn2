import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MetaData from "../../Metadata/Metadata";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import "./Style/Sell.css";
import { useDispatch } from "react-redux";
import { createAnimal } from "../../Redux/actions/animalActions";
import { otherAnimalCategoryArr, breedsArr } from "../../Utility/arrays";
import AnimalImages from "./AnimalImages";
import { useHistory } from "react-router-dom"; // v6

export const Sell = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [animalCategory, setAnimalCategory] = useState("");
  const [otherAnimalCategory, setOtherAnimalCategory] = useState("");
  const [caughNumber, setCaughNumber] = useState("");
  const [currentlyCaughOrNot, setCurrentlyCaughOrNot] = useState(false);
  const [isPregnent, setIsPregnent] = useState(false);
  const [pregDuration, setPregDuration] = useState(0);
  const [breed, setBreed] = useState("");
  const [milkCapacity, setMilkCapacity] = useState(0);
  const [milkCurrent, setMilkCurrent] = useState(0);
  const [rate, setRate] = useState(0);
  const [requiringImages, setRequiringImages] = useState(true);

  let imgData = [];
  function getImagesState([...imgaesStateFromChild]) {
    imgData = imgaesStateFromChild;
  }

  const handleChangeB = (event) => {
    setCaughNumber(event.target.value);
  };
  const handleChangeAnimalCategory = (event) => {
    setAnimalCategory(event.target.value);
  };
  const handleChangeOtherAnimalCategory = (event) => {
    setOtherAnimalCategory(event.target.value);
  };
  const handleMilkCapacity = (event) => setMilkCapacity(event.target.value);
  const handleMilkCurrent = (event) => setMilkCurrent(event.target.value);
  const handleIsPregnent = (event) => {
    setIsPregnent(event.target.value);
  };
  const handlePregDuration = (event) => setPregDuration(event.target.value);
  const handleCurrentlyCaughOrNot = (event) => {
    setCurrentlyCaughOrNot(event.target.value);
  };

  const handleBreed = (event) => {
    setBreed(event.target.value);
  };
  const handleRate = (event) => setRate(event.target.value);

  const submitData = async () => {
    const myForm = new FormData();

    myForm.set("animalCategory", animalCategory);
    if (animalCategory === "cow" || animalCategory === "femalebuffalow") {
      myForm.set("breed", breed);
      myForm.set("caughNumber", caughNumber);
      myForm.set("isPregnent", isPregnent);
      myForm.set("pregDuration", pregDuration);
      myForm.set("currentlyCaughOrNot", currentlyCaughOrNot);
      myForm.set("milkCapacity", milkCapacity);
      myForm.set("milkCurrent", milkCurrent);
      myForm.set("gender", "female");
    } else if (animalCategory === "ox" || animalCategory === "malebuffalow") {
      myForm.set("breed", breed);
      myForm.set("gender", "male");
    } else {
      myForm.set("gender", "other");
    }

    myForm.set("rate", rate);

    imgData.map((img) => {
      if (typeof imgData[img.id].file === "string") {
        myForm.append("images", imgData[img.id].file);
      }
    });

    dispatch(createAnimal(myForm));
    window.location.reload(false);
  };

  return (
    <>
      <MetaData title="अपना पशु बेचे" />
      <div className="container mt-3 text-center form_div pt-3 text-center">
        <h1>हमें अपने पशु के बारे में बताएं</h1>
        <form action="">
          <div className="row mt-4">
            <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
              <FormControl sx={{ minWidth: 230 }}>
                <InputLabel id="demo-simple-select-label">पशु चुने</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={animalCategory}
                  label="Select Animal"
                  onChange={handleChangeAnimalCategory}
                >
                  <MenuItem name="cow" value="cow">
                    गाय
                  </MenuItem>
                  <MenuItem value="femalebuffalow">भेंस</MenuItem>
                  <MenuItem value="malebuffalow">भैंसा</MenuItem>
                  <MenuItem value="ox">बैल</MenuItem>
                  <MenuItem value="other">अन्य पशु</MenuItem>
                </Select>
              </FormControl>
            </div>
            {animalCategory === "femalebuffalow" || animalCategory === "cow" ? (
              <>
                <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                  <FormControl sx={{ minWidth: 230 }}>
                    <InputLabel id="demo-simple-select-label">ब्यात</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={caughNumber}
                      label="Select Animal"
                      onChange={handleChangeB}
                    >
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                  <FormControl sx={{ minWidth: 230 }}>
                    <InputLabel id="demo-simple-select-label">गाबीन</InputLabel>
                    <Select
                      labelId="गाबीन"
                      id="demo-simple-select"
                      value={isPregnent}
                      label="Age"
                      onChange={handleIsPregnent}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {isPregnent ? (
                  <div className="col col-lg-3 col-md-4  col-sm-4 col-12 mb-3">
                    <TextField
                      id="outlined-basic"
                      label="कितने महीने "
                      variant="outlined"
                      type="number"
                      value={pregDuration}
                      onChange={handlePregDuration}
                    />
                  </div>
                ) : null}

                <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                  <FormControl sx={{ minWidth: 230 }}>
                    <InputLabel id="demo-simple-select-label">
                      साथ में बछड़ा
                    </InputLabel>
                    <Select
                      labelId="साथ में बछड़ा "
                      id="demo-simple-select"
                      value={currentlyCaughOrNot}
                      label="Age"
                      onChange={handleCurrentlyCaughOrNot}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                  <TextField
                    id="outlined-basic"
                    label="अभी का दूध (प्रति-दिन)"
                    variant="outlined"
                    type="number"
                    value={milkCurrent}
                    onChange={handleMilkCurrent}
                  />
                </div>

                <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                  <TextField
                    id="outlined-basic"
                    label="दूध की क्षमता (प्रति दिन)"
                    variant="outlined"
                    type="number"
                    value={milkCapacity}
                    onChange={handleMilkCapacity}
                  />
                </div>
                {animalCategory === "cow" ? (
                  <>
                    <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                      <FormControl sx={{ minWidth: 230 }}>
                        <InputLabel id="demo-simple-select-label">
                          breed
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={breed}
                          label="Age"
                          onChange={handleBreed}
                        >
                          {breedsArr.slice(17, 40).map((elem, index) => {
                            return (
                              <MenuItem key={index} value={elem}>
                                {elem}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                      <FormControl sx={{ minWidth: 230 }}>
                        <InputLabel id="demo-simple-select-label">
                          breed
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={breed}
                          label="Age"
                          onChange={handleBreed}
                        >
                          {breedsArr.slice(0, 17).map((elem) => {
                            return <MenuItem value={elem}>{elem}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </>
                )}
              </>
            ) : animalCategory === "ox" || animalCategory === "malebuffalow" ? (
              <>
                {animalCategory === "ox" ? (
                  <>
                    <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                      <FormControl sx={{ minWidth: 230 }}>
                        <InputLabel id="demo-simple-select-label">
                          breed
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={breed}
                          label="Age"
                          onChange={handleBreed}
                        >
                          {breedsArr.slice(17, 40).map((elem) => {
                            return <MenuItem value={elem}>{elem}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                      <FormControl sx={{ minWidth: 230 }}>
                        <InputLabel id="demo-simple-select-label">
                          breed
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={breed}
                          label="Age"
                          onChange={handleBreed}
                        >
                          {breedsArr.slice(0, 17).map((elem) => {
                            return <MenuItem value={elem}>{elem}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </>
                )}
              </>
            ) : animalCategory === "other" ? (
              <>
                <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                  <FormControl sx={{ minWidth: 230 }}>
                    <InputLabel id="demo-simple-select-label">
                      कोनसा पशु हे{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={otherAnimalCategory}
                      label="Age"
                      onChange={handleChangeOtherAnimalCategory}
                    >
                      {otherAnimalCategoryArr.map((elem) => {
                        return <MenuItem value={elem}>{elem}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </div>
              </>
            ) : null}

            <div className="col col-lg-3 col-md-4  col-sm-4 col-12 mb-3">
              <TextField
                id="outlined-basic"
                label="रेट (₹)(सही रेट डालें, उससे ज़्यादा ग्राहक कॉल करते हैं) "
                variant="outlined"
                type="number"
                value={rate}
                onChange={handleRate}
              />
            </div>
          </div>

          {requiringImages ? (
            <AnimalImages getImagesState={getImagesState} />
          ) : (
            <AnimalImages />
          )}

          <Button className="btn_submit mb-5" onClick={submitData}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};
export default Sell;
