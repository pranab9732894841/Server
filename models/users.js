const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

usersSchema.virtual("tasks", {
  ref: "Tasks",
  localField: "_id",
  foreignField: "owner",
});

usersSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};

usersSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = await jwt.sign(
    { _id: user._id.toString() },
    `${process.env.SERECT_KEY}`
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

usersSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await Users.findOne({ email });
    if (!user) throw new Error();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error();
    return user;
  } catch (e) {
    return "Unable to login";
  }
};

usersSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
