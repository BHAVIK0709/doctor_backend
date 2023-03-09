
const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModel');

const applydoctor = async(req,res) =>{
try {
    const newDoctor= await doctorModel({...req.body,status:'pending'})   
    await newDoctor.save()
    const adminUser = await userModel.findOne({isAdmin:true})
    const notification =adminUser.notification
    notification.push({
        type:"apply doctor request",
        message:`${newDoctor.firstname} ${newDoctor.lastname} Has Applied For A Doctor Account`,
        data:{
            doctorId:newDoctor._id,
            name:newDoctor.firstname + "  " +newDoctor.lastname,
            onClickPath:'/admin/doctors'
        }
    })
    await userModel.findByIdAndUpdate(adminUser._id,{notification})
    res.status(200).send({
        success:true,
        message:"Doctor Account Applied Successfully"
    })

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"errpr while applying doctors"
    })

}
}
module.exports = { applydoctor };