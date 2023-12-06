//========HOME-PAGE-FUNCTION===========

const home = async (req, res) => {
  try {
    res.status(200).send("Home page.");
  } catch (error) {
    res.status(400).send({ message: "Page not found." });
  }
};

//========REGISTER-PAGE-FUNCTION===========

const register = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({ message: req.body });
  } catch (error) {
    res.status(400).send({ message: "Page not found." });
  }
};

module.exports = { home, register };
