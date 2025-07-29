const express = require('express');
const { getElephantLocations } = require('../controllers/elephantController');

const router = express.Router();

router.get('/', getElephantLocations); // GET /api/elephants

module.exports = router;
