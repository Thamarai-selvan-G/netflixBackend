var express = require('express');
var router = express.Router();
let vendorAccount = require('../Controller/vendor.controller')
const vendorMiddleware = require('../middle_ware/vendorMiddleware')

router.post('/create',vendorAccount.createVendor)
router.get('/viewall',vendorAccount.viewAll)
router.get('/viewid/:id',vendorAccount.viewId)
router.put('/update/:id',vendorAccount.updateId)
router.delete('/deletedata/:id',vendorAccount.deletedata)
router.post('/login',vendorAccount.loginId)
router.delete('/deleteuser',vendorAccount.delectAcc)

module.exports = router;
