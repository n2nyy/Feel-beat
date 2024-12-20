const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
  },
  { timestamps: true }
);

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username: username });
  if (user) {
    if (user.password === password) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect username", user);
};
const User = mongoose.model("user", userSchema);

module.exports = User;
