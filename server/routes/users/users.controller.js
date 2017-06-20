const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const secretKey = process.env.SECRET_KEY;

const { User, Document } = require('../../models');

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
        res.status(400).json(error);
      });
  }

  static seeall(req, res) {
    return User
      .all()
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error));

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
      .catch(error => res.status(404).send(error));
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
      .catch(error => { res.status(400).json(error); });
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

  static update(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            username: req.body.username || user.username,
            email: req.body.email || user.email,
            password: req.body.password || user.password,


          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      });
  }

  static login(req, res) {
    return User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(403).json({
            message: 'Invalid user',
          });
        }
        bcrypt.compare(req.body.password, user.password, (err, matched) => {
          if (err) {
            return res.status(401).json({
              message: 'Invalid credentials',
            });
          }
          if (!matched) {
            return res.json('password or email is incorrect');
          }
          const token = jwt.sign({ userId: user.id, roleId: user.roleId }, secretKey, { expiresIn: '24h' });
          return res.status(200).json({
            message: 'Login Successful',
            token,
            expiresIn: '24h'
          });
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(401).send({
          message: 'invalid'
        });
      });

  }
  static logout(req, res) {
    res.status(200).send({
      message: 'You were logged out successfully'
    });
  }

  static search(req, res) {
    return User
      .findAll({
        where: {
          email: {
            $like: `%${req.query.q}%`
          }
        }

          .then(response => res.status(200).send(response))
          .catch(error => res.status(400).send(error))
      });
  }
}

module.exports = UserController;
