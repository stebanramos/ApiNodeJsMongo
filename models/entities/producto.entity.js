//Llamar orm
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema de base de datos
var productoSchema = Schema({
    nombre: String,
    SKU: String,
    isDisponible: Boolean,
    inventario: {
        type: Schema.Types.ObjectId,
        ref: "Inventario",
        requiered: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        requiered: true
    }

}, {timestamps: true});

var ProductoModel = mongoose.model("Producto", productoSchema);

module.exports = ProductoModel;