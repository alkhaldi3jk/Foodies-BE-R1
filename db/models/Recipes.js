const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const RecipeSchema = mongoose.Schema({
  image: {String},
  name: {
    type: String,
    required: true,
  },
   description:{String},
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
//   ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredients" }],
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

RecipeSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Recipe", RecipeSchema);
