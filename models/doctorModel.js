const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstname: {
      type: String,
      required: [true, "firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is required"],
    },
    experience: {
      type: String,
      required: [true, "experience is required"],
    },
    feesPerCunsultation: {
      type: String,
      required: [true, "feesPerCunsultation is required"],
    },
    status: {
        type: String,
        default:'pending'
      },
    timings: {
      type: Array,
      required: [true, "timings is required"],
      default:[],
    },
  },
  { timestamps: true }
);
const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;