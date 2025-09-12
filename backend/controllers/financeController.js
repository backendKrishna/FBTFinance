// const Income = require('../models/Income');
// const Expense = require('../models/Expense');
// const ExcelJS = require('exceljs');
// // Add new income


// const addIncome = async (req, res) => {
//   try {
//     const { title, type, amount, date, category } = req.body;
//     const income = new Income({
//       title,
//       type,
//       amount,
//       date,
//       category,
//       user: req.user.id,
//     });
//     await income.save();
//     res.status(201).json({ success: true, income });
    
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };



// const addExpense = async (req, res) => {
//   try {
//     const { title, type, amount, date, category } = req.body;
//     const expense = new Expense({  
//       title,
//       type,
//       amount,
//       date,
//       category,
//       user: req.user.id,
//     });
//     await expense.save();
//     res.status(201).json({ success: true, expense });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };


// // Get all incomes
// const getIncomes = async (req, res) => {
//   try {
//     const incomes = await Income.find().sort({ date: -1 });
//     res.json(incomes);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all expenses
// const getExpenses = async (req, res) => {
//   try {
//     const expenses = await Expense.find().sort({ date: -1 });
//     res.json(expenses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Summary: total income, total expense, balance
// const getFinanceSummary = async (req, res) => {
//   try {
//     const incomes = await Income.find();
//     const expenses = await Expense.find();

//     const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
//     const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
//     const balance = totalIncome - totalExpense;

//     res.json({ totalIncome, totalExpense, balance });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// // Update income
// const updateIncome = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const income = await Income.findByIdAndUpdate(id, req.body, { new: true });
//     if (!income) return res.status(404).json({ message: 'Income not found' });
//     res.json({ message: 'Income updated', income });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete income
// const deleteIncome = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const income = await Income.findByIdAndDelete(id);
//     if (!income) return res.status(404).json({ message: 'Income not found' });
//     res.json({ message: 'Income deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update expense
// const updateExpense = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const expense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
//     if (!expense) return res.status(404).json({ message: 'Expense not found' });
//     res.json({ message: 'Expense updated', expense });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete expense
// const deleteExpense = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const expense = await Expense.findByIdAndDelete(id);
//     if (!expense) return res.status(404).json({ message: 'Expense not found' });
//     res.json({ message: 'Expense deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// // const downloadFinanceExcel = async (req, res) => {
// //   try {
// //     const incomes = await Income.find().sort({ date: -1 });
// //     const expenses = await Expense.find().sort({ date: -1 });

// //     const workbook = new ExcelJS.Workbook();
// //     const worksheet = workbook.addWorksheet('Finance Report');

// //     // Headers
// //     worksheet.columns = [
// //       { header: 'Type', key: 'type', width: 15 },
// //       { header: 'Title', key: 'title', width: 30 },
// //       { header: 'Amount (₹)', key: 'amount', width: 15 },
// //       { header: 'Date', key: 'date', width: 20 }
// //     ];

// //     // Income rows
// //     incomes.forEach(i => {
// //       worksheet.addRow({
// //         type: 'Income',
// //         title: i.title,
// //         amount: i.amount,
// //         date: new Date(i.date).toLocaleDateString()
// //       });
// //     });

// //     // Expense rows
// //     expenses.forEach(e => {
// //       worksheet.addRow({
// //         type: 'Expense',
// //         title: e.title,
// //         amount: e.amount,
// //         date: new Date(e.date).toLocaleDateString()
// //       });
// //     });

// //     // Styling header
// //     worksheet.getRow(1).eachCell(cell => {
// //       cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
// //       cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2E86C1' } };
// //     });

// //     res.setHeader(
// //       'Content-Disposition',
// //       'attachment; filename="finance_report.xlsx"'
// //     );
// //     res.setHeader(
// //       'Content-Type',
// //       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
// //     );

// //     await workbook.xlsx.write(res);
// //     res.end();
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// const downloadFinanceExcel = async (req, res) => {
//   try {
//     const incomes = await Income.find().sort({ date: -1 });
//     const expenses = await Expense.find().sort({ date: -1 });

//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Finance Report');

//     // Headers
//     worksheet.columns = [
//       { header: 'Type', key: 'type', width: 15 },
//       { header: 'Title', key: 'title', width: 30 },
//       { header: 'Category', key: 'category', width: 20 },   // ✅ Added category
//       { header: 'Amount (₹)', key: 'amount', width: 15 },
//       { header: 'Date', key: 'date', width: 20 }
//     ];

//     // Income rows
//     incomes.forEach(i => {
//       worksheet.addRow({
//         type: 'Income',
//         title: i.title,
//         category: i.category || '-',   // ✅ handle empty category
//         amount: i.amount,
//         date: new Date(i.date).toLocaleDateString()
//       });
//     });

//     // Expense rows
//     expenses.forEach(e => {
//       worksheet.addRow({
//         type: 'Expense',
//         title: e.title,
//         category: e.category || '-',   // ✅ handle empty category
//         amount: e.amount,
//         date: new Date(e.date).toLocaleDateString()
//       });
//     });

//     // Styling header row
//     worksheet.getRow(1).eachCell(cell => {
//       cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
//       cell.fill = {
//         type: 'pattern',
//         pattern: 'solid',
//         fgColor: { argb: 'FF2E86C1' }
//       };
//     });

//     res.setHeader(
//       'Content-Disposition',
//       'attachment; filename="finance_report.xlsx"'
//     );
//     res.setHeader(
//       'Content-Type',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     );

//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { addIncome, addExpense, getIncomes, getExpenses, getFinanceSummary ,  updateIncome,
//   deleteIncome,
//   updateExpense,
//   deleteExpense, downloadFinanceExcel};

//---------------------------------


const Income = require('../models/Income');
const Expense = require('../models/Expense');
const ExcelJS = require('exceljs');

// ✅ Add new income
const addIncome = async (req, res) => {
  try {
    const { title, type, amount, date, category } = req.body;
    if (!title || !amount || !date) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const income = new Income({
      title,
      type,
      amount,
      date,
      category,
      user: req.user.id
    });

    await income.save();
    res.status(201).json({ success: true, income });
  } catch (err) {
    console.error("❌ Error adding income:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// ✅ Add new expense
const addExpense = async (req, res) => {
  try {
    const { title, type, amount, date, category } = req.body;

    // 🔹 Basic validation
    if (!title || !amount || !date) {
      return res.status(400).json({
        success: false,
        message: "Title, amount, and date are required"
      });
    }

    // 🔹 Create expense
    const expense = new Expense({
      title,
      type,
      amount,
      date,
      category,
      user: req.user.id,   // needs authentication middleware to populate req.user
    });

    // 🔹 Save to DB
    await expense.save();

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      expense
    });

  } catch (err) {
    console.error("❌ Error adding expense:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// ✅ Get incomes with filters
const getIncomes = async (req, res) => {
  try {
    const { month, year, type, category } = req.query;
    let filter = { user: req.user.id };

    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      filter.date = { $gte: start, $lte: end };
    }

    if (type) filter.type = type;
    if (category) filter.category = category;

    const incomes = await Income.find(filter).sort({ date: -1 });
    res.json({ success: true, incomes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get expenses with filters
const getExpenses = async (req, res) => {
  try {
    const { month, year, type, category } = req.query;
    let filter = { user: req.user.id };

    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      filter.date = { $gte: start, $lte: end };
    }

    if (type) filter.type = type;
    if (category) filter.category = category;

    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json({ success: true, expenses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Finance Summary
const getFinanceSummary = async (req, res) => {
  try {
    const { month, year } = req.query;
    let dateFilter = {};

    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      dateFilter.date = { $gte: start, $lte: end };
    }

    const incomes = await Income.find({ user: req.user.id, ...dateFilter });
    const expenses = await Expense.find({ user: req.user.id, ...dateFilter });

    const totalIncome = incomes.reduce((acc, i) => acc + i.amount, 0);
    const totalExpense = expenses.reduce((acc, e) => acc + e.amount, 0);

    res.json({
      success: true,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Update income
const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!income) return res.status(404).json({ success: false, message: 'Income not found' });
    res.json({ success: true, message: 'Income updated', income });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Delete income
const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findOneAndDelete({ _id: id, user: req.user.id });
    if (!income) return res.status(404).json({ success: false, message: 'Income not found' });
    res.json({ success: true, message: 'Income deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Update expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!expense) return res.status(404).json({ success: false, message: 'Expense not found' });
    res.json({ success: true, message: 'Expense updated', expense });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Delete expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({ _id: id, user: req.user.id });
    if (!expense) return res.status(404).json({ success: false, message: 'Expense not found' });
    res.json({ success: true, message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Download Excel
const downloadFinanceExcel = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({ date: -1 });
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Finance Report');

    worksheet.columns = [
      { header: 'Type', key: 'type', width: 15 },
      { header: 'Title', key: 'title', width: 30 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Amount (₹)', key: 'amount', width: 15 },
      { header: 'Date', key: 'date', width: 20 }
    ];

    incomes.forEach(i => {
      worksheet.addRow({
        type: 'Income',
        title: i.title,
        category: i.category || '-',
        amount: i.amount,
        date: new Date(i.date).toLocaleDateString()
      });
    });

    expenses.forEach(e => {
      worksheet.addRow({
        type: 'Expense',
        title: e.title,
        category: e.category || '-',
        amount: e.amount,
        date: new Date(e.date).toLocaleDateString()
      });
    });

    worksheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2E86C1' } };
    });

    res.setHeader('Content-Disposition', 'attachment; filename="finance_report.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  addIncome,
  addExpense,
  getIncomes,
  getExpenses,
  getFinanceSummary,
  updateIncome,
  deleteIncome,
  updateExpense,
  deleteExpense,
  downloadFinanceExcel
};
