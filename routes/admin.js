var express = require('express');
var router = express.Router();
const adminController = require('../Controller/admin.controller')

router.post('/create',adminController.createAdmin)

module.exports = router;
