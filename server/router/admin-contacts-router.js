const express = require('express');
const getAllContacts = require('../controllers/admin-contacts-controller');
const router = express.Router();

router.route('/contacts').get(getAllContacts);

module.exports = router;