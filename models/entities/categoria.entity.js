//Llamar orm
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema de base de datos
var categoraiSchema = Schema({
    id: String,
    nombre: String,
    producto:[{
        type: Schema.Types.ObjectId,
        ref: "Producto",
        requiered: true
    }]
},{timestamps: true});

var CategoriaModel = mongoose.model("Categoria", categoraiSchema);

module.exports = CategoriaModel;