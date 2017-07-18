const { User, Document, Role } = require('../../models');

class DocumentController {

  static create(req, res) {
    Document.create({
      user_id: req.userId,
      content: req.body.content,
      title: req.body.title,
      access: req.body.access
    })
      .then(doc => res.status(201).json(doc))
      .catch(error => {
        res.status(400).json(error);
      });
  }


  static listAll(req, res) {
    const { limit, offset, access } = req.query;
    console.log('User ID>>>>', req.userId, req.roleId);
    let roleName;
    Role.findOne({
      where: {
        id: req.roleId
      }
    }).then(role => {
      roleName = role.role_name;
      return new Promise((resolve, reject) => (resolve(roleName))).then(roleName => {
        const query = { limit, offset, where: { $or: [{ access: 'public' }, { access: roleName }, { user_id: req.userId }] } };
        return Document.findAll(query)
          .then(documents => res.status(200).json(documents))
          .catch(error => res.status(500).json(error));
      });
    });
  }

  static search(req, res) {
    return Document
      .findAll({
        where: {
          title: { $ilike: `%${req.query.q}%` }
        }
      })
      .then(response => {
        res.status(200).json(response);
      }
      )
      .catch(error => res.status(400).json(error));
  }


  static retrieve(req, res) {
    return Document
      .findById(req.params.id)
      .then(doc => {
        if (!doc) {
          res.status(404).send({
            message: 'Document Not Found'
          });
        }
        return res.status(200).json(doc);
      });
  }

  static delete(req, res) {
    return Document
      .findById(req.params.id)
      .then(document => {
        if (!document) {
          res.status(404).send({ message: "Document not found" });
        }
        return document
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(document));
      })
      .catch(error => res.status(400).send(error));
  }

  static update(req, res) {
    return Document
      .findById(req.params.id)
      .then(document => {
        console.log(">>>>>>>>>>>>>>>>>>>>> ", document);
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        return document
          .update({
            title: req.body.title || document.title,
            content: req.body.content || document.content,
            access: req.body.access || document.access,

          })
          .then(() => res.status(200).send(document))
          .catch((error) => res.status(400).send(error));
      });
  }
}

module.exports = DocumentController;
