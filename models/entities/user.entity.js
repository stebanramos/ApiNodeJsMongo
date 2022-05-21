//Llamar orm
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema de base de datos
var userSchema = Schema({
    first_name: String,
    last_name: String,
    email: String,
    rol: String,
    username: String,
    password: String
});

var UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;