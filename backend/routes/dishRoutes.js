const express = require('express')
const router = express.Router()
const { getDishById } = require('../controllers/dishController')

router.route('/:id').get(getDishById)

module.exports = router