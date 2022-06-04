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

router
  .route("/admin/animals")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminAnimals);

router
  .route("/admin/animals")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminAnimals);

router.route("/animal/new").post(isAuthenticatedUser, createAnimal); //done

router.route("/animal/new").post(isAuthenticatedUser, createAnimal); //done

router
  .route("admin/animal/:id")
  .put(isAuthenticatedUser, updateAnimal)
  .delete(isAuthenticatedUser, deleteAnimal);

router
  .route("admin/animal/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateAnimal)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAnimal);

router.route("/animal/:id").get(getAnimalDetails); //done

module.exports = router;
