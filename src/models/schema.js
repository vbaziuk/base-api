'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const model = new Schema({
//     name: { type: String, required: true, index: { unique: true } },
//     password: { type: String, require: true }
// })

const model = new Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('Model', model);
// module.exports = mongoose.model('Alt', altModel);