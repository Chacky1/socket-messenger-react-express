/* eslint-disable class-methods-use-this */
class RoomsMiddleware {
  checkBodyRequest(req, res, next) {
    if (req.body && req.body.name && req.body.userId) {
      next();
    } else {
      res.status(400).send({ message: 'Some informations are missing.' });
    }
  }
}

module.exports = new RoomsMiddleware();
