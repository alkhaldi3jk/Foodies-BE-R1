const passport = require("passport");
const express = require("express");
const router = express.Router();

const upload = require("../../middlewares/multer");

const {
  recipeCreate,
  categoryCreate,
  fetchCategories,
} = require("./controllers");

router.param("recipesId", async (req, res, next, recipesId) => {
  const recipes = await fetchProduct(recipesId, next);
  if (recipes) {
    req.recipes = recipes;
    next();
  } else {
    next({ status: 404, message: "Product Not Found!" });
  }
});

router.get("", fetchCategories);


router.post(
  "",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  categoryCreate
);
router.post(
  "/:categorySlug/recipes",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  recipeCreate
);
module.exports = router;
