const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");

const applydoctor = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply doctor request",
      message: `${newDoctor.firstname} ${newDoctor.lastname} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstname + "  " + newDoctor.lastname,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(200).send({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "errpr while applying doctors",
    });
  }
};

const getAllNoti = async (req, res) => {
  try {
    const doctorNoti = await userModel.findOne({ _id: req.body.userId });
    console.log(doctorNoti);
    const seennotification = doctorNoti.seennotification;
    const notification = doctorNoti.notification;
    seennotification.push(notification);
    doctorNoti.notification = [];
    doctorNoti.seennotification = notification;

    const updatedDoctorNoti = await doctorNoti.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedDoctorNoti,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in notification",
      success: false,
      error,
    });
  }
};

const deleteAllNoti = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notification deleted successfully ",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notification",
      error,
    });
  }
};

const doctorInfo = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });

    res.status(200).send({
      success: true,
      message: "Doctor data fetched ",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in fetching doctor details",
      error,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Updated Successfully ",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update Profile",
      error,
    });
  }
};
const showAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.findOne({ status: "approved" });

    res.status(200).send({
      success: true,
      message: "Doctor List fetched ",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in fetching doctor list",
      error,
    });
  }
};

const getDoctorById = async (req, res) => {
  try {
const doctor = await doctorModel.findOne({_id:req.body.doctorId})
    res.status(200).send({
      success: true,
      message: "single Doctor info. ",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in doc info by id ",
      error,
    });
  }
};
module.exports = {
  applydoctor,
  getAllNoti,
  deleteAllNoti,
  doctorInfo,
  updateProfile,
  showAllDoctors,
  getDoctorById,
};