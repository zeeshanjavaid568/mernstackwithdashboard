const Service = require("../model/service-model");

const services = async (req, res) => {
  try {
    const response = await Service.find();

    if (!response) {
      return res.status(404).json({ message: "No service found" });
    }
    res.status(200).json({ message: response });
  } catch (error) {
    console.log(`Services Page Error ${error}`);
  }
};

module.exports = services;
