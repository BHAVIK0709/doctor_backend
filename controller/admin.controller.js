const userModel = require("../models/userModel");
const doctorModel = require("../models/doctorModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      data: users,
      message: "usersdata",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching user",
      error,
    });
  }
};
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      data: doctors,
      message: "doctors data",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors",
      error,
    });
  }
};
const changeStatus =async(req,res)=>{
    try {
        const{doctorId,status} =req.body
        const doc = await doctorModel.findByIdAndUpdate(doctorId,{status})
        const user = await userModel.findOne({_id:doc.userId})
const notification = user.notification
notification.push({
    type:"doctor-account-request-updated",
message:`yourDoctor Account Request has ${status}`
,onClickPath:'/notification'
})
user.isDoctor = status === 'approved' ? true : false
await  user.save()
res.status(201).send({
    success:true,
    message:'Account Status Updated',
    data :doc
})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in change staus",
            error
        })
    }

}


module.exports = { getAllUsers, getAllDoctors ,changeStatus};