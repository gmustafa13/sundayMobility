/** @format */

const mongoose = require("mongoose");

const schema = mongoose.Schema;

var userSchema = new schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  salary:{
      type:Number,
      trim:true
  }
});

module.exports = mongoose.model("User", userSchema);
