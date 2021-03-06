const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const secretKey = process.env.SECRET_KEY || 'some secret';

const { User, Document } = require('../../models');

module.exports = {
  create(req, res) {
    const { username, firstname, lastname, email, password } = req.query;
    const role_id = 2;

    if (!username || !firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: 'Missing required field' });
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.query.email)
    ) {
      return res
        .status(400)
        .json({ message: 'Please Enter A Valid Email Address' });
    }
    User.create({
      username,
      firstname,
      lastname,
      email,
      password,
      role_id
    })
      .then(user => {
        const token = jwt.sign({ userId: user.id, role_id }, secretKey, {
          expiresIn: '24h'
        });
        let data = {
          firstname,
          lastname,
          username,
          email,
          token
        };
        console.log(res, 'winter is here');
        return res.status(201).json(data);
      })
      .catch(error => {
        console.log('here is the culprit', error);
        return res.sendStatus(400).json(error);
      });
  },

  login(req, res) {
    return User.findOne({
      where: {
        email: req.query.email
      }
    })
      .then(user => {
        if (!user) {
          return res.status(403).json({
            message: 'Invalid user'
          });
        }
        bcrypt.compare(req.query.password, user.password, (err, matched) => {
          if (err) {
            return res.status(401).json({
              message: 'Invalid credentials'
            });
          }
          if (!matched) {
            return res.json('password or email is incorrect');
          }
          const token = jwt.sign(
            { userId: user.id, roleId: user.role_id },
            secretKey,
            { expiresIn: '24h' }
          );
          return res.status(200).json({
            message: 'Login Successful',
            token,
            expiresIn: '24h'
          });
        });
      })
      .catch(error => {
        console.log(error);
        res.status(401).send({
          message: 'invalid'
        });
      });
  },

  seeall(req, res) {
    if (req.query.limit || req.query.offset) {
      return User.findAll({ limit: req.query.limit, offset: req.query.offset })
        .then(users => res.status(200).json(users))
        .catch(error => res.status(404).json(error));
    }
    User.all()
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error));
  },

  listall(req, res) {
    return User.findAll({
      include: [
        {
          model: Document,
          as: 'documents'
        }
      ]
    })
      .then(users => res.status(200).json(users))
      .catch(error => res.status(404).send(error));
  },

  retrieve(req, res) {
    return User.findById(req.params.id, {
      include: [
        {
          model: Document,
          as: 'documents'
        }
      ]
    })
      .then(user => {
        if (!user) {
          res.status(404).send({
            message: 'User Not Found'
          });
        }
        return res.status(200).json(user);
      })
      .catch(error => {
        res.status(400).json(error);
      });
  },

  delete(req, res) {
    return User.findById(req.params.id)
      .then(user => {
        if (!user) {
          res.status(404).send({ message: 'User not found' });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(user));
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return User.findById(req.params.id).then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found'
        });
      }
      return user
        .update({
          username: req.body.username || user.username,
          email: req.body.email || user.email,
          password: req.body.password || user.password
        })
        .then(() => res.status(200).send(user))
        .catch(error => res.status(400).send(error));
    });
  },

  logout(req, res) {
    res.status(200).send({
      message: 'You were logged out successfully'
    });
  },

  search(req, res) {
    if (req.query.q) {
      return user
        .findAll({
          where: {
            $or: [
              { firstname: { $like: `%${req.query.q}%` } },
              { lastname: { $like: `%${req.query.q}%` } },
              { username: { $like: `%${req.query.q}%` } },
              { email: { $like: `%${req.query.q}%` } }
            ]
          }
        })
        .then(response => res.status(200).send(response))
        .catch(error => res.status(400).send(error));
    }
  }
};
