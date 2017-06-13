const { User, Document } = require('models');

class UserController {

  static create(req, res) {
    const { username, firstname, lastname, email, password, role_id } = req.body;

    if (!username || !firstname || !lastname || !email || !password) {
      return res.status(500).json({
        error: 'Missing required field',
        errors: ['Missing require field name']
      });
    }

    return User.create({ username, firstname, lastname, email, password, role_id })
      .then(user => res.status(201).json(user))
      .catch(error => {
        console.log(error)
        res.status(400).json(error)
      });
  }

  static list(req, res) {
    return User
      .all()
      .then(users => res.status(200).json(users))
      .catch(error => { console.log(error); res.status(400).json(error) });
  }
};
module.exports = UserController;