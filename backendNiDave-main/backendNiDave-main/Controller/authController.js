const AUTH = require("../Models/authSchema");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { message: "" };

  if (err.message === "Incorrect user name" || "Incorrect password") {
    errors.message = "Incorrect Username or Password";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.message = "that user name is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, userName) => {
  return jwt.sign({ id, userName }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await AUTH.create({ username, password });
    console.log(user);
    const token = createToken(user._id, user.username);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(201).json({ user: user._id, username: user.username });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await AUTH.login(username, password);
    const token = createToken(user._id, user.username);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(201).json({ user: user._id, username: user.username });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors });
  }
};

module.exports.verify_user = async (req, res) => {
  res.status(200).json({ message: "Permission granted", user: req.user.userName});
};

module.exports.signout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true, // Ensures the cookie is only accessible by the server
    secure: true, // Ensures the cookie is only sent over HTTPS in production
    sameSite: "none", // Allows cross-origin requests (needed if front-end and back-end have different origins)
  });
  res.status(200).send("Cookie Cleared");
};