function isAuth(req, res, next) {
  const user = req.session?.user;
  if (user) {
    return next();
  }
  return res.redirect('/');
}

module.exports = isAuth;
