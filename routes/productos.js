var express = require('express');
var router = express.Router();

const ProductoService = require('../services/productosService')

router.post("/Add", ProductoService.save);

router.get("/FindAll", ProductoService.findAll);

router.delete("/Delete", ProductoService.delete);

module.exports = router;