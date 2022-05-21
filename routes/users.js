var express = require('express');
var router = express.Router();

const userService = require('../services/userService')
//crear usuario
router.post("/Add", userService.save);
//actualizar usuario
router.put("/Update", userService.update);
//autenticar usuario
router.post("/Auth", userService.auth);

module.exports = router;
