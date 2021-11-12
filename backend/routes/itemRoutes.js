const express = require('express')
const router = express.Router()
const { getMenuItemById } = require('../controllers/itemController')

router.route('/:id').get(getMenuItemById)

module.exports = router