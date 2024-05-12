function locals(req, res, next) {
  if (req.session.user != undefined) {
    res.locals.loggedinUser = req.session.user;
  }

  next();
}

module.exports = locals;