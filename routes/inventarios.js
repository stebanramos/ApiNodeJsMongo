var express = require('express');
var router = express.Router();

const InventarioService = require('../services/inventarioService')

router.post("/Add", InventarioService.save);

router.put("/Update", InventarioService.update);

module.exports = router;