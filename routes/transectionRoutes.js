const express = require('express');
const { addTransection, getAllTransection, editTransection } = require('../controllers/transectionController');


//router object
const router = express.Router();

//routers
//add transenction
router.post('/add-transection', addTransection)

//get transections
router.post('/get-transection', getAllTransection)

//edit transection
router.post('/edit-transection', editTransection)


module.exports = router