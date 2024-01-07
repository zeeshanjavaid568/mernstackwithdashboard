const User = require("../model/user-model");
const Contact = require("../model/contact-form-model");
const Service = require("../model/service-model");

//TODO: USERS API CRUD START

//!===========Users-Fuction=============

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

//!===========GET-SINGLE-UserDATA-IN-UPDATE-Fuction=============

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

//!===========UPDATE-SINGLE-UserDATA-IN-UPDATE-Fuction=============

const updateUserDataById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      { $set: updatedUserData }
    );
    const message = "User data update successfully.";
    return res.status(200).json({ message, updatedData });
  } catch (error) {
    next(error);
  }
};

//!===========delete-User-Fuction=============

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
//TODO: USERS API CRUD END

//TODO: CONTACTS API CRUD START

//!===========Contacts-Fuction=============

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

//!===========GET-SINGLE-UserDATA-IN-UPDATE-Fuction=============

const getContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Contact.findOne({ _id: id }, { password: 0 });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

//!===========UPDATE-SINGLE-UserDATA-IN-UPDATE-Fuction=============

const updateContactDataById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedContactData = req.body;

    const updatedData = await Contact.updateOne(
      { _id: id },
      { $set: updatedContactData }
    );
    const message = "Contact data update successfully.";
    return res.status(200).json({ message, updatedData });
  } catch (error) {
    next(error);
  }
};


//!===========delete-Contact-Fuction=============

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    res.status(200).json({ message: "Contact deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
//TODO: CONTACTS API CRUD END

//TODO: SERVICES API CRUD START

//!===========Services-Fuction=============

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

//TODO: SERVICES API CRUD END


module.exports = {
  getAllUsers,
  deleteUser,
  updateUserDataById,
  getUserById,
  getAllContacts,
  deleteContact,
  getContactById,
  updateContactDataById,
  getAllServices,
};
