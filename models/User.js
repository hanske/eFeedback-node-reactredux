const mongoose = require("mongoose");
const { Schema } = mongoose;

// Initialize the properties to be used on our MongoDB record
const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  firstName: String,
  credits: { type: Number, default: 0 },
});

// Create Model class for collection we want to create
mongoose.model("users", userSchema);
