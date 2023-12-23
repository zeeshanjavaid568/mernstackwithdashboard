const Service = require("../model/service-model");

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    if (!services) {
      res.status(404).json({ message: "Services Not Found." });
    }
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllServices;
