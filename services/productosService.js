let produtoSchema = require('../models/entities/producto.entity')
let CategoriaSchema = require('../models/entities/categoria.entity');
var jwt = require('jsonwebtoken');
/**
 * continee la logica del producto
 */
let ProductoServices = {
    //se usa para registrar productos
    save: async (req, res) => {
        const accesToken = req.headers['authorization']
        isRegister = false
        if (accesToken) {
            jwt.verify(accesToken, 'keyStore', (err) => {
                if (err) {
                    res.send("Token no valido");
                }
                else {

                    isRegister = true
                }
            })
        } else {
            res.send({
                mensaje: "sin token"
            })
        }

        if (isRegister) {
            let newProducto = new produtoSchema({

                nombre: req.body.nombre,
                SKU: req.body.SKU,
                categoria: req.body.categoria
            });
            await newProducto.save();
            console.log("registrar producto")
            /**
             * registrar categoria
             */
            let categoria = await CategoriaSchema.findById({ _id: newProducto.categoria })

            console.log(categoria)

            categoria.producto = newProducto
            await categoria.save()

            res.send({
                status: 201,
                message: "Producto registrado con exito!",
                Producto: newProducto
            })
        }
    },
    //Consultar todos los productos
    findAll: async (req, res) => {
        try {
            let productos = await produtoSchema.find().populate('categoria', 'nombre').
                populate('inventario');
            const accesToken = req.headers['authorization']
            if (accesToken) {
                jwt.verify(accesToken, 'keyStore', (err) => {
                    if (err) {
                        res.send("Token no valido");
                    }
                    else {


                        res.send({
                            status: 200,
                            Productos: productos
                        })
                    }
                })
            } else {
                res.send({
                    mensaje: "sin token"
                })
            }

        } catch (error) {
            console.log(error)
            res.send({
                status: 500,
                Error: error
            })
        }

    },
    delete: async (req, res) => {
        isRegister = false
        try {
            const accesToken = req.headers['authorization']
            if (accesToken) {
                jwt.verify(accesToken, 'keyStore', (err) => {
                    if (err) {
                        res.send("Token no valido");
                    }
                    else {

                        isRegister = true


                    }
                })
            } else {
                res.send({
                    mensaje: "sin token"
                })
            }

            if (isRegister) {
                console.log(req.body.id)
                let producto = await produtoSchema.findById({ _id: req.body.id })

                console.log(producto)

                await producto.remove(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({ status: 200, message: "producto eliminado" });
                    }
                });
            }

        } catch (error) {
            console.log(error)
            res.send({
                status: 500,
                Error: error
            })
        }


    }
}

module.exports = ProductoServices;