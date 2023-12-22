const Contact = require("../model/contact-form-model");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts) {
      res.status(404).json({ message: "No Contact Page Found." });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
