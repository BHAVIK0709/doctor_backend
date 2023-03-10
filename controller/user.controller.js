const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateJWT = (user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24 hours" }
  );
  return token;
};

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  // const existingUser = UserModel.findOne({ email: req.body.email });
 
  const hashedPassword = await bcrypt.hashSync(password, 10);
  await UserModel.create({ name, email, password: hashedPassword })
    .then((data) => {
      res.json(data).status(200);
    })
    .catch((err) => {
      res.json({ message: err.msg }).status(500);
    });
};

const getUser = async (req, res) => {
  await UserModel.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const isMatched = bcrypt.compareSync(password, user.password);
      if (isMatched) {
        const token = generateJWT(user);
        res.status(200).send({
          success: true,
          message: "Login Successfull",
          _id: user._id,
          name:user.name,
          email: user.email,
          jwt: token,
        isAdmin:user.isAdmin ,
        notification:user.notification,
        seennotification:user.seennotification,
        isDoctor:user.isDoctor,
        });
      } else {
        res.status(403).send({
          message: "Password dosn't matched",
        });
      }
    } else {
      res.status(401).send({
        message: "Something went wong",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const authContoller = async (req, res) => {
  // console.log('wjueue',req.body)
  try {
    const authuser = await UserModel.findById({ _id: req.body.userId });
// console.log(authuser)
    if (!authuser) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
         authuser
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

module.exports = { addUser, getUser, loginUser, authContoller };
