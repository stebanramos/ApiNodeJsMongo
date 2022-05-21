let CategoriaSchema = require('../models/entities/categoria.entity');
var jwt = require('jsonwebtoken');

/**
 * continee la logica del inventario
 */
let CategoriaService = {
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
                    console.log(req.body)

                    let newCategoria = new CategoriaSchema({

                        id: req.body.id,
                        nombre: req.body.nombre
                    });
                    await newCategoria.save();

                    res.send({
                        status: 201,
                        message: "Categoria registrada con exito!",
                        Categoria: newCategoria
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
                    let categoria = await CategoriaSchema.findById(req.body.id_categoria)
                    categoria.nombre = req.body.newNombre
                    await categoria.save()
                    res.send({
                        status: 201,
                        message: "Categoria actualizada con exito",
                        Categoria: categoria
                    })
                }
            } else {
                res.send({
                    mensaje: "sin token"
                })
            }

        } catch (error) {
            console.log(error)

        }

    },
    //Consultar todos las categorias
    findAll: async (req, res) => {
        try {
            let categorias = await CategoriaSchema.find();
            const accesToken = req.headers['authorization']
            if (accesToken) {
                jwt.verify(accesToken, 'keyStore', (err) => {
                    if (err) {
                        res.send("Token no valido");
                    }
                    else {
                        res.send({
                            status: 200,
                            Categorias: categorias
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

    }

}

module.exports = CategoriaService;