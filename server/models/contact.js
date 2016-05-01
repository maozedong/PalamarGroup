"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ContactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    photo: String,
    address: String
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('Contact', ContactSchema);
//# sourceMappingURL=contact.js.map