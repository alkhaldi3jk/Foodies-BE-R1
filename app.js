const express = require("express");
const connectDB= require("./db/database");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");
const morgan = require("morgan");
const cors = require("cors");
const usersRoutes = require("./apis/users/routes");
const passport = require("passport")
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







app.use(errorHandler);

app.listen(8001, () => {
    console.log("The application is running on localhost:8001");
  });