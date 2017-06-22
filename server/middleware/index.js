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
module.exports = Auth;
