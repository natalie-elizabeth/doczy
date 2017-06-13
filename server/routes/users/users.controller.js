const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const secretKey = process.env.SECRET_KEY;

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
        res.status(400).json(error)
      });
  }

  static listall(req, res) {
    return User
      .findAll({
        include: [{
          model: Document,
          as: 'documents',
        }],
      })
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).send(error));
  }
  static retrieve(req, res) {
    return User
      .findById(req.params.id, {
        include: [{
          model: Document,
          as: 'documents'
        }]
      })
      .then(user => {
        if (!user) {
          res.status(404).send({
            message: 'User Not Found'
          });
        }
        return res.status(200).json(user);
      })
      .catch(error => { res.status(400).json(error) });
  }
  static delete(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          res.status(404).send({ message: "User not found" });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(user));
      })
      .catch(error => res.status(400).send(error));
  }
  static login(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(403).send({
            message: 'Invalid user'
          });
        }
        bcrypt.compare(req.body.password, User.password)
          .then((diff) => {
            if (diff) {
              const token = jwt.sign({ user_id: User.id }, secretKey, { expiresIn: '24h' });
              return res.status(200).send({
                message: 'You were successfully logged in',
                token,
                expiresIn: '24h'
              })
            }
            return res.send('Password/ email is incorrect')
          })
          .catch(() => {
            res.status(401).send({
              message: 'Invalid login credentials'
            });
          });
      })
      .catch(() => {
        res.status(401).send({
          message: 'Invalid login credentials'
        });
      })

  }
}
module.exports = UserController;

