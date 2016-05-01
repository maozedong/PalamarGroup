"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PhotoSchema = new Schema({
    name: String,
    url: String,
    order: Number
});
var VideoSchema = new Schema({
    name: String,
    url: String,
    order: Number
});
var CourseSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    order: Number,
    videos: [VideoSchema],
    hearFormsPhotos: [PhotoSchema],
    historyPhotos: [PhotoSchema],
    author: {
        name: String,
        photoUrl: String
    },
    courseModulesDates: [Date],
    isVisible: Boolean
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('Course', CourseSchema);
//# sourceMappingURL=course.js.map