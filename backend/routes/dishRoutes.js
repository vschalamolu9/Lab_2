const express = require('express')
const router = express.Router()
const { getDishById, addNewDish, updateDish, deleteDish } = require('../controllers/dishController')
const protect = require('../middleware/authMiddleWare')

router.route('/:id').get(getDishById)

router.route('/addDish').post(protect, addNewDish)

router.route('/updateDish').put(protect, updateDish)

router.route('/delete/:id').delete(protect, deleteDish)

module.exports = router