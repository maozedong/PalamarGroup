"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    roles: [String]
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('User', UserSchema);
//# sourceMappingURL=user.js.map