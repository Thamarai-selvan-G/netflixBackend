const Model = require("../models");
const adminController = Model.Admin;
let bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { where } = require("sequelize");
var secret = "123456789";
var salt = bcrypt.genSaltSync(10);

let adminCreate = async (req, res) => {
  try {
    let data = req.body;
    let inputEmail = req.body.email;
    let inputPassword = req.body.password;

    let checkUserEmail = await adminController.findAll({
      where: { email: inputEmail },
    });

    if (checkUserEmail.length > 0) {
      return res.json({ message: "account alredy created " });
    }

    let hash = await bcrypt.hash(inputPassword, salt);
    data.password = hash;

    const created = await adminController.create(data);

    if (!created) {
      return res.status(500).json({ message: "internal server error..." });
    }

    const genToken = jwt.sign({ id: created.id }, secret, { expiresIn: "2hr" });

    const updateAdmin = await adminController.update(
      { tocken: genToken },
      { where: { id: created.id } }
    );

    if (!updateAdmin) {
      return res.status(500).json({ message: "server error..." });
    }

    return res.status(201).json({ message: "admin created succesfully..." });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

let findAll = async (req, res) => {
  try {
    const data = await adminController.findAll();
    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

let loginAdmin = async (req, res) => {
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;

  let checkUser = await adminController.findOne({
    where: { email: inputEmail },
  });
  if (!checkUser) {
    return res.status(404).json({ message: "sign in to continue" });
  }
  let comparePassword = await bcrypt.compare(inputPassword, checkUser.password);
  if (!comparePassword) {
    return res.json({ message: "incorrect password" });
  }

  const genToken = jwt.sign({ id: checkUser.id }, secret, { expiresIn: "2hr" });
  const result = await adminController.update(
    { token: genToken },
    { where: { id: checkUser.id } }
  );

  if (!result) {
    return res.status(500).json({ message: "internal error" });
  }

  return res
    .status(200)
    .json({ message: "logged In succesfull", result: result });
};

module.exports = {
  adminCreate,
  loginAdmin,
  findAll,
};
