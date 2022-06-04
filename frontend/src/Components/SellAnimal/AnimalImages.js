import React, { useState } from "react";
import "./Style/AnimalImages.css";
import ImgCow from "../../Utility/Jersey-cow.jpg";

const AnimalImages = ({ getImagesState }) => {
  const [animalsImages, setAnimalsImages] = useState([
    { id: 0, name: "img1", file: {}, filepreview: null },
    { id: 1, name: "img2", file: {}, filepreview: null },
    { id: 2, name: "img3", file: {}, filepreview: null },
    { id: 3, name: "img4", file: {}, filepreview: null },
  ]);

  // useMemo(getImagesState(AnimalImages), [getImagesState, animalsImages]);

  const handleInputImage = (event) => {
    const filterArr = animalsImages.filter((elem) => {
      if (elem.name === event.target.name) {
        let reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            animalsImages[elem.id].file = reader.result;
          }
        };
        reader.readAsDataURL(event.target.files[0]);
        animalsImages[elem.id].filepreview = URL.createObjectURL(
          event.target.files[0]
        );
        return animalsImages[elem.id].file;
      } else {
        return elem;
      }
    });

    setAnimalsImages(filterArr);
    //passing data to parent
    getImagesState(animalsImages);
  };

  //Providing data to the parent component

  return (
    <div className="row">
      <h6>पशु की फोटो डाले </h6>
      <div className="imagesContainer">
        {animalsImages.map((img, index) => {
          return (
            <div key={index} className="eachImage">
              <input
                id={img.name}
                name={img.name}
                file={img.name}
                type="file"
                className="form-control btn mt-5"
                accept="image/*"
                onChange={handleInputImage}
              />
              <div className="label-holder">
                <label htmlFor={img.name} className="label">
                  <i className="material-icons">
                    {animalsImages[index].filepreview !== null ? (
                      <div className="targetImg">
                        <img
                          className="previewimg"
                          src={animalsImages[index].filepreview}
                          alt="UploadImage"
                        />
                      </div>
                    ) : (
                      <div>
                        <img src={ImgCow} alt=".." className="before_input" />
                      </div>
                    )}
                  </i>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimalImages;
