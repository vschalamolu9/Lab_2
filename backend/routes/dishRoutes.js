const express = require('express')
const router = express.Router()
const { getDishById, addNewDish, updateDish, deleteDish } = require('../controllers/dishController')
const protect = require('../middleware/authMiddleWare')

router.route('/:id').get(getDishById)

router.route('/addDish').post(addNewDish)

router.route('/updateDish').put(updateDish)

router.route('/delete/:id').delete(deleteDish)

module.exports = router