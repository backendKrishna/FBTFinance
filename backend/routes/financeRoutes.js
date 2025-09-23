// const express = require('express');
// const { protect, adminOnly } = require('../middleware/authMiddleware');

// const {
//   addIncome, getIncomes, updateIncome, deleteIncome,
//   addExpense, getExpenses, updateExpense, deleteExpense,
//   getFinanceSummary, downloadFinanceExcel
// } = require('../controllers/financeController');

// const router = express.Router();

// // only admins may use these endpoints
// router.post('/income', protect, adminOnly, addIncome);
// router.get('/incomes', protect, adminOnly, getIncomes);
// router.put('/income/:id', protect, adminOnly, updateIncome);
// router.delete('/income/:id', protect, adminOnly, deleteIncome);

// router.post('/expense', protect, adminOnly, addExpense);
// router.get('/expenses', protect, adminOnly, getExpenses);
// router.put('/expense/:id', protect, adminOnly, updateExpense);
// router.delete('/expense/:id', protect, adminOnly, deleteExpense);

// router.get('/summary', protect, adminOnly, getFinanceSummary);
// router.get('/download/excel', protect, adminOnly, downloadFinanceExcel);

// module.exports = router;


//==============*=================

const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  addIncome,
  addExpense,
  getIncomes,
  getExpenses,
  getFinanceSummary,
  updateIncome,
  deleteIncome,
  updateExpense,
  deleteExpense,
  downloadFinanceExcel,
} = require('../controllers/financeController');
const router = express.Router();

// Public routes (admin and guest, view only)
router.get('/incomes', protect, getIncomes);
router.get('/expenses', protect, getExpenses);
router.get('/summary', protect, getFinanceSummary);
router.get('/download', protect, downloadFinanceExcel);

// Admin-only routes (add, update, delete)
router.post('/incomes', protect, adminOnly, addIncome);
router.post('/expenses', protect, adminOnly, addExpense);
router.put('/incomes/:id', protect, adminOnly, updateIncome);
router.delete('/incomes/:id', protect, adminOnly, deleteIncome);
router.put('/expenses/:id', protect, adminOnly, updateExpense);
router.delete('/expenses/:id', protect, adminOnly, deleteExpense);

module.exports = router;