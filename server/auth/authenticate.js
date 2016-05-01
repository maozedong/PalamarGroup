"use strict";
var jwt = require('jsonwebtoken');
var config_1 = require('../config');
function authenticate(req, res, next) {
    //TODO: only for development, remove!!!
    if (config_1.default.env === 'dev')
        return next();
    // TODO: only for development, remove!!!
    var token = req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config_1.default.appSecret, function (err, decoded) {
            if (err) {
                return res.status(403).send();
            }
            else {
                // if everything is good, save to request for use in other routes
                req.user = decoded;
                next();
            }
        });
    }
    else {
        // if there is no token return an error
        return res.status(403).send();
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authenticate;
//# sourceMappingURL=authenticate.js.map