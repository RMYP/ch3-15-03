const express = require('express');
const router = express.Router()
const app = express()
const customerController = require("../controllers/customerController")

app.get('/', customerController.defaultRoute)
router.route('/').post(customerController.createCustomer).get(customerController.getAllCustomer)
router.route('/:id').get(customerController.getCustomersById).patch(customerController.updateCustomersById).delete(customerController.deteleCustomersById)

module.exports = router;