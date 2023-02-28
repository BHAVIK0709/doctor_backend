const User = require("../models/userModel");
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
  const hashedPassword = await bcrypt.hashSync(password, 10);
  await User.create({ name, email, password: hashedPassword })
    .then((data) => {
      res.json(data).status(200);
    })
    .catch((err) => {
      res.json({ message: err.msg }).status(500);
    });
};

const getUser = async (req, res) => {
  await User.find()
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
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatched = bcrypt.compareSync(password, user.password);
      if (isMatched) {
        const token = generateJWT(user);
        res.status(200).send({
            success:true,
            message: "Login Successfull",
            _id: user._id,
            email: user.email,
            jwt: token,
         
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

module.exports = { addUser, getUser, loginUser };