//Llamar orm
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema de base de datos
var inventarioSchema = Schema({
    recibido: Number,
    disponible: Number,
    producto:{
        type: Schema.Types.ObjectId,
        ref: "Producto",
        requiered: true
    }
},{timestamps: true});

var InventarioModel = mongoose.model("Inventario", inventarioSchema);

module.exports = InventarioModel;