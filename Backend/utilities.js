const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const JWT_SECRET =
    process.env.ACCESS_TOKEN_SECRET || "your access token";
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
