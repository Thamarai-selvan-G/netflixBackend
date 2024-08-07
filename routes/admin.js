var express = require('express');
var router = express.Router();
const adminController = require('../Controller/admin.controller')

router.post('/create',adminController.adminCreate)
router.get('/viewall',adminController.findAll)
router.post('/login',adminController.loginAdmin)


module.exports = router;
