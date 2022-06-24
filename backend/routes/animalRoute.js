const express = require("express");
const {
  getAllAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalDetails,
  getAdminAnimals,
} = require("../controllers/animalController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/animals").get(getAllAnimals); //done

router.route("/animal/:id").get(getAnimalDetails); //done

module.exports = router;
