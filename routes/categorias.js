var express = require('express');
var router = express.Router();

const CategoriaService = require('../services/categoriaService')

router.post("/Add", CategoriaService.save);

router.put("/Update", CategoriaService.update);

router.get("/FindAll", CategoriaService.findAll);

module.exports = router;