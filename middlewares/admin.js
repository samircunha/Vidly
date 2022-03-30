module.exports = function (req, res, next) {
    const isAdmin = req.user.idAdmin;
    if(!isAdmin) return res.status(403).send("Access denied.");

    next();
}