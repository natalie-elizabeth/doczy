const { User, Document } = require('../../models');

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


  static listall(req, res) {
    let query = {};
    if (req.query.limit && req.query.offset) {
      query.limit = req.query.limit;
      query.offset = req.query.offset;
    }
    if (req.roleId !== 1) {
      query.where = {
        access: 'public',
        user_id: req.userId
      };
    }
    return Document.findAll(query)
      .then(documents => res.status(200).json(documents))
      .catch(error => res.status(404).json(error));

  }
  //   if(isPublic) {
  //     query.where = {
  //       access: 'public'
  //     };
  //   }
  //       return Document.findAll(query)
  //   .then(response => res.status(200).send(response))
  //   .catch(error => res.status(400).send(error));
  //     };
  // const roles = ['', 'admin', 'user', 'success', 'learning'];
  // let query = {};



  // if (req.roleId !== 2 && req.roleId !== 1) { // user - other roles have been defined
  //   query.where = {
  //     access: roles[req.roleId + 1] // careful with indexes
  //   };
  // }

  // if (req.roleId == 1) { // user
  //   query.where = {
  //     user_id: req.userId,
  //     access: 'public'
  //   };
  // }

  // // if (req.query.limit || req.query.offset) {
  // return Document.findAll(query)
  //   .then(documents => res.status(200).json(documents))
  //   .catch(error => res.status(404).json(error));
  //     // }
  //     // Document.all()
  //     //   .then(documents => res.status(200).json(documents))
  //     //   .catch(error => res.status(404).json(error));
  //   }

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
