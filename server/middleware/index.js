const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const Auth = (req, res, next) => {
  const token = req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token not provided'
    });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Token invalid'
      });
    }

    req.userId = decoded.userId;
    return next();
  });
};
const isAdmin = (req, res, next) => {
  const admin = 1;
  if (req.role_id === admin) {
    return next();
  }
  res.status(403).send('you are not an admin');
};
module.exports = { isAdmin, Auth };
