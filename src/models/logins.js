'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const model = new Schema({
//     name: { type: String, required: true, index: { unique: true } },
//     password: { type: String, require: true }
// })

const model = new Schema({
    account: { type: String, default:"login" },
    login: {
        user: { type: String },
        pass: { type: String }
    }
});

module.exports = mongoose.model('Model2', model);