const jwt = require("jsonwebtoken");
const JWT_SECRET="Iamgood$boy!";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({
      status: false,
      message: "Authenticate using a valid token",
    });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({
      status: false,
      message: "Authenticate using a valid token",
    });
  }
};

module.exports = { fetchUser };
