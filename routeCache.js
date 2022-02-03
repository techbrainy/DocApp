const NodeCache = require("node-cache");
const cache = new NodeCache();

module.exports = duration => (req, res, next) => {
    if (req.method != 'GET') {
        console.log('cannot cache non-get methods')

        return next();
    }


    const key = req.originalUrl;
    const CR = cache.get(key);

    if (CR) {
        console.log(`Cache hit for ${key}`)
        res.send(CR);
    } else {
        console.log(`Cache miss for ${key}`)
        res.originalSend = res.send;
        res.send = body => {
            res.originalSend(body);
            cache.set(key, body, duration);
        };
        next();
    }
};