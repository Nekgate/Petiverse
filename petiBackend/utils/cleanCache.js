const { clearHash } = require("./cache")


const cleanCache = async (req, res, next) => {
    await next();
    clearHash(req.userId);
}

module.exports = {
    cleanCache
}