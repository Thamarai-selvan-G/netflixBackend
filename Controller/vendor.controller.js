let Model = require("../models");
let vendorController = Model.vendor;
let bcrypt = require("bcrypt");
const secret = "0987654321";
const jwt = require("jsonwebtoken");

let createVendor = async (req, res) => {
  try {
    let data = req.body;
    let inputEmail = req.body.email;

    await vendorController.findAll({ where: { email: inputEmail } })
      .then(async (val) => {
        if (val.length == 0) {
          var salt = bcrypt.genSaltSync(10);
          var hash = await bcrypt.hash(req.body.password, salt);
          data["password"] = hash;
          await vendorController.create(data)
            .then(async (value) => {
              let token = jwt.sign({ id: value.id }, secret, {
                expiresIn: "2h",
              });
              await vendorController.update(
                { token: token },
                { where: { id: value.id } }
              );
              return res.json({
                status: 200,
                message: "account created successfully",
              });
            });
        } else {
          return res.json({
            status: 500,
            message: "email already taken",
          });
        }
      })
      .catch((error) => {
        return res.json({
          status: 400,
          message: error.message,
        });
      });
  } catch (error) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
};

let viewAll = async (req, res) => {
  try {
    let data = await vendorController.findAll();
    if (data) {
      return res.json({
        status: 200,
        message: data,
      });
    } else {
      return res.json({
        status: 400,
        message: "internal server error",
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
};

let viewId = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await vendorController.findOne({
      where: { id: id },
    });
    if (data) {
      return res.json({
        status: 200,
        message: data,
      });
    } else {
      return res.json({
        status: 404,
        message: "Not Found",
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
};

let updateId = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;

    let value = await vendorController.update(data, { where: { id: id } });
    if (value[0] > 0) {
      return res.json({
        status: 200,
        message: "updated successfully",
      });
    } else {
      return res.json({
        status: 400,
        message: "update unsuccessful",
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
};

let deletedata = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await vendorController.destroy({ where: { id: id } });

    if (data) {
      return res.json({ status: 200, message: "Deleted successfully" });
    } else {
      return res.json({
        status: 400,
        message: "unsuccessful",
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
};

const loginId = async (req, res) => {
  try {
    let inputEmail = req.body.email;
    let inputPassword = req.body.password;
    const user = await vendorController.findOne({ where: { email: inputEmail } });
    if (!user) {
      return res.json({
        status: 404,
        message: 'signIn to continue'
      });
    }
    const checkPassword = await bcrypt.compare(inputPassword, user.password);
    if (!checkPassword) {
      return res.json({
        status: 401,
        message: 'incorrect password'
      });
    }
    let newToken = jwt.sign({ id: user.id }, secret, { expiresIn: '2hr' });
    let updateToken = await vendorController.update({ token: newToken }, { where: { id: user.id } });
    if (updateToken) {
      return res.json({
        status: 200,
        message: 'login successful'
      });
    }
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

const delectAcc = async (req, res) => {
  try {
    let inputEmail = req.body.email;
    let inputPassword = req.body.password;
    const user = await vendorController.findOne({ where: { email: inputEmail } });
    if (!user) {
      return res.json({
        status: 404,
        message: 'account not found'
      });
    }
    let checkPassword = await bcrypt.compare(inputPassword, user.password);
    if (!checkPassword) {
      return res.json({
        status: 401,
        message: 'incorrect password'
      });
    }
    let deleteUser = await vendorController.destroy({ where: { email: inputEmail } });
    if (deleteUser) {
      return res.json({
        status: 200,
        message: 'account deleted successfully'
      });
    } else {
      return res.json({
        status: 500,
        message: 'internal Server error'
      });
    }
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

module.exports = {
  createVendor,
  viewAll,
  viewId,
  updateId,
  deletedata,
  loginId,
  delectAcc
}
