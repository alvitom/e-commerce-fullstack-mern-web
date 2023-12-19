const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  name: {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
  },
  address: {
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    number: {
      type: Number,
    },
  },
});

// Hash password before saving to the database
userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  }
  next();
});

// Method to compare password for login
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
