function musicHomePage(req, res, next) {
  res.status(200).render("base");
}

module.exports = { musicHomePage };
