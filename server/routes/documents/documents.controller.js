const { User, Document } = require('models');

class DocumentController {

  static create(req, res) {
    const { title, content, access, user_id } = req.body;

    if (!title || !content || !access) {
      return res.status(500).json({
        error: 'Missing required field',
        errors: ['Missing require field name']
      });
    }
    return Document.create({ title, content, access, user_id })
      .then(doc => res.status(201).json(doc))
      .catch(error => {
        console.log(error)
        res.status(400).json(error)
      });

  }

  static listall(req, res) {
    return Document
      .findAll()
      .then(roles => res.status(200).send(roles))
      .catch(error => res.status(400).send(error));
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
        return res.status(201).json(doc);
      })
      .catch(error => { res.status(400).json(error) });
  }

}
module.exports = DocumentController;
