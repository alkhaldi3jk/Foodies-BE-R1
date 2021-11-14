const passport = require("passport");
const express = require("express");
const router = express.Router();
const {
  // ingredientsCreate,
  getRecipes,
} = require("./controller");

// router.param("ingredientsId", async (req, res, next, ingredientsId) => {
//     const ingredients = await fetchProduct(ingredientsId, next);
//     if (ingredients) {
//       req.ingredients = ingredients;
//       next();
//     } else {
//       next({ status: 404, message: "Ingredient Not Found!" });
//     }
//   });

router.get("/recipes", getRecipes);

// router.post(
//     "/recipes",
//     passport.authenticate("jwt", { session: false }),
//     ingredientsCreate
//   );

module.exports = router;
