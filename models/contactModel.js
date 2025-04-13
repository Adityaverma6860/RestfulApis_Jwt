// ye project and crud dono ke liye 
const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    //  Add For Authentication 
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User",
    },
    name: {
      type: String,
      required: [true, "please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "please add the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "please add the contact phone number "],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("contact", contactSchema);
