const Animal = require("../models/animalModel");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");
const {
  breedArr,
  categoryArr,
  lngArr,
  latArr,
  resultPerPage,
} = require("../utils/apiUtils");
let centerPoint = { userLng: 75.8577258, userLat: 22.7195687 };
let defaultRadius = 5;

// Create Animal
exports.createAnimal = catchAsyncErrors(async (req, res, next) => {
  let newImagesArr = [];
  const imagesLinks = [];

  if (typeof req.body.images === "string") {
    newImagesArr.push(req.body.images);
  } else {
    newImagesArr = req.body.images;
  }

  for (let i = 0; i < newImagesArr.length; i++) {
    const result = await cloudinary.v2.uploader.upload(newImagesArr[i], {
      folder: "animals",
      width: 320,
      height: 220,
      crop: "fill",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.sellerData = req.user;

  const animal = await Animal.create(req.body);

  res.status(201).json({
    success: true,
    animal,
  });
});

// Get All Animal
exports.getAllAnimals = catchAsyncErrors(async (req, res, next) => {
  //intialiazing default query array
  const arrQuery = [
    {
      $sort: {
        publishedOn: 1,
      },
    },
    {
      $sort: {
        num: 1,
      },
    },
  ];

  // skipping through pagination
  if (req.query.currentPage) {
    // console.log("page:" + req.query.currentPage);
  }

  const currentPage = req.query.currentPage || 1;
  const skip = resultPerPage * (currentPage - 1);
  arrQuery.push({ $skip: skip });
  arrQuery.push({ $limit: resultPerPage });

  const animals = await Animal.aggregate(arrQuery);

  const totalAnimals = await Animal.count();

  res.status(200).json({
    success: true,
    animals,
    totalAnimals,
  });
});

// Get Animal Details
exports.getAnimalDetails = catchAsyncErrors(async (req, res, next) => {
  const animal = await Animal.findById(req.params.id);

  if (!animal) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    animal,
  });
});

// Delete Animal

exports.deleteAnimal = catchAsyncErrors(async (req, res, next) => {
  const animal = await Animal.findById(req.params.id);

  if (!animal) {
    return next(new ErrorHandler("Animal not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < animal.images.length; i++) {
    await cloudinary.v2.uploader.destroy(animal.images[i].public_id);
  }

  await animal.remove();

  res.status(200).json({
    success: true,
    message: "Animal Delete Successfully",
  });
});
