function adminAuth(req, res, next) {
  if (req.session.user != undefined) {
    res.locals.loggedinUser = req.session.user;
    next();
  }
  else {
    res.redirect('/login');
  }
}

module.exports = adminAuth;