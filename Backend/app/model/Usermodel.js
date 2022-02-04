const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userschema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true }

}, { collection: 'Users' })

const Usermodel = mongoose.model('Users', userschema);

module.exports = Usermodel