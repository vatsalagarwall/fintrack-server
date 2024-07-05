const express = require('express')
const { addTransaction, getAllTransactions, editTransaction, deleteTransaction } = require('../controllers/transactionCtrl')


//router object
const router = express.Router()



//routes
//add transactions
router.post('/add-transaction', addTransaction)

//edit transactions
router.post('/edit-transaction', editTransaction)

//Delete transaction
router.post("/delete-transaction", deleteTransaction);



//get transactions
router.post('/get-transaction', getAllTransactions)


module.exports = router