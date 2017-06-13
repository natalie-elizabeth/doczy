const { User, Role } = require('models');

class RoleController {

  static create(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(500).json({
        error: 'Missing required field',
        errors: ['Missing require field name']
      });
    }

    return Role.create({ name })
      .then(role => res.status(201).json(role))
      .catch(error => {
        console.log(error)
        res.status(400).json(error)
      });
  }
  static list(req, res) {
    return Role
      .all()
      .then(roles => res.status(201).send(roles))
      .catch(error => res.status(400).send(error));

  }

  static listall(req, res) {
    return Role
      .findAll({
        include: [{
          model: User,
          as: 'users',
        }],
      })
      .then(roles => res.status(201).send(roles))
      .catch(error => res.status(400).send(error));
  }
  static retrieve(req, res) {
    return Role
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'users'
        }]
      })
      .then(role => {
        if (!role) {
          res.status(404).send({
            message: 'Role Not Found'
          });
        }
        return res.status(201).json(role);
      })
      .catch(error => { res.status(400).json(error) });
  }

  static update(req, res) {
    return res.json({ message: "ddduuuuh" })
  }

  static delete(req, res) {
    return Role
      .findById(req.params.id)
      .then(role => {
        if (!role) {
          res.status(404).send({ message: "Role not found" });
        }
        return role
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}

module.exports = RoleController;

