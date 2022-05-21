let userSchema = require('../models/entities/user.entity');
var jwt = require('jsonwebtoken');

let userService = {

    save: async (req, res) => {
        let newUser = new userSchema(req.body);
        let savedUser = await newUser.save();

        res.send({
            status: 201,
            message: "Usuario creado con exito!",
            User: savedUser
        })
    },
    update: async (req, res) => {
        let user = await userSchema.findById(req.body.id_user)
        user.password = req.body.newPassword
        await user.save()
        res.send({
            status: 201,
            message: "Usuario actualizado con exito",
            User: user
        })
    },
    auth: async (req, res) => {
        let body = req.body;
        const { username, password } = req.body;
        const user = {username};
        let userFind = await userSchema.findOne(req.body)
        console.log(username);
        console.log(password);
        console.log(userFind);
        if (userFind == null) {
            res.send("Usuario no existe");
        }
        else {
            console.log("user ", username);
            console.log("pass ", password);
            if (userFind.username == username && userFind.password == password) {
                console.log(userFind.password, password);
                //generar token
                const tokenAuth = tokenGenerator(user);
                res.send({
                    status: 200, message: 'Usuario autenticado:',
                    token: tokenAuth,
                    rol: userFind.rol
                })
            }
            else {
                res.send("Usuario y/o contraseña incorrectos");
            }
        }
    }
}

function tokenGenerator(user) {
    return jwt.sign(user, 'keyStore', { expiresIn: '30m' });
}

module.exports = userService;