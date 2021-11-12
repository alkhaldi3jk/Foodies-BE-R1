const { model, Schema } = require("mongoose");

const mongoose = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // email: {
  //   type: String,
  //   trim: true,
  //   lowercase: true,
  //   unique: true,
  //   required: "Email address is required",
  //   match: [
  //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  //     "Please fill a valid email address",
  //   ],
  // },
//   recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipes" }],
//   categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
});


module.exports = model("User", UserSchema);
