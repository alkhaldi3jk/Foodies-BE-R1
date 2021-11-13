const express = require("express");
const connectDB = require("./db/database");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");
const morgan = require("morgan");
const cors = require("cors");
const usersRoutes = require("./apis/users/routes");
const categoryRoutes = require("./apis/categories/routes");
const passport = require("passport");
const path = require("path");


const upload = require("./middlewares/multer");

const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const app = express();

app.use(cors());

connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

//passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/", usersRoutes);
app.use(
  "/category",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  categoryRoutes
);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use(errorHandler);

app.listen(8001, () => {
  console.log("The application is running on localhost:8001");
});
