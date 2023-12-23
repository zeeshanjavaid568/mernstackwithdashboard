const User = require("../model/user-model");
const Contact = require("../model/contact-form-model");
const Service = require("../model/service-model");

//!===========User-Fuction=============

const getAllUsers = async (req, res, next) => {
  try {
    //TODO: Using by the projection method inside the find method to neglect the field in database in below line
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found." });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//!===========Contact-Fuction=============

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contact Page Found." });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

//!===========Contact-Fuction=============

const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();

    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No service found" });
    }
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getAllContacts, getAllServices };
