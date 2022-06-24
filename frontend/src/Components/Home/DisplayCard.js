import React, { useEffect, useState } from "react";
import Card from "./Card";
import Card2 from "./Card2";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { getAnimals } from "../../Redux/actions/animalActions";
import InfiniteScroll from "react-infinite-scroll-component";
import { getMoreAnimals } from "../../Redux/actions/animalActions";
import MetaData from "../../Metadata/Metadata";

const DisplayCard = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(2);
  const [hsMor, setHsMor] = useState(true);

  const { animals, loading, error } = useSelector((state) => state.animals);
  const { milk, animalCategory, radius, rate, breedArr } = useSelector(
    (state) => state.queriesHub.queries
  );
  const handleScroll = () => {
    setCurrentPage((p) => p + 1);
    dispatch(
      getMoreAnimals(currentPage, milk, animalCategory, radius, rate, breedArr)
    );
    // setHsMor(animalsCount > animals.length);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getAnimals());
  }, [error, dispatch]);

  return (
    <>
      <MetaData title="AnimalHub" />
      {loading === false && (
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={animals.length}
          next={handleScroll}
          hasMore={true}
          loader={
            <div>
              <Box
                sx={{ display: "flex" }}
                className="justify-content-center align-content-center"
              >
                <CircularProgress />
              </Box>
            </div>
          }
        >
          <div className="container">
            <div className="row">
              {animals.map((elem, index) => (
                <div className="col col-lg-4 col-md-6 col-12" key={index}>
                  {/* <p>{elem.num}</p> */}
                  <Card2
                    image={elem.images[0].url}
                    animalCategory={elem.animalCategory}
                    isPregnent={elem.isPregnent}
                    pregDuration={elem.pregDuration}
                    caughNumber={elem.caughNumber}
                    breed={elem.breed}
                    rate={elem.rate}
                    distance={elem.distance}
                    gender={elem.gender}
                    currentlyCaughOrNot={elem.currentlyCaughOrNot}
                    milkCurrent={elem.milkCurrent}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default DisplayCard;
