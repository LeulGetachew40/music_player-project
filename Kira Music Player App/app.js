const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const ApiError = require("./utils/apiError.js");
const globalErrorHandler = require("./controllers/errorController.js");
const session = require("express-session");

// sid.signature
app.use(
  session({
    secret: "this-app-has-a-deep-secret",
    cookie: { maxAge: 900000000, secure: false, sameSite: "strict" },
    saveUninitialized: true,
    resave: false,
    genid: function (req) {
      return Date.now().toString();
    },
  })
);

app.use(express.json({ limit: "10kb" }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request, response, next) => {
  if (request.session.isAuth) {
    response.render("profile", {
      title: "Profile",
      user: request.session.user,
    });
  } else {
    response.redirect("./api/v1/users");
  }
});

const userRoutes = require("./routes/userRoutes.js");
app.use("/api/v1/users", userRoutes);
const musicRoutes = require("./routes/musicRoutes.js");
app.use("/api/v1/music", musicRoutes);

app.all("*", (req, res, next) => {
  return next(
    new ApiError(404, `Cannot find ${request.originalUrl} on our server`)
  );
});

app.use(globalErrorHandler);

module.exports = app;
