let InventarioSchema = require('../models/entities/inventario.entity');
let ProductoSchema = require('../models/entities/producto.entity');
var jwt = require('jsonwebtoken');

/**
 * continee la logica del inventario
 */
let InventarioService = {
    /**
     * se usa para registrar inventario
     */
    save: async (req, res) => {

        try {
            const accesToken = req.headers['authorization']
            var isRegister = false;
            if (accesToken) {
                jwt.verify(accesToken, 'keyStore', (err) => {
                    if (err) {
                        res.send("Token no valido");
                    }
                    else {

                        isRegister = true;
                    }
                })
                if (isRegister) {
                    let newInventario = new InventarioSchema({

                        recibido: req.body.recibido,
                        disponible: req.body.recibido,
                        producto: req.body.producto
                    });
                    await newInventario.save();
                    console.log("registrar producto")
                    /**
                     * registrar producto
                     */
                    let producto = await ProductoSchema.findById({ _id: newInventario.producto })

                    console.log(producto)

                    producto.inventario = newInventario
                    producto.isDisponible = true
                    await producto.save()

                    res.send({
                        status: 201,
                        message: "Registrado con exito!"
                    })
                }
            } else {
                res.send({
                    mensaje: "sin token"
                })
            }


        } catch (error) {
            console.log(error)
            res.send({ status: 500, message: "Error al registrar", Error: error })
        }

    },

    update: async (req, res) => {

        try {

            const accesToken = req.headers['authorization']
            var isRegister = false;
            if (accesToken) {
                jwt.verify(accesToken, 'keyStore', (err) => {
                    if (err) {
                        res.send("Token no valido");
                    }
                    else {

                        isRegister = true;
                    }
                })
                if (isRegister) {
                    let cantidad = req.body.cantidad

                    let producto = await ProductoSchema.findById(req.body.id_producto).populate("inventario")
                    disponible = producto.inventario.disponible
                    console.log(cantidad)
                    console.log(disponible)

                    if (disponible == 0) {
                        res.send({
                            status: 201,
                            message: "Inventario en 0"
                        })
                    } else {
                        if (disponible < cantidad) {
                            res.send({
                                status: 201,
                                message: "supera la disponibilidad"
                            })
                        } else {

                            producto.inventario.disponible = disponible - cantidad

                            await producto.save()
                            var inventario = await InventarioSchema.findById(producto.inventario._id)
                            inventario.disponible = disponible - cantidad

                            inventario.save()

                            res.send({
                                status: 201,
                                message: "Actualizado con exito!",
                                Producto: producto
                            })
                        }
                    }
                }
            } else {
                res.send({
                    mensaje: "sin token"
                })
            }

        } catch (error) {
            console.log(error)

        }

    }

}

module.exports = InventarioService;