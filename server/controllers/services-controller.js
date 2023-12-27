const Service = require("../model/service-model");

const services = async (req, res) => {
  try {
    const service = await Service.find();

    if (!service) {
      return res.status(404).json({ message: "No service found" });
    }
    res.status(200).json({ message: service });
  } catch (error) {
    console.log(`Services Page Error ${error}`);
  }
};

module.exports = services;
