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
      .then(roles => res.status(200).json(roles))
      .catch(error => { console.log(error); res.status(400).json(error) });
  }
  static find(req, res) {
    return res.json({ message: "ddduuuuh" })
  }

  static update(req, res) {
    return res.json({ message: "ddduuuuh" })
  }

  static delete(req, res) {
    return Role
      .findById(req.params.roleId)
      .then(role => {
        if (!role) {
          res.status(404).send({ message: "user not found" });
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

