const Category = require("../../db/models/Categores");
const Recipes = require("../../db/models/Recipes");

exports.fetchCategories = async (req, res, next) => {
  try {
    const categories = await Category.find()
    // .populate({
    //   path: "recipes",
    //   select: "name",
    // });
    return res.json(categories);
  } catch (error) {
    next(error);
  }
};


exports.categoryCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.recipes = req.params.recipesId;
    const newCategory = await Category.create(req.body);
  //  await newCategory.populate("recipes");
    return res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};


exports.recipeCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.category = req.params.categoryId;
    req.body.owner=req.user._id
    const newRecipes = await Recipes.create(req.body);
    await newRecipes.populate("category");
    // await newRecipes.populate({
    //   path:"owner",
    //   select:"username"
    // })
    
    return res.status(201).json(newRecipes);

    // }
    // else {
    //   const err = new Error("Unauthorized");
    //   err.status = 401;
    //   next(err);
    // }
  } catch (error) {
    next(error);
  }
};
