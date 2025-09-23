
//----------------add filter tea,others expenses--------------



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";
// import {
//   FiTrendingUp,
//   FiDollarSign,
//   FiTrash2,
//   FiDownload,
//   FiLogOut,
//   FiEdit2,
//   FiCheck,
//   FiX,
// } from "react-icons/fi";

// // 🔹 Predefined types
// const TYPES = ["Flight", "Travel", "Packages", "Car Rental", "Others"];
// const OTHER_CATEGORIES = ["Tea", "Sugar", "Water Can", "Electric Bill", "Tissue Paper"];

// const Finance = () => {
//   const [summary, setSummary] = useState(null);
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [newIncome, setNewIncome] = useState({ type: "", category: "", title: "", amount: "" });
//   const [newExpense, setNewExpense] = useState({ type: "", category: "", title: "", amount: "" });
//   const [message, setMessage] = useState("");

//   const [editingIncome, setEditingIncome] = useState(null);
//   const [editingExpense, setEditingExpense] = useState(null);

//   const navigate = useNavigate();

//   const fetchData = async () => {
//     const summaryRes = await api.get("/finance/summary");
//     setSummary(summaryRes.data);
//     const incomesRes = await api.get("/finance/incomes");
//     setIncomes(incomesRes.data);
//     const expensesRes = await api.get("/finance/expenses");
//     setExpenses(expensesRes.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // 🔹 Logout (same as a.js)
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");

//     setMessage("✅ You have successfully logged out!"); // ✅ exact message from a.js
//     setTimeout(() => {
//       navigate("/login");
//     }, 1500);
//   };

//   // 🔹 Excel Download (copied from a.js)
//   const handleDownloadExcel = async () => {
//     const res = await api.get("/finance/download/excel", {
//       responseType: "blob",
//     });
//     const url = window.URL.createObjectURL(new Blob([res.data]));
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "finance_report.xlsx");
//     document.body.appendChild(link);
//     link.click();
//   };

//   // 🔹 Add Income
//   const handleAddIncome = async () => {
//     if (!newIncome.type || !newIncome.amount) return;
//     await api.post("/finance/income", { ...newIncome, amount: Number(newIncome.amount) });
//     setNewIncome({ type: "", category: "", title: "", amount: "" });
//     setMessage("✅ Income added successfully!");
//     setTimeout(() => setMessage(""), 1000); // auto-hide
//     fetchData();
//   };

//   // 🔹 Add Expense
//   const handleAddExpense = async () => {
//     if (!newExpense.type || !newExpense.amount) return;
//     await api.post("/finance/expense", { ...newExpense, amount: Number(newExpense.amount) });
//     setNewExpense({ type: "", category: "", title: "", amount: "" });
//     setMessage("✅ Expense added successfully!");
//     setTimeout(() => setMessage(""), 1000); // auto-hide
//     fetchData();
//   };

//   // 🔹 Delete
//   const handleDeleteIncome = async (id) => {
//     await api.delete(`/finance/income/${id}`);
//     fetchData();
//   };
//   const handleDeleteExpense = async (id) => {
//     await api.delete(`/finance/expense/${id}`);
//     fetchData();
//   };

//   // 🔹 Edit handlers
//   const startEditIncome = (income) => setEditingIncome({ ...income });
//   const cancelEditIncome = () => setEditingIncome(null);

//   const startEditExpense = (expense) => setEditingExpense({ ...expense });
//   const cancelEditExpense = () => setEditingExpense(null);

//   const saveEditIncome = async () => {
//     await api.put(`/finance/income/${editingIncome._id}`, editingIncome);
//     setEditingIncome(null);
//     fetchData();
//   };

//   const saveEditExpense = async () => {
//     await api.put(`/finance/expense/${editingExpense._id}`, editingExpense);
//     setEditingExpense(null);
//     fetchData();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Title Bar */}
//       <header className="bg-blue-700 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
//           <h1 className="text-2xl font-bold tracking-wide">FareBuzzer Finance Report</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto p-6 space-y-8">
//         {/* Success/Error Message */}
//         {message && (
//           <div className="bg-green-100 text-green-700 p-3 rounded-lg shadow">
//             {message}
//           </div>
//         )}

//         {/* Title + Excel Download */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//             <FiTrendingUp className="text-blue-600" /> Finance Dashboard
//           </h2>
//           <button
//             onClick={handleDownloadExcel}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
//           >
//             <FiDownload /> Download Excel
//           </button>
//         </div>
//         {/* Summary */}
//         {summary && (
//           <div className="grid grid-cols-3 gap-6 text-center">
//             <div className="p-4 bg-green-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Income</p>
//               <p className="text-xl font-bold text-green-600">
//                 ₹{summary.totalIncome.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-red-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Expenses</p>
//               <p className="text-xl font-bold text-red-600">
//                 ₹{summary.totalExpense.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-blue-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Balance</p>
//               <p className="text-xl font-bold text-blue-600">
//                 ₹{summary.balance.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Income Section */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg">
//           <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-green-500" /> Income
//           </h3>

//           <div className="flex gap-3 mb-4 flex-wrap">
//             <select
//               value={newIncome.type}
//               onChange={(e) => setNewIncome({ ...newIncome, type: e.target.value, category: "" })}
//               className="border p-2 rounded w-1/4"
//             >
//               <option value="">Select Type</option>
//               {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
//             </select>

//             {newIncome.type === "Others" && (
//               <select
//                 value={newIncome.category}
//                 onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
//                 className="border p-2 rounded w-1/4"
//               >
//                 <option value="">Select Category</option>
//                 {OTHER_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
//               </select>
//             )}

//             <input
//               type="text"
//               placeholder="Title"
//               value={newIncome.title}
//               onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
//               className="border p-2 rounded w-1/4"
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newIncome.amount}
//               onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
//               className="border p-2 rounded w-1/4"
//             />
//             <button onClick={handleAddIncome} className="bg-green-600 text-white px-4 rounded">
//               Add
//             </button>
//           </div>

//           {/* Income Table */}
//           <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
//             <thead className="bg-green-600 text-white">
//               <tr>
//                 <th className="p-3 text-left">Type</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3 text-left">Amount</th>
//                 <th className="p-3 text-left">Date</th>
//                 <th className="p-3 text-left">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {incomes.map((i) => (
//                 <tr key={i._id} className="border-b hover:bg-gray-50 transition">
//                   <td className="p-3">
//                     {editingIncome?._id === i._id ? (
//                       <input
//                         className="border p-1 rounded w-full"
//                         value={editingIncome.type}
//                         onChange={(e) =>
//                           setEditingIncome({ ...editingIncome, type: e.target.value })
//                         }
//                       />
//                     ) : (
//                       i.type
//                     )}
//                   </td>
//                   <td className="p-3">
//                     {editingIncome?._id === i._id ? (
//                       <input
//                         className="border p-1 rounded w-full"
//                         value={editingIncome.category || ""}
//                         onChange={(e) =>
//                           setEditingIncome({ ...editingIncome, category: e.target.value })
//                         }
//                       />
//                     ) : (
//                       i.category || "-"
//                     )}
//                   </td>
//                   <td className="p-3">
//                     {editingIncome?._id === i._id ? (
//                       <input
//                         className="border p-1 rounded w-full"
//                         value={editingIncome.title}
//                         onChange={(e) =>
//                           setEditingIncome({ ...editingIncome, title: e.target.value })
//                         }
//                       />
//                     ) : (
//                       i.title
//                     )}
//                   </td>
//                   <td className="p-3 text-green-600 font-semibold">
//                     {editingIncome?._id === i._id ? (
//                       <input
//                         className="border p-1 rounded w-full"
//                         type="number"
//                         value={editingIncome.amount}
//                         onChange={(e) =>
//                           setEditingIncome({ ...editingIncome, amount: e.target.value })
//                         }
//                       />
//                     ) : (
//                       `₹${i.amount}`
//                     )}
//                   </td>
//                   <td className="p-3">{new Date(i.date).toLocaleDateString()}</td>
//                   <td className="p-3 flex gap-2">
//                     {editingIncome?._id === i._id ? (
//                       <>
//                         <button
//                           onClick={saveEditIncome}
//                           className="text-green-600"
//                         >
//                           <FiCheck />
//                         </button>
//                         <button
//                           onClick={cancelEditIncome}
//                           className="text-red-600"
//                         >
//                           <FiX />
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => startEditIncome(i)}
//                           className="text-blue-600"
//                         >
//                           <FiEdit2 />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteIncome(i._id)}
//                           className="text-red-600"
//                         >
//                           <FiTrash2 />
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>


//           </table>
//         </div>

//         {/* Expenses Section */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg">
//           <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-red-500" /> Expenses
//           </h3>

//           <div className="flex gap-3 mb-4 flex-wrap">
//             <select
//               value={newExpense.type}
//               onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value, category: "" })}
//               className="border p-2 rounded w-1/4"
//             >
//               <option value="">Select Type</option>
//               {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
//             </select>

//             {newExpense.type === "Others" && (
//               <select
//                 value={newExpense.category}
//                 onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
//                 className="border p-2 rounded w-1/4"
//               >
//                 <option value="">Select Category</option>
//                 {OTHER_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
//               </select>
//             )}

//             <input
//               type="text"
//               placeholder="Title"
//               value={newExpense.title}
//               onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
//               className="border p-2 rounded w-1/4"
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newExpense.amount}
//               onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
//               className="border p-2 rounded w-1/4"
//             />
//             <button onClick={handleAddExpense} className="bg-red-600 text-white px-4 rounded">
//               Add
//             </button>
//           </div>

//           {/* Expense Table */}
//           <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
//             <thead className="bg-red-600 text-white">
//               <tr>
//                 <th className="p-3 text-left">Type</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3 text-left">Amount</th>
//                 <th className="p-3 text-left">Date</th>
//                 <th className="p-3 text-left">Action</th>
//               </tr>
//             </thead>
//             {/* <tbody>
//               {expenses.map((e) => (
//                 <tr key={e._id} className="border-b hover:bg-gray-50 transition">
//                   <td className="p-3">{e.type}</td>
//                   <td className="p-3">{e.category || "-"}</td>
//                   <td className="p-3">{e.title}</td>
//                   <td className="p-3 text-red-600 font-semibold">₹{e.amount}</td>
//                   <td className="p-3">{new Date(e.date).toLocaleDateString()}</td>
//                   <td className="p-3 flex gap-2">
//                     <button onClick={() => handleDeleteExpense(e._id)} className="text-red-600">
//                       <FiTrash2 />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody> */}

//             <tbody>
//               {expenses.map((e) => (
//                 <tr key={e._id} className="border-b hover:bg-gray-50 transition">
//                   <td className="p-3">
//                     {editingExpense?._id === e._id ? (
//                       <input
//                         className="border p-1 rounded w-full"
//                         value={editingExpense.type}
//                         onChange={(ev) =>
//                           setEditingExpense({ ...editingExpense, type: ev.target.value })
//                         }
//                       />
//                     ) : (
//                       e.type
//                     )}
//                   </td>
//                   <td className="p-3">
//                     {editingExpense?._id === e._id ? (
//                       <input
//                         className="border p-1 rounded w-full"
//                         value={editingExpense.category || ""}
//                         onChange={(ev) =>
//                           setEditingExpense({ ...editingExpense, category: ev.target.value })
//                         }
//                       />
//                     ) : (
//                       e.category || "-"
//                     )}
//                   </td>
//                   <td className="p-3">
//                     {editingExpense?._id === e._id ? (
//                       <input
//                         className="border p-1 rounded w-full"
//                         value={editingExpense.title}
//                         onChange={(ev) =>
//                           setEditingExpense({ ...editingExpense, title: ev.target.value })
//                         }
//                       />
//                     ) : (
//                       e.title
//                     )}
//                   </td>
//                   <td className="p-3 text-red-600 font-semibold">
//                     {editingExpense?._id === e._id ? (
//                       <input
//                         className="border p-1 rounded w-full"
//                         type="number"
//                         value={editingExpense.amount}
//                         onChange={(ev) =>
//                           setEditingExpense({ ...editingExpense, amount: ev.target.value })
//                         }
//                       />
//                     ) : (
//                       `₹${e.amount}`
//                     )}
//                   </td>
//                   <td className="p-3">{new Date(e.date).toLocaleDateString()}</td>
//                   <td className="p-3 flex gap-2">
//                     {editingExpense?._id === e._id ? (
//                       <>
//                         <button onClick={saveEditExpense} className="text-green-600">
//                           <FiCheck />
//                         </button>
//                         <button onClick={cancelEditExpense} className="text-red-600">
//                           <FiX />
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => startEditExpense(e)}
//                           className="text-blue-600"
//                         >
//                           <FiEdit2 />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteExpense(e._id)}
//                           className="text-red-600"
//                         >
//                           <FiTrash2 />
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Finance;

//------------------------------





// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api';
// import {
//   FiTrendingUp,
//   FiDollarSign,
//   FiTrash2,
//   FiDownload,
//   FiLogOut,
//   FiEdit2,
//   FiCheck,
//   FiX,
// } from 'react-icons/fi';

// // 🔹 Predefined types
// const TYPES = ['Flight', 'Travel', 'Packages', 'Car Rental', 'Others'];
// const OTHER_CATEGORIES = ['Tea', 'Sugar', 'Water Can', 'Electric Bill', 'Tissue Paper'];

// const Finance = () => {
//   const [summary, setSummary] = useState(null);
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [newIncome, setNewIncome] = useState({ type: '', category: '', title: '', amount: '', date: new Date().toISOString().split('T')[0], notes: '' });
//   const [newExpense, setNewExpense] = useState({ type: '', category: '', title: '', amount: '', date: new Date().toISOString().split('T')[0], notes: '' });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [editingIncome, setEditingIncome] = useState(null);
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [filterType, setFilterType] = useState('monthYear'); // 'monthYear' or 'dateRange'

//   const navigate = useNavigate();

//   // 🔹 Validate input
//   const validateInput = (input) => {
//     if (!input.title || !input.type || !input.amount || !input.date) {
//       setError('Title, type, amount, and date are required.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (isNaN(input.amount) || Number(input.amount) <= 0) {
//       setError('Amount must be a positive number.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(input.date)) {
//       setError('Invalid date format.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (input.type === 'Others' && !input.category) {
//       setError("Category is required for type 'Others'.");
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Validate date range
//   const validateDateRange = () => {
//     if (filterType !== 'dateRange') return true;
//     if (!startDate || !endDate) {
//       setError('Both start date and end date are required for date range filtering.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(startDate) || !Date.parse(endDate)) {
//       setError('Invalid date format for start or end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (new Date(startDate) > new Date(endDate)) {
//       setError('Start date cannot be after end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Fetch Finance Data
//   const fetchData = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     setIsLoading(true);
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}`
//         : `month=${month}&year=${year}`;
//       const [summaryRes, incomesRes, expensesRes] = await Promise.all([
//         api.get(`/finance/summary?${query}`),
//         api.get(`/finance/incomes?${query}`),
//         api.get(`/finance/expenses?${query}`),
//       ]);
//       setSummary(summaryRes.data);
//       setIncomes(Array.isArray(incomesRes.data.incomes) ? incomesRes.data.incomes : []);
//       setExpenses(Array.isArray(expensesRes.data.expenses) ? expensesRes.data.expenses : []);
//     } catch (err) {
//       console.error('❌ Error fetching finance data:', err);
//       setError(err.response?.data?.message || 'Failed to fetch financial data. Please try again.');
//       setTimeout(() => setError(''), 3000);
//       setIncomes([]);
//       setExpenses([]);
//       setSummary(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [month, year, startDate, endDate, filterType]);

//   // 🔹 Logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setMessage('✅ You have successfully logged out!');
//     setTimeout(() => navigate('/login'), 1500);
//   };

//   // 🔹 Excel Download
//   const handleDownloadExcel = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}`
//         : `month=${month}&year=${year}`;
//       const res = await api.get(`/finance/download/excel?${query}`, { responseType: 'blob' });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute(
//         'download',
//         filterType === 'dateRange'
//           ? `finance_report_${startDate}_to_${endDate}.xlsx`
//           : `finance_report_${month}_${year}.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('❌ Error downloading Excel:', err);
//       setError(err.response?.data?.message || 'Failed to download Excel file. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Income
//   const handleAddIncome = async () => {
//     if (!validateInput(newIncome)) return;
//     try {
//       await api.post('/finance/income', { ...newIncome, amount: Number(newIncome.amount) });
//       setNewIncome({ type: '', category: '', title: '', amount: '', date: new Date().toISOString().split('T')[0], notes: '' });
//       setMessage('✅ Income added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding income:', err);
//       setError(err.response?.data?.message || 'Failed to add income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Expense
//   const handleAddExpense = async () => {
//     if (!validateInput(newExpense)) return;
//     try {
//       await api.post('/finance/expense', { ...newExpense, amount: Number(newExpense.amount) });
//       setNewExpense({ type: '', category: '', title: '', amount: '', date: new Date().toISOString().split('T')[0], notes: '' });
//       setMessage('✅ Expense added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding expense:', err);
//       setError(err.response?.data?.message || 'Failed to add expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Delete Handlers
//   const handleDeleteIncome = async (id) => {
//     try {
//       await api.delete(`/finance/income/${id}`);
//       setMessage('✅ Income deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting income:', err);
//       setError(err.response?.data?.message || 'Failed to delete income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleDeleteExpense = async (id) => {
//     try {
//       await api.delete(`/finance/expense/${id}`);
//       setMessage('✅ Expense deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting expense:', err);
//       setError(err.response?.data?.message || 'Failed to delete expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Edit Handlers
//   const startEditIncome = (income) => setEditingIncome({ ...income, date: new Date(income.date).toISOString().split('T')[0] });
//   const cancelEditIncome = () => setEditingIncome(null);
//   const saveEditIncome = async () => {
//     if (!validateInput(editingIncome)) return;
//     try {
//       await api.put(`/finance/income/${editingIncome._id}`, {
//         ...editingIncome,
//         amount: Number(editingIncome.amount),
//       });
//       setEditingIncome(null);
//       setMessage('✅ Income updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating income:', err);
//       setError(err.response?.data?.message || 'Failed to update income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const startEditExpense = (expense) => setEditingExpense({ ...expense, date: new Date(expense.date).toISOString().split('T')[0] });
//   const cancelEditExpense = () => setEditingExpense(null);
//   const saveEditExpense = async () => {
//     if (!validateInput(editingExpense)) return;
//     try {
//       await api.put(`/finance/expense/${editingExpense._id}`, {
//         ...editingExpense,
//         amount: Number(editingExpense.amount),
//       });
//       setEditingExpense(null);
//       setMessage('✅ Expense updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating expense:', err);
//       setError(err.response?.data?.message || 'Failed to update expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Title Bar */}
//       <header className="bg-blue-700 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
//           <h1 className="text-2xl font-bold tracking-wide">FareBuzzer Accounting Report</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
//             aria-label="Logout"
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto p-6 space-y-8">
//         {/* Messages */}
//         {message && (
//           <div className="bg-green-100 text-green-700 p-3 rounded-lg shadow">{message}</div>
//         )}
//         {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg shadow">{error}</div>}

//         {/* Title + Excel Download */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//           <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//             <FiTrendingUp className="text-blue-600" /> Accounting Dashboard
//           </h2>
//           <button
//             onClick={handleDownloadExcel}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//             aria-label="Download Excel Report"
//           >
//             <FiDownload /> Download Excel
//           </button>
//         </div>

//         {/* Filter Type Selector */}
//         <div className="flex gap-4 mb-6">
//           <select
//             value={filterType}
//             onChange={(e) => {
//               setFilterType(e.target.value);
//               setStartDate('');
//               setEndDate('');
//               setMonth(new Date().getMonth() + 1);
//               setYear(new Date().getFullYear());
//             }}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label="Select Filter Type"
//           >
//             <option value="monthYear">Month/Year</option>
//             <option value="dateRange">Date Range</option>
//           </select>
//         </div>

//         {/* Month/Year or Date Range Selectors */}
//         <div className="flex gap-4 mb-6">
//           {filterType === 'monthYear' ? (
//             <>
//               <select
//                 value={month}
//                 onChange={(e) => setMonth(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Select Month"
//               >
//                 {[...Array(12)].map((_, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={year}
//                 onChange={(e) => setYear(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Select Year"
//               >
//                 {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((y) => (
//                   <option key={y} value={y}>
//                     {y}
//                   </option>
//                 ))}
//               </select>
//             </>
//           ) : (
//             <>
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Select Start Date"
//               />
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Select End Date"
//               />
//             </>
//           )}
//         </div>

//         {/* Summary */}
//         {isLoading ? (
//           <div className="text-center text-gray-500">Loading...</div>
//         ) : summary ? (
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
//             <div className="p-4 bg-green-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Income</p>
//               <p className="text-xl font-bold text-green-600">
//                 ₹{summary.totalIncome.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-red-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Expenses</p>
//               <p className="text-xl font-bold text-red-600">
//                 ₹{summary.totalExpense.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-blue-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Balance</p>
//               <p className="text-xl font-bold text-blue-600">
//                 ₹{summary.balance.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">No summary data available.</div>
//         )}

//         {/* Income Section */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg">
//           <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-green-500" /> Income
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4">
//             <select
//               value={newIncome.type}
//               onChange={(e) => setNewIncome({ ...newIncome, type: e.target.value, category: '' })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Select Income Type"
//             >
//               <option value="">Select Type</option>
//               {TYPES.map((t) => (
//                 <option key={t} value={t}>
//                   {t}
//                 </option>
//               ))}
//             </select>
//             {newIncome.type === 'Others' && (
//               <select
//                 value={newIncome.category}
//                 onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//                 aria-label="Select Income Category"
//               >
//                 <option value="">Select Category</option>
//                 {OTHER_CATEGORIES.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//             )}
//             <input
//               type="text"
//               placeholder="Title"
//               value={newIncome.title}
//               onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Income Title"
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newIncome.amount}
//               onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Income Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newIncome.date}
//               onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Income Date"
//             />
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newIncome.notes}
//               onChange={(e) => setNewIncome({ ...newIncome, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Income Notes"
//             />
//             <button
//               onClick={handleAddIncome}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//               aria-label="Add Income"
//             >
//               Add
//             </button>
//           </div>
//           <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
//             <thead className="bg-green-600 text-white">
//               <tr>
//                 <th className="p-3 text-left">Type</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3 text-left">Amount</th>
//                 <th className="p-3 text-left">Date</th>
//                 <th className="p-3 text-left">Notes</th>
//                 <th className="p-3 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="7" className="p-3 text-center text-gray-500">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : incomes.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="p-3 text-center text-gray-500">
//                     No income records found.
//                   </td>
//                 </tr>
//               ) : (
//                 incomes.map((i) => (
//                   <tr key={i._id} className="border-b hover:bg-gray-50 transition">
//                     <td className="p-3">
//                       {editingIncome?._id === i._id ? (
//                         <select
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                           value={editingIncome.type}
//                           onChange={(e) => setEditingIncome({ ...editingIncome, type: e.target.value, category: '' })}
//                           aria-label="Edit Income Type"
//                         >
//                           <option value="">Select Type</option>
//                           {TYPES.map((t) => (
//                             <option key={t} value={t}>
//                               {t}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         i.type
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingIncome?._id === i._id && editingIncome.type === 'Others' ? (
//                         <select
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                           value={editingIncome.category || ''}
//                           onChange={(e) => setEditingIncome({ ...editingIncome, category: e.target.value })}
//                           aria-label="Edit Income Category"
//                         >
//                           <option value="">Select Category</option>
//                           {OTHER_CATEGORIES.map((c) => (
//                             <option key={c} value={c}>
//                               {c}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         i.category || '-'
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingIncome?._id === i._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                           value={editingIncome.title}
//                           onChange={(e) => setEditingIncome({ ...editingIncome, title: e.target.value })}
//                           aria-label="Edit Income Title"
//                         />
//                       ) : (
//                         i.title
//                       )}
//                     </td>
//                     <td className="p-3 text-green-600 font-semibold">
//                       {editingIncome?._id === i._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                           type="number"
//                           value={editingIncome.amount}
//                           onChange={(e) => setEditingIncome({ ...editingIncome, amount: e.target.value })}
//                           aria-label="Edit Income Amount"
//                           min="0"
//                         />
//                       ) : (
//                         `₹${i.amount.toLocaleString()}`
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingIncome?._id === i._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                           type="date"
//                           value={editingIncome.date}
//                           onChange={(e) => setEditingIncome({ ...editingIncome, date: e.target.value })}
//                           aria-label="Edit Income Date"
//                         />
//                       ) : (
//                         new Date(i.date).toLocaleDateString('en-IN')
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingIncome?._id === i._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                           value={editingIncome.notes || ''}
//                           onChange={(e) => setEditingIncome({ ...editingIncome, notes: e.target.value })}
//                           aria-label="Edit Income Notes"
//                         />
//                       ) : (
//                         i.notes || '-'
//                       )}
//                     </td>
//                     <td className="p-3 flex gap-2">
//                       {editingIncome?._id === i._id ? (
//                         <>
//                           <button
//                             onClick={saveEditIncome}
//                             className="text-green-600 hover:text-green-800"
//                             aria-label="Save Income Edit"
//                           >
//                             <FiCheck />
//                           </button>
//                           <button
//                             onClick={cancelEditIncome}
//                             className="text-red-600 hover:text-red-800"
//                             aria-label="Cancel Income Edit"
//                           >
//                             <FiX />
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => startEditIncome(i)}
//                             className="text-blue-600 hover:text-blue-800"
//                             aria-label="Edit Income"
//                           >
//                             <FiEdit2 />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteIncome(i._id)}
//                             className="text-red-600 hover:text-red-800"
//                             aria-label="Delete Income"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Expenses Section */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg">
//           <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-red-500" /> Expenses
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4">
//             <select
//               value={newExpense.type}
//               onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value, category: '' })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Select Expense Type"
//             >
//               <option value="">Select Type</option>
//               {TYPES.map((t) => (
//                 <option key={t} value={t}>
//                   {t}
//                 </option>
//               ))}
//             </select>
//             {newExpense.type === 'Others' && (
//               <select
//                 value={newExpense.category}
//                 onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//                 aria-label="Select Expense Category"
//               >
//                 <option value="">Select Category</option>
//                 {OTHER_CATEGORIES.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//             )}
//             <input
//               type="text"
//               placeholder="Title"
//               value={newExpense.title}
//               onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Expense Title"
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newExpense.amount}
//               onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Expense Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newExpense.date}
//               onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Expense Date"
//             />
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newExpense.notes}
//               onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Expense Notes"
//             />
//             <button
//               onClick={handleAddExpense}
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//               aria-label="Add Expense"
//             >
//               Add
//             </button>
//           </div>
//           <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
//             <thead className="bg-red-600 text-white">
//               <tr>
//                 <th className="p-3 text-left">Type</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3 text-left">Amount</th>
//                 <th className="p-3 text-left">Date</th>
//                 <th className="p-3 text-left">Notes</th>
//                 <th className="p-3 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="7" className="p-3 text-center text-gray-500">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : expenses.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="p-3 text-center text-gray-500">
//                     No expense records found.
//                   </td>
//                 </tr>
//               ) : (
//                 expenses.map((e) => (
//                   <tr key={e._id} className="border-b hover:bg-gray-50 transition">
//                     <td className="p-3">
//                       {editingExpense?._id === e._id ? (
//                         <select
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                           value={editingExpense.type}
//                           onChange={(ev) => setEditingExpense({ ...editingExpense, type: ev.target.value, category: '' })}
//                           aria-label="Edit Expense Type"
//                         >
//                           <option value="">Select Type</option>
//                           {TYPES.map((t) => (
//                             <option key={t} value={t}>
//                               {t}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         e.type
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingExpense?._id === e._id && editingExpense.type === 'Others' ? (
//                         <select
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                           value={editingExpense.category || ''}
//                           onChange={(ev) => setEditingExpense({ ...editingExpense, category: ev.target.value })}
//                           aria-label="Edit Expense Category"
//                         >
//                           <option value="">Select Category</option>
//                           {OTHER_CATEGORIES.map((c) => (
//                             <option key={c} value={c}>
//                               {c}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         e.category || '-'
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingExpense?._id === e._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                           value={editingExpense.title}
//                           onChange={(ev) => setEditingExpense({ ...editingExpense, title: ev.target.value })}
//                           aria-label="Edit Expense Title"
//                         />
//                       ) : (
//                         e.title
//                       )}
//                     </td>
//                     <td className="p-3 text-red-600 font-semibold">
//                       {editingExpense?._id === e._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                           type="number"
//                           value={editingExpense.amount}
//                           onChange={(ev) => setEditingExpense({ ...editingExpense, amount: ev.target.value })}
//                           aria-label="Edit Expense Amount"
//                           min="0"
//                         />
//                       ) : (
//                         `₹${e.amount.toLocaleString()}`
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingExpense?._id === e._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                           type="date"
//                           value={editingExpense.date}
//                           onChange={(ev) => setEditingExpense({ ...editingExpense, date: ev.target.value })}
//                           aria-label="Edit Expense Date"
//                         />
//                       ) : (
//                         new Date(e.date).toLocaleDateString('en-IN')
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingExpense?._id === e._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                           value={editingExpense.notes || ''}
//                           onChange={(ev) => setEditingExpense({ ...editingExpense, notes: ev.target.value })}
//                           aria-label="Edit Expense Notes"
//                         />
//                       ) : (
//                         e.notes || '-'
//                       )}
//                     </td>
//                     <td className="p-3 flex gap-2">
//                       {editingExpense?._id === e._id ? (
//                         <>
//                           <button
//                             onClick={saveEditExpense}
//                             className="text-green-600 hover:text-green-800"
//                             aria-label="Save Expense Edit"
//                           >
//                             <FiCheck />
//                           </button>
//                           <button
//                             onClick={cancelEditExpense}
//                             className="text-red-600 hover:text-red-800"
//                             aria-label="Cancel Expense Edit"
//                           >
//                             <FiX />
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => startEditExpense(e)}
//                             className="text-blue-600 hover:text-blue-800"
//                             aria-label="Edit Expense"
//                           >
//                             <FiEdit2 />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteExpense(e._id)}
//                             className="text-red-600 hover:text-red-800"
//                             aria-label="Delete Expense"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Finance;


//-----------------CORRECT---------------

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api';
// import {
//   FiTrendingUp,
//   FiDollarSign,
//   FiTrash2,
//   FiDownload,
//   FiLogOut,
//   FiEdit2,
//   FiCheck,
//   FiX,
// } from 'react-icons/fi';

// // 🔹 Predefined categories from backend schemas
// const INCOME_CATEGORIES = [
//   'MCO Meta',
//   'MCO PPC',
//   'Meta Rental',
//   'Commission',
//   'Technology Sale',
//   'Domestic Tour Package',
//   'International Tour Package',
//   'Airline Ticket',
//   'Hotel',
//   'Car Hire',
//   'Activities',
//   'Airport Transfers',
//   'Visa',
// ];

// const EXPENSE_CATEGORIES = [
//   'Salaries',
//   'Incentives',
//   'Rent',
//   'Travel Allowance Agent',
//   'Travel Allowance Owner',
//   'Meta Recharge',
//   'Chargeback',
//   'Refunds',
//   'Miscellaneous Expenses',
//   'Call Payment',
// ];

// const Finance = () => {
//   const [summary, setSummary] = useState(null);
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [newIncome, setNewIncome] = useState({
//     type: 'Income',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//   });
//   const [newExpense, setNewExpense] = useState({
//     type: 'Expense',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [editingIncome, setEditingIncome] = useState(null);
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [filterType, setFilterType] = useState('monthYear'); // 'monthYear' or 'dateRange'

//   const navigate = useNavigate();

//   // 🔹 Validate input (aligned with backend)
//   const validateInput = (input) => {
//     if (!input.title || !input.amount || !input.date) {
//       setError('Title, amount, and date are required.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (isNaN(input.amount) || Number(input.amount) <= 0) {
//       setError('Amount must be a positive number.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(input.date)) {
//       setError('Invalid date format.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (input.category && input.type === 'Income' && !INCOME_CATEGORIES.includes(input.category)) {
//       setError(`Category must be one of: ${INCOME_CATEGORIES.join(', ')}.`);
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (input.category && input.type === 'Expense' && !EXPENSE_CATEGORIES.includes(input.category)) {
//       setError(`Category must be one of: ${EXPENSE_CATEGORIES.join(', ')}.`);
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Validate date range
//   const validateDateRange = () => {
//     if (filterType !== 'dateRange') return true;
//     if (!startDate || !endDate) {
//       setError('Both start date and end date are required for date range filtering.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(startDate) || !Date.parse(endDate)) {
//       setError('Invalid date format for start or end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (new Date(startDate) > new Date(endDate)) {
//       setError('Start date cannot be after end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Fetch Finance Data
//   const fetchData = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     setIsLoading(true);
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}`
//         : `month=${month}&year=${year}`;
//       const [summaryRes, incomesRes, expensesRes] = await Promise.all([
//         api.get(`/finance/summary?${query}`),
//         api.get(`/finance/incomes?${query}`),
//         api.get(`/finance/expenses?${query}`),
//       ]);
//       setSummary(summaryRes.data);
//       setIncomes(Array.isArray(incomesRes.data.incomes) ? incomesRes.data.incomes : []);
//       setExpenses(Array.isArray(expensesRes.data.expenses) ? expensesRes.data.expenses : []);
//     } catch (err) {
//       console.error('❌ Error fetching finance data:', err);
//       setError(err.response?.data?.message || 'Failed to fetch financial data. Please try again.');
//       setTimeout(() => setError(''), 3000);
//       setIncomes([]);
//       setExpenses([]);
//       setSummary(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [month, year, startDate, endDate, filterType]);

//   // 🔹 Logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setMessage('✅ You have successfully logged out!');
//     setTimeout(() => navigate('/login'), 1500);
//   };

//   // 🔹 Excel Download
//   const handleDownloadExcel = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}`
//         : `month=${month}&year=${year}`;
//       const res = await api.get(`/finance/download/excel?${query}`, { responseType: 'blob' });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute(
//         'download',
//         filterType === 'dateRange'
//           ? `finance_report_${startDate}_to_${endDate}.xlsx`
//           : `finance_report_${month}_${year}.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('❌ Error downloading Excel:', err);
//       setError(err.response?.data?.message || 'Failed to download Excel file. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Income
//   const handleAddIncome = async () => {
//     if (!validateInput(newIncome)) return;
//     try {
//       await api.post('/finance/income', { ...newIncome, amount: Number(newIncome.amount) });
//       setNewIncome({
//         type: 'Income',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//       });
//       setMessage('✅ Income added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding income:', err);
//       setError(err.response?.data?.message || 'Failed to add income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Expense
//   const handleAddExpense = async () => {
//     if (!validateInput(newExpense)) return;
//     try {
//       await api.post('/finance/expense', { ...newExpense, amount: Number(newExpense.amount) });
//       setNewExpense({
//         type: 'Expense',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//       });
//       setMessage('✅ Expense added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding expense:', err);
//       setError(err.response?.data?.message || 'Failed to add expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Delete Handlers
//   const handleDeleteIncome = async (id) => {
//     try {
//       await api.delete(`/finance/income/${id}`);
//       setMessage('✅ Income deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting income:', err);
//       setError(err.response?.data?.message || 'Failed to delete income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleDeleteExpense = async (id) => {
//     try {
//       await api.delete(`/finance/expense/${id}`);
//       setMessage('✅ Expense deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting expense:', err);
//       setError(err.response?.data?.message || 'Failed to delete expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Edit Handlers
//   const startEditIncome = (income) => setEditingIncome({
//     ...income,
//     date: new Date(income.date).toISOString().split('T')[0],
//   });
//   const cancelEditIncome = () => setEditingIncome(null);
//   const saveEditIncome = async () => {
//     if (!validateInput(editingIncome)) return;
//     try {
//       await api.put(`/finance/income/${editingIncome._id}`, {
//         ...editingIncome,
//         amount: Number(editingIncome.amount),
//       });
//       setEditingIncome(null);
//       setMessage('✅ Income updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating income:', err);
//       setError(err.response?.data?.message || 'Failed to update income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const startEditExpense = (expense) => setEditingExpense({
//     ...expense,
//     date: new Date(expense.date).toISOString().split('T')[0],
//   });
//   const cancelEditExpense = () => setEditingExpense(null);
//   const saveEditExpense = async () => {
//     if (!validateInput(editingExpense)) return;
//     try {
//       await api.put(`/finance/expense/${editingExpense._id}`, {
//         ...editingExpense,
//         amount: Number(editingExpense.amount),
//       });
//       setEditingExpense(null);
//       setMessage('✅ Expense updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating expense:', err);
//       setError(err.response?.data?.message || 'Failed to update expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Title Bar */}
//       <header className="bg-blue-700 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
//           <h1 className="text-2xl font-bold tracking-wide">FareBuzzer Accounting Report</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
//             aria-label="Logout"
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto p-6 space-y-8">
//         {/* Messages */}
//         {message && (
//           <div className="bg-green-100 text-green-700 p-3 rounded-lg shadow">{message}</div>
//         )}
//         {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg shadow">{error}</div>}

//         {/* Title + Excel Download */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//           <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//             <FiTrendingUp className="text-blue-600" /> Accounting Dashboard
//           </h2>
//           <button
//             onClick={handleDownloadExcel}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//             aria-label="Download Excel Report"
//           >
//             <FiDownload /> Download Excel
//           </button>
//         </div>

//         {/* Filter Type Selector */}
//         <div className="flex gap-4 mb-6">
//           <select
//             value={filterType}
//             onChange={(e) => {
//               setFilterType(e.target.value);
//               setStartDate('');
//               setEndDate('');
//               setMonth(new Date().getMonth() + 1);
//               setYear(new Date().getFullYear());
//             }}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label="Select Filter Type"
//           >
//             <option value="monthYear">Month/Year</option>
//             <option value="dateRange">Date Range</option>
//           </select>
//         {/* </div> */}

//         {/* Month/Year or Date Range Selectors */}
//         {/* <div className="flex gap-4 mb-6"> */}
//           {filterType === 'monthYear' ? (
//             <>
//               <select
//                 value={month}
//                 onChange={(e) => setMonth(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Select Month"
//               >
//                 {[...Array(12)].map((_, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={year}
//                 onChange={(e) => setYear(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Select Year"
//               >
//                 {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 1 + i).map((y) => (
//                   <option key={y} value={y}>
//                     {y}
//                   </option>
//                 ))}
//               </select>
//             </>
//           ) : (
//             <>
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Select Start Date"
//               />
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Select End Date"
//               />
//             </>
//           )}
//         </div>

//         {/* Summary */}
//         {isLoading ? (
//           <div className="text-center text-gray-500">Loading...</div>
//         ) : summary ? (
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
//             <div className="p-4 bg-green-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Income</p>
//               <p className="text-xl font-bold text-green-600">
//                 ₹{summary.totalIncome.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-red-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Expenses</p>
//               <p className="text-xl font-bold text-red-600">
//                 ₹{summary.totalExpense.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-blue-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Balance</p>
//               <p className="text-xl font-bold text-blue-600">
//                 ₹{summary.balance.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">No summary data available.</div>
//         )}

//         {/* Income Section */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg">
//           <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-green-500" /> Income
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newIncome.title}
//               onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/4"
//               aria-label="Income Title"
//             />
//             <select
//               value={newIncome.category}
//               onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/4"
//               aria-label="Select Income Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {INCOME_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newIncome.amount}
//               onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/4"
//               aria-label="Income Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newIncome.date}
//               onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/4"
//               aria-label="Income Date"
//             />
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newIncome.notes}
//               onChange={(e) => setNewIncome({ ...newIncome, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/4"
//               aria-label="Income Notes"
//             />
//             <button
//               onClick={handleAddIncome}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//               aria-label="Add Income"
//             >
//               Add
//             </button>
//           </div>
//           <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
//             <thead className="bg-green-600 text-white">
//               <tr>
//                 <th className="p-3 text-left">Type</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3 text-left">Amount</th>
//                 <th className="p-3 text-left">Date</th>
//                 <th className="p-3 text-left">Notes</th>
//                 <th className="p-3 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="7" className="p-3 text-center text-gray-500">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : incomes.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="p-3 text-center text-gray-500">
//                     No income records found.
//                   </td>
//                 </tr>
//               ) : (
//                 incomes.map((i) => (
//                   <tr key={i._id} className="border-b hover:bg-gray-50 transition">
//                     <td className="p-3">
//                       {editingIncome?._id === i._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                           value={editingIncome.type}
//                           readOnly
//                           aria-label="Income Type (Read-only)"
//                         />
//                       ) : (
//                         i.type
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingIncome?._id === i._id ? (
//                         <select
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                           value={editingIncome.category || ''}
//                           onChange={(e) => setEditingIncome({ ...editingIncome, category: e.target.value })}
//                           aria-label="Edit Income Category"
//                         >
//                           <option value="">Select Category (Optional)</option>
//                           {INCOME_CATEGORIES.map((c) => (
//                             <option key={c} value={c}>
//                               {c}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         i.category || '-'
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingIncome?._id === i._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                           value={editingIncome.title}
//                           onChange={(e) => setEditingIncome({ ...editingIncome, title: e.target.value })}
//                           aria-label="Edit Income Title"
//                         />
//                       ) : (
//                         i.title
//                       )}
//                     </td>
//                     <td className="p-3 text-green-600 font-semibold">
//                       {editingIncome?._id === i._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                           type="number"
//                           value={editingIncome.amount}
//                           onChange={(e) => setEditingIncome({ ...editingIncome, amount: e.target.value })}
//                           aria-label="Edit Income Amount"
//                           min="0"
//                         />
//                       ) : (
//                         `₹${i.amount.toLocaleString()}`
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingIncome?._id === i._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                           type="date"
//                           value={editingIncome.date}
//                           onChange={(e) => setEditingIncome({ ...editingIncome, date: e.target.value })}
//                           aria-label="Edit Income Date"
//                         />
//                       ) : (
//                         new Date(i.date).toLocaleDateString('en-IN')
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingIncome?._id === i._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                           value={editingIncome.notes || ''}
//                           onChange={(e) => setEditingIncome({ ...editingIncome, notes: e.target.value })}
//                           aria-label="Edit Income Notes"
//                         />
//                       ) : (
//                         i.notes || '-'
//                       )}
//                     </td>
//                     <td className="p-3 flex gap-2">
//                       {editingIncome?._id === i._id ? (
//                         <>
//                           <button
//                             onClick={saveEditIncome}
//                             className="text-green-600 hover:text-green-800"
//                             aria-label="Save Income Edit"
//                           >
//                             <FiCheck />
//                           </button>
//                           <button
//                             onClick={cancelEditIncome}
//                             className="text-red-600 hover:text-red-800"
//                             aria-label="Cancel Income Edit"
//                           >
//                             <FiX />
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => startEditIncome(i)}
//                             className="text-blue-600 hover:text-blue-800"
//                             aria-label="Edit Income"
//                           >
//                             <FiEdit2 />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteIncome(i._id)}
//                             className="text-red-600 hover:text-red-800"
//                             aria-label="Delete Income"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Expenses Section */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg">
//           <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-red-500" /> Expenses
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newExpense.title}
//               onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/4"
//               aria-label="Expense Title"
//             />
//             <select
//               value={newExpense.category}
//               onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/4"
//               aria-label="Select Expense Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {EXPENSE_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newExpense.amount}
//               onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/4"
//               aria-label="Expense Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newExpense.date}
//               onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/4"
//               aria-label="Expense Date"
//             />
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newExpense.notes}
//               onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/4"
//               aria-label="Expense Notes"
//             />
//             <button
//               onClick={handleAddExpense}
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//               aria-label="Add Expense"
//             >
//               Add
//             </button>
//           </div>
//           <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
//             <thead className="bg-red-600 text-white">
//               <tr>
//                 <th className="p-3 text-left">Type</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3 text-left">Amount</th>
//                 <th className="p-3 text-left">Date</th>
//                 <th className="p-3 text-left">Notes</th>
//                 <th className="p-3 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="7" className="p-3 text-center text-gray-500">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : expenses.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="p-3 text-center text-gray-500">
//                     No expense records found.
//                   </td>
//                 </tr>
//               ) : (
//                 expenses.map((e) => (
//                   <tr key={e._id} className="border-b hover:bg-gray-50 transition">
//                     <td className="p-3">
//                       {editingExpense?._id === e._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                           value={editingExpense.type}
//                           readOnly
//                           aria-label="Expense Type (Read-only)"
//                         />
//                       ) : (
//                         e.type
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingExpense?._id === e._id ? (
//                         <select
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                           value={editingExpense.category || ''}
//                           onChange={(ev) => setEditingExpense({ ...editingExpense, category: ev.target.value })}
//                           aria-label="Edit Expense Category"
//                         >
//                           <option value="">Select Category (Optional)</option>
//                           {EXPENSE_CATEGORIES.map((c) => (
//                             <option key={c} value={c}>
//                               {c}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         e.category || '-'
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingExpense?._id === e._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                           value={editingExpense.title}
//                           onChange={(ev) => setEditingExpense({ ...editingExpense, title: ev.target.value })}
//                           aria-label="Edit Expense Title"
//                         />
//                       ) : (
//                         e.title
//                       )}
//                     </td>
//                     <td className="p-3 text-red-600 font-semibold">
//                       {editingExpense?._id === e._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                           type="number"
//                           value={editingExpense.amount}
//                           onChange={(ev) => setEditingExpense({ ...editingExpense, amount: ev.target.value })}
//                           aria-label="Edit Expense Amount"
//                           min="0"
//                         />
//                       ) : (
//                         `₹${e.amount.toLocaleString()}`
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingExpense?._id === e._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                           type="date"
//                           value={editingExpense.date}
//                           onChange={(ev) => setEditingExpense({ ...editingExpense, date: ev.target.value })}
//                           aria-label="Edit Expense Date"
//                         />
//                       ) : (
//                         new Date(e.date).toLocaleDateString('en-IN')
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {editingExpense?._id === e._id ? (
//                         <input
//                           className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                           value={editingExpense.notes || ''}
//                           onChange={(ev) => setEditingExpense({ ...editingExpense, notes: ev.target.value })}
//                           aria-label="Edit Expense Notes"
//                         />
//                       ) : (
//                         e.notes || '-'
//                       )}
//                     </td>
//                     <td className="p-3 flex gap-2">
//                       {editingExpense?._id === e._id ? (
//                         <>
//                           <button
//                             onClick={saveEditExpense}
//                             className="text-green-600 hover:text-green-800"
//                             aria-label="Save Expense Edit"
//                           >
//                             <FiCheck />
//                           </button>
//                           <button
//                             onClick={cancelEditExpense}
//                             className="text-red-600 hover:text-red-800"
//                             aria-label="Cancel Expense Edit"
//                           >
//                             <FiX />
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => startEditExpense(e)}
//                             className="text-blue-600 hover:text-blue-800"
//                             aria-label="Edit Expense"
//                           >
//                             <FiEdit2 />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteExpense(e._id)}
//                             className="text-red-600 hover:text-red-800"
//                             aria-label="Delete Expense"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Finance;

//--------------STOP TITLE BAR SCROLL TIME -----------

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api';
// import {
//   FiTrendingUp,
//   FiDollarSign,
//   FiTrash2,
//   FiDownload,
//   FiLogOut,
//   FiEdit2,
//   FiCheck,
//   FiX,
// } from 'react-icons/fi';

// // 🔹 Predefined categories from backend schemas
// const INCOME_CATEGORIES = [
//   'MCO Meta',
//   'MCO PPC',
//   'Meta Rental',
//   'Commission',
//   'Technology Sale',
//   'Domestic Tour Package',
//   'International Tour Package',
//   'Airline Ticket',
//   'Hotel',
//   'Car Hire',
//   'Activities',
//   'Airport Transfers',
//   'Visa',
// ];

// const EXPENSE_CATEGORIES = [
//   'Salaries',
//   'Incentives',
//   'Rent',
//   'Travel Allowance Agent',
//   'Travel Allowance Owner',
//   'Meta Recharge',
//   'Chargeback',
//   'Refunds',
//   'Miscellaneous Expenses',
//   'Call Payment',
// ];

// const Finance = () => {
//   const [summary, setSummary] = useState(null);
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [newIncome, setNewIncome] = useState({
//     type: 'Income',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//   });
//   const [newExpense, setNewExpense] = useState({
//     type: 'Expense',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [editingIncome, setEditingIncome] = useState(null);
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [filterType, setFilterType] = useState('monthYear'); // 'monthYear' or 'dateRange'

//   const navigate = useNavigate();

//   // 🔹 Validate input (aligned with backend)
//   const validateInput = (input) => {
//     if (!input.title || !input.amount || !input.date) {
//       setError('Title, amount, and date are required.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (isNaN(input.amount) || Number(input.amount) <= 0) {
//       setError('Amount must be a positive number.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(input.date)) {
//       setError('Invalid date format.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (input.category && input.type === 'Income' && !INCOME_CATEGORIES.includes(input.category)) {
//       setError(`Category must be one of: ${INCOME_CATEGORIES.join(', ')}.`);
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (input.category && input.type === 'Expense' && !EXPENSE_CATEGORIES.includes(input.category)) {
//       setError(`Category must be one of: ${EXPENSE_CATEGORIES.join(', ')}.`);
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Validate date range
//   const validateDateRange = () => {
//     if (filterType !== 'dateRange') return true;
//     if (!startDate || !endDate) {
//       setError('Both start date and end date are required for date range filtering.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(startDate) || !Date.parse(endDate)) {
//       setError('Invalid date format for start or end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (new Date(startDate) > new Date(endDate)) {
//       setError('Start date cannot be after end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Fetch Finance Data
//   const fetchData = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     setIsLoading(true);
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}`
//         : `month=${month}&year=${year}`;
//       const [summaryRes, incomesRes, expensesRes] = await Promise.all([
//         api.get(`/finance/summary?${query}`),
//         api.get(`/finance/incomes?${query}`),
//         api.get(`/finance/expenses?${query}`),
//       ]);
//       setSummary(summaryRes.data);
//       setIncomes(Array.isArray(incomesRes.data.incomes) ? incomesRes.data.incomes : []);
//       setExpenses(Array.isArray(expensesRes.data.expenses) ? expensesRes.data.expenses : []);
//     } catch (err) {
//       console.error('❌ Error fetching finance data:', err);
//       setError(err.response?.data?.message || 'Failed to fetch financial data. Please try again.');
//       setTimeout(() => setError(''), 3000);
//       setIncomes([]);
//       setExpenses([]);
//       setSummary(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [month, year, startDate, endDate, filterType]);

//   // 🔹 Logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setMessage('✅ You have successfully logged out!');
//     setTimeout(() => navigate('/login'), 1500);
//   };

//   // 🔹 Excel Download
//   const handleDownloadExcel = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}`
//         : `month=${month}&year=${year}`;
//       const res = await api.get(`/finance/download/excel?${query}`, { responseType: 'blob' });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute(
//         'download',
//         filterType === 'dateRange'
//           ? `finance_report_${startDate}_to_${endDate}.xlsx`
//           : `finance_report_${month}_${year}.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('❌ Error downloading Excel:', err);
//       setError(err.response?.data?.message || 'Failed to download Excel file. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Income
//   const handleAddIncome = async () => {
//     if (!validateInput(newIncome)) return;
//     try {
//       await api.post('/finance/income', { ...newIncome, amount: Number(newIncome.amount) });
//       setNewIncome({
//         type: 'Income',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//       });
//       setMessage('✅ Income added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding income:', err);
//       setError(err.response?.data?.message || 'Failed to add income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Expense
//   const handleAddExpense = async () => {
//     if (!validateInput(newExpense)) return;
//     try {
//       await api.post('/finance/expense', { ...newExpense, amount: Number(newExpense.amount) });
//       setNewExpense({
//         type: 'Expense',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//       });
//       setMessage('✅ Expense added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding expense:', err);
//       setError(err.response?.data?.message || 'Failed to add expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Delete Handlers
//   const handleDeleteIncome = async (id) => {
//     try {
//       await api.delete(`/finance/income/${id}`);
//       setMessage('✅ Income deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting income:', err);
//       setError(err.response?.data?.message || 'Failed to delete income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleDeleteExpense = async (id) => {
//     try {
//       await api.delete(`/finance/expense/${id}`);
//       setMessage('✅ Expense deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting expense:', err);
//       setError(err.response?.data?.message || 'Failed to delete expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Edit Handlers
//   const startEditIncome = (income) => setEditingIncome({
//     ...income,
//     date: new Date(income.date).toISOString().split('T')[0],
//   });
//   const cancelEditIncome = () => setEditingIncome(null);
//   const saveEditIncome = async () => {
//     if (!validateInput(editingIncome)) return;
//     try {
//       await api.put(`/finance/income/${editingIncome._id}`, {
//         ...editingIncome,
//         amount: Number(editingIncome.amount),
//       });
//       setEditingIncome(null);
//       setMessage('✅ Income updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating income:', err);
//       setError(err.response?.data?.message || 'Failed to update income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const startEditExpense = (expense) => setEditingExpense({
//     ...expense,
//     date: new Date(expense.date).toISOString().split('T')[0],
//   });
//   const cancelEditExpense = () => setEditingExpense(null);
//   const saveEditExpense = async () => {
//     if (!validateInput(editingExpense)) return;
//     try {
//       await api.put(`/finance/expense/${editingExpense._id}`, {
//         ...editingExpense,
//         amount: Number(editingExpense.amount),
//       });
//       setEditingExpense(null);
//       setMessage('✅ Expense updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating expense:', err);
//       setError(err.response?.data?.message || 'Failed to update expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Fixed Title Bar */}
//       <header className="fixed top-0 left-0 right-0 bg-blue-700 text-white shadow-lg z-10">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
//           <h1 className="text-xl sm:text-2xl font-bold tracking-wide">FareBuzzer Accounting Report</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition mt-2 sm:mt-0"
//             aria-label="Logout"
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </header>

//       {/* Scrollable Content */}
//       <div className="mt-20 sm:mt-16 max-w-7xl mx-auto p-4 sm:p-6 space-y-8 overflow-y-auto">
//         {/* Messages */}
//         {message && (
//           <div className="bg-green-100 text-green-700 p-3 rounded-lg shadow">{message}</div>
//         )}
//         {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg shadow">{error}</div>}

//         {/* Title + Excel Download */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
//             <FiTrendingUp className="text-blue-600" /> Accounting Dashboard
//           </h2>
//           <button
//             onClick={handleDownloadExcel}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//             aria-label="Download Excel Report"
//           >
//             <FiDownload /> Download Excel
//           </button>
//         </div>

//         {/* Filter Type Selector */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <select
//             value={filterType}
//             onChange={(e) => {
//               setFilterType(e.target.value);
//               setStartDate('');
//               setEndDate('');
//               setMonth(new Date().getMonth() + 1);
//               setYear(new Date().getFullYear());
//             }}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//             aria-label="Select Filter Type"
//           >
//             <option value="monthYear">Month/Year</option>
//             <option value="dateRange">Date Range</option>
//           </select>

//           {filterType === 'monthYear' ? (
//             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//               <select
//                 value={month}
//                 onChange={(e) => setMonth(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                 aria-label="Select Month"
//               >
//                 {[...Array(12)].map((_, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={year}
//                 onChange={(e) => setYear(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                 aria-label="Select Year"
//               >
//                 {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 1 + i).map((y) => (
//                   <option key={y} value={y}>
//                     {y}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ) : (
//             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                 aria-label="Select Start Date"
//               />
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                 aria-label="Select End Date"
//               />
//             </div>
//           )}
//         </div>

//         {/* Summary */}
//         {isLoading ? (
//           <div className="text-center text-gray-500">Loading...</div>
//         ) : summary ? (
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
//             <div className="p-4 bg-green-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Income</p>
//               <p className="text-lg sm:text-xl font-bold text-green-600">
//                 ₹{summary.totalIncome.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-red-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Expenses</p>
//               <p className="text-lg sm:text-xl font-bold text-red-600">
//                 ₹{summary.totalExpense.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-blue-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Balance</p>
//               <p className="text-lg sm:text-xl font-bold text-blue-600">
//                 ₹{summary.balance.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">No summary data available.</div>
//         )}

//         {/* Income Section */}
//         <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
//           <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-green-500" /> Income
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newIncome.title}
//               onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Income Title"
//             />
//             <select
//               value={newIncome.category}
//               onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Select Income Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {INCOME_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newIncome.amount}
//               onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Income Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newIncome.date}
//               onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Income Date"
//             />
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newIncome.notes}
//               onChange={(e) => setNewIncome({ ...newIncome, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Income Notes"
//             />
//             <button
//               onClick={handleAddIncome}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
//               aria-label="Add Income"
//             >
//               Add
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse rounded-lg shadow-sm">
//               <thead className="bg-green-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left text-xs sm:text-base">Type</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Category</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Title</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Amount</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Date</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Notes</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : incomes.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       No income records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   incomes.map((i) => (
//                     <tr key={i._id} className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.type}
//                             readOnly
//                             aria-label="Income Type (Read-only)"
//                           />
//                         ) : (
//                           i.type
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.category || ''}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, category: e.target.value })}
//                             aria-label="Edit Income Category"
//                           >
//                             <option value="">Select Category (Optional)</option>
//                             {INCOME_CATEGORIES.map((c) => (
//                               <option key={c} value={c}>
//                                 {c}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           i.category || '-'
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.title}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, title: e.target.value })}
//                             aria-label="Edit Income Title"
//                           />
//                         ) : (
//                           i.title
//                         )}
//                       </td>
//                       <td className="p-3 text-green-600 font-semibold text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             type="number"
//                             value={editingIncome.amount}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, amount: e.target.value })}
//                             aria-label="Edit Income Amount"
//                             min="0"
//                           />
//                         ) : (
//                           `₹${i.amount.toLocaleString()}`
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             type="date"
//                             value={editingIncome.date}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, date: e.target.value })}
//                             aria-label="Edit Income Date"
//                           />
//                         ) : (
//                           new Date(i.date).toLocaleDateString('en-IN')
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.notes || ''}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, notes: e.target.value })}
//                             aria-label="Edit Income Notes"
//                           />
//                         ) : (
//                           i.notes || '-'
//                         )}
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         {editingIncome?._id === i._id ? (
//                           <>
//                             <button
//                               onClick={saveEditIncome}
//                               className="text-green-600 hover:text-green-800"
//                               aria-label="Save Income Edit"
//                             >
//                               <FiCheck />
//                             </button>
//                             <button
//                               onClick={cancelEditIncome}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Cancel Income Edit"
//                             >
//                               <FiX />
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => startEditIncome(i)}
//                               className="text-blue-600 hover:text-blue-800"
//                               aria-label="Edit Income"
//                             >
//                               <FiEdit2 />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteIncome(i._id)}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Delete Income"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Expenses Section */}
//         <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
//           <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-red-500" /> Expenses
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newExpense.title}
//               onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Expense Title"
//             />
//             <select
//               value={newExpense.category}
//               onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Select Expense Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {EXPENSE_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newExpense.amount}
//               onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Expense Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newExpense.date}
//               onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Expense Date"
//             />
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newExpense.notes}
//               onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Expense Notes"
//             />
//             <button
//               onClick={handleAddExpense}
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full sm:w-auto"
//               aria-label="Add Expense"
//             >
//               Add
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse rounded-lg shadow-sm">
//               <thead className="bg-red-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left text-xs sm:text-base">Type</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Category</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Title</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Amount</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Date</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Notes</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : expenses.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       No expense records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   expenses.map((e) => (
//                     <tr key={e._id} className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.type}
//                             readOnly
//                             aria-label="Expense Type (Read-only)"
//                           />
//                         ) : (
//                           e.type
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.category || ''}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, category: ev.target.value })}
//                             aria-label="Edit Expense Category"
//                           >
//                             <option value="">Select Category (Optional)</option>
//                             {EXPENSE_CATEGORIES.map((c) => (
//                               <option key={c} value={c}>
//                                 {c}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           e.category || '-'
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.title}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, title: ev.target.value })}
//                             aria-label="Edit Expense Title"
//                           />
//                         ) : (
//                           e.title
//                         )}
//                       </td>
//                       <td className="p-3 text-red-600 font-semibold text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             type="number"
//                             value={editingExpense.amount}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, amount: ev.target.value })}
//                             aria-label="Edit Expense Amount"
//                             min="0"
//                           />
//                         ) : (
//                           `₹${e.amount.toLocaleString()}`
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             type="date"
//                             value={editingExpense.date}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, date: ev.target.value })}
//                             aria-label="Edit Expense Date"
//                           />
//                         ) : (
//                           new Date(e.date).toLocaleDateString('en-IN')
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.notes || ''}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, notes: ev.target.value })}
//                             aria-label="Edit Expense Notes"
//                           />
//                         ) : (
//                           e.notes || '-'
//                         )}
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         {editingExpense?._id === e._id ? (
//                           <>
//                             <button
//                               onClick={saveEditExpense}
//                               className="text-green-600 hover:text-green-800"
//                               aria-label="Save Expense Edit"
//                             >
//                               <FiCheck />
//                             </button>
//                             <button
//                               onClick={cancelEditExpense}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Cancel Expense Edit"
//                             >
//                               <FiX />
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => startEditExpense(e)}
//                               className="text-blue-600 hover:text-blue-800"
//                               aria-label="Edit Expense"
//                             >
//                               <FiEdit2 />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteExpense(e._id)}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Delete Expense"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Finance;

//--------------PAGINATION---------------


// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api';
// import {
//   FiTrendingUp,
//   FiDollarSign,
//   FiTrash2,
//   FiDownload,
//   FiLogOut,
//   FiEdit2,
//   FiCheck,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
// } from 'react-icons/fi';

// // 🔹 Predefined categories from backend schemas
// const INCOME_CATEGORIES = [
//   'MCO Meta',
//   'MCO PPC',
//   'Meta Rental',
//   'Commission',
//   'Technology Sale',
//   'Domestic Tour Package',
//   'International Tour Package',
//   'Airline Ticket',
//   'Hotel',
//   'Car Hire',
//   'Activities',
//   'Airport Transfers',
//   'Visa',
// ];

// const EXPENSE_CATEGORIES = [
//   'Salaries',
//   'Incentives',
//   'Rent',
//   'Travel Allowance Agent',
//   'Travel Allowance Owner',
//   'Meta Recharge',
//   'Chargeback',
//   'Refunds',
//   'Miscellaneous Expenses',
//   'Call Payment',
// ];

// const Finance = () => {
//   const [summary, setSummary] = useState(null);
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [newIncome, setNewIncome] = useState({
//     type: 'Income',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//   });
//   const [newExpense, setNewExpense] = useState({
//     type: 'Expense',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [editingIncome, setEditingIncome] = useState(null);
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [filterType, setFilterType] = useState('monthYear'); // 'monthYear' or 'dateRange'
//   const [currentIncomePage, setCurrentIncomePage] = useState(1);
//   const [currentExpensePage, setCurrentExpensePage] = useState(1);
//   const itemsPerPage = 10;

//   const navigate = useNavigate();

//   // 🔹 Validate input (aligned with backend)
//   const validateInput = (input) => {
//     if (!input.title || !input.amount || !input.date) {
//       setError('Title, amount, and date are required.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (isNaN(input.amount) || Number(input.amount) <= 0) {
//       setError('Amount must be a positive number.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(input.date)) {
//       setError('Invalid date format.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (input.category && input.type === 'Income' && !INCOME_CATEGORIES.includes(input.category)) {
//       setError(`Category must be one of: ${INCOME_CATEGORIES.join(', ')}.`);
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (input.category && input.type === 'Expense' && !EXPENSE_CATEGORIES.includes(input.category)) {
//       setError(`Category must be one of: ${EXPENSE_CATEGORIES.join(', ')}.`);
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Validate date range
//   const validateDateRange = () => {
//     if (filterType !== 'dateRange') return true;
//     if (!startDate || !endDate) {
//       setError('Both start date and end date are required for date range filtering.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(startDate) || !Date.parse(endDate)) {
//       setError('Invalid date format for start or end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (new Date(startDate) > new Date(endDate)) {
//       setError('Start date cannot be after end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Fetch Finance Data
//   const fetchData = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     setIsLoading(true);
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}`
//         : `month=${month}&year=${year}`;
//       const [summaryRes, incomesRes, expensesRes] = await Promise.all([
//         api.get(`/finance/summary?${query}`),
//         api.get(`/finance/incomes?${query}`),
//         api.get(`/finance/expenses?${query}`),
//       ]);
//       setSummary(summaryRes.data);
//       // Sort incomes and expenses by date in descending order (newest first)
//       setIncomes(
//         Array.isArray(incomesRes.data.incomes)
//           ? incomesRes.data.incomes.sort((a, b) => new Date(b.date) - new Date(a.date))
//           : []
//       );
//       setExpenses(
//         Array.isArray(expensesRes.data.expenses)
//           ? expensesRes.data.expenses.sort((a, b) => new Date(b.date) - new Date(a.date))
//           : []
//       );
//       setCurrentIncomePage(1);
//       setCurrentExpensePage(1);
//     } catch (err) {
//       console.error('❌ Error fetching finance data:', err);
//       setError(err.response?.data?.message || 'Failed to fetch financial data. Please try again.');
//       setTimeout(() => setError(''), 3000);
//       setIncomes([]);
//       setExpenses([]);
//       setSummary(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [month, year, startDate, endDate, filterType]);

//   // 🔹 Logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setMessage('✅ You have successfully logged out!');
//     setTimeout(() => navigate('/login'), 1500);
//   };

//   // 🔹 Excel Download
//   const handleDownloadExcel = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}`
//         : `month=${month}&year=${year}`;
//       const res = await api.get(`/finance/download/excel?${query}`, { responseType: 'blob' });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute(
//         'download',
//         filterType === 'dateRange'
//           ? `finance_report_${startDate}_to_${endDate}.xlsx`
//           : `finance_report_${month}_${year}.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('❌ Error downloading Excel:', err);
//       setError(err.response?.data?.message || 'Failed to download Excel file. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Income
//   const handleAddIncome = async () => {
//     if (!validateInput(newIncome)) return;
//     try {
//       await api.post('/finance/income', { ...newIncome, amount: Number(newIncome.amount) });
//       setNewIncome({
//         type: 'Income',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//       });
//       setMessage('✅ Income added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding income:', err);
//       setError(err.response?.data?.message || 'Failed to add income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Expense
//   const handleAddExpense = async () => {
//     if (!validateInput(newExpense)) return;
//     try {
//       await api.post('/finance/expense', { ...newExpense, amount: Number(newExpense.amount) });
//       setNewExpense({
//         type: 'Expense',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//       });
//       setMessage('✅ Expense added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding expense:', err);
//       setError(err.response?.data?.message || 'Failed to add expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Delete Handlers
//   const handleDeleteIncome = async (id) => {
//     try {
//       await api.delete(`/finance/income/${id}`);
//       setMessage('✅ Income deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting income:', err);
//       setError(err.response?.data?.message || 'Failed to delete income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleDeleteExpense = async (id) => {
//     try {
//       await api.delete(`/finance/expense/${id}`);
//       setMessage('✅ Expense deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting expense:', err);
//       setError(err.response?.data?.message || 'Failed to delete expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Edit Handlers
//   const startEditIncome = (income) => {
//     console.log('Editing income:', income); // Debug log
//     setEditingIncome({
//       ...income,
//       date: new Date(income.date).toISOString().split('T')[0],
//     });
//   };

//   const cancelEditIncome = () => setEditingIncome(null);

//   const saveEditIncome = async () => {
//     if (!validateInput(editingIncome)) return;
//     try {
//       await api.put(`/finance/income/${editingIncome._id}`, {
//         ...editingIncome,
//         amount: Number(editingIncome.amount),
//       });
//       setEditingIncome(null);
//       setMessage('✅ Income updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating income:', err);
//       setError(err.response?.data?.message || 'Failed to update income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const startEditExpense = (expense) => {
//     console.log('Editing expense:', expense); // Debug log to confirm click
//     setEditingExpense({
//       ...expense,
//       date: new Date(expense.date).toISOString().split('T')[0],
//     });
//   };

//   const cancelEditExpense = () => setEditingExpense(null);

//   const saveEditExpense = async () => {
//     if (!validateInput(editingExpense)) return;
//     try {
//       await api.put(`/finance/expense/${editingExpense._id}`, {
//         ...editingExpense,
//         amount: Number(editingExpense.amount),
//       });
//       setEditingExpense(null);
//       setMessage('✅ Expense updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating expense:', err);
//       setError(err.response?.data?.message || 'Failed to update expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // Pagination for Incomes
//   const totalIncomePages = Math.ceil(incomes.length / itemsPerPage);
//   const paginatedIncomes = incomes.slice((currentIncomePage - 1) * itemsPerPage, currentIncomePage * itemsPerPage);

//   // Pagination for Expenses
//   const totalExpensePages = Math.ceil(expenses.length / itemsPerPage);
//   const paginatedExpenses = expenses.slice((currentExpensePage - 1) * itemsPerPage, currentExpensePage * itemsPerPage);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Fixed Title Bar */}
//       <header className="fixed top-0 left-0 right-0 bg-blue-700 text-white shadow-lg z-10">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
//           <h1 className="text-xl sm:text-2xl font-bold tracking-wide">FareBuzzer Accounting Report</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition mt-2 sm:mt-0"
//             aria-label="Logout"
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </header>

//       {/* Scrollable Content */}
//       <div className="mt-20 sm:mt-16 max-w-7xl mx-auto p-4 sm:p-6 space-y-8 overflow-y-auto">


//         {/* Messages */}
//         {message && (
//           <div className="bg-green-100 text-green-700 p-3 rounded-lg shadow">{message}</div>
//         )}
//         {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg shadow">{error}</div>}

//         {/* Title + Excel Download */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">

//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
//             <FiTrendingUp className="text-blue-600" /> Accounting Dashboard
//           </h2>
//           <button
//             onClick={handleDownloadExcel}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//             aria-label="Download Excel Report"
//           >
//             <FiDownload /> Download Excel
//           </button>
//         </div>

//         {/* Filter Type Selector */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6 ">
//           <select
//             value={filterType}
//             onChange={(e) => {
//               setFilterType(e.target.value);
//               setStartDate('');
//               setEndDate('');
//               setMonth(new Date().getMonth() + 1);
//               setYear(new Date().getFullYear());
//             }}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//             aria-label="Select Filter Type"
//           >
//             <option value="monthYear">Month/Year</option>
//             <option value="dateRange">Date Range</option>
//           </select>

//           {filterType === 'monthYear' ? (
//             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//               <select
//                 value={month}
//                 onChange={(e) => setMonth(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                 aria-label="Select Month"
//               >
//                 {[...Array(12)].map((_, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={year}
//                 onChange={(e) => setYear(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                 aria-label="Select Year"
//               >
//                 {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 1 + i).map((y) => (
//                   <option key={y} value={y}>
//                     {y}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ) : (
//             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                 aria-label="Select Start Date"
//               />
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                 aria-label="Select End Date"
//               />
//             </div>
//           )}
//         </div>

//         {/* Summary */}
//         {isLoading ? (
//           <div className="text-center text-gray-500">Loading...</div>
//         ) : summary ? (
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
//             <div className="p-4 bg-green-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Income</p>
//               <p className="text-lg sm:text-xl font-bold text-green-600">
//                 ₹{summary.totalIncome.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-red-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Expenses</p>
//               <p className="text-lg sm:text-xl font-bold text-red-600">
//                 ₹{summary.totalExpense.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-blue-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Balance</p>
//               <p className="text-lg sm:text-xl font-bold text-blue-600">
//                 ₹{summary.balance.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">No summary data available.</div>
//         )}

//         {/* Income Section */}
//         <div className="bg-white p-4 sm:p-10 rounded-2xl shadow-lg">
//           <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-green-500" /> Income
//           </h3>
//           {/* <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap "> */}
//           <div className="flex flex-col sm:flex-row gap-3 mb-4">


//             <input
//               type="text"
//               placeholder="Title"
//               value={newIncome.title}
//               onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
//               // className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Income Title"
//             />
//             <select
//               value={newIncome.category}
//               onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Select Income Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {INCOME_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newIncome.amount}
//               onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Income Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newIncome.date}
//               onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Income Date"
//             />
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newIncome.notes}
//               onChange={(e) => setNewIncome({ ...newIncome, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Income Notes"
//             />
//             <button
//               onClick={handleAddIncome}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
//               aria-label="Add Income"
//             >
//               Add
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse rounded-lg shadow-sm">
//               <thead className="bg-green-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left text-xs sm:text-base">Type</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Category</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Title</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Amount</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Date</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Notes</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : paginatedIncomes.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       No income records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedIncomes.map((i) => (
//                     <tr key={i._id} className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.type}
//                             readOnly
//                             aria-label="Income Type (Read-only)"
//                           />
//                         ) : (
//                           i.type
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.category || ''}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, category: e.target.value })}
//                             aria-label="Edit Income Category"
//                           >
//                             <option value="">Select Category (Optional)</option>
//                             {INCOME_CATEGORIES.map((c) => (
//                               <option key={c} value={c}>
//                                 {c}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           i.category || '-'
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.title}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, title: e.target.value })}
//                             aria-label="Edit Income Title"
//                           />
//                         ) : (
//                           i.title
//                         )}
//                       </td>
//                       <td className="p-3 text-green-600 font-semibold text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             type="number"
//                             value={editingIncome.amount}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, amount: e.target.value })}
//                             aria-label="Edit Income Amount"
//                             min="0"
//                           />
//                         ) : (
//                           `₹${i.amount.toLocaleString()}`
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             type="date"
//                             value={editingIncome.date}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, date: e.target.value })}
//                             aria-label="Edit Income Date"
//                           />
//                         ) : (
//                           new Date(i.date).toLocaleDateString('en-IN')
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.notes || ''}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, notes: e.target.value })}
//                             aria-label="Edit Income Notes"
//                           />
//                         ) : (
//                           i.notes || '-'
//                         )}
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         {editingIncome?._id === i._id ? (
//                           <>
//                             <button
//                               onClick={saveEditIncome}
//                               className="text-green-600 hover:text-green-800"
//                               aria-label="Save Income Edit"
//                             >
//                               <FiCheck />
//                             </button>
//                             <button
//                               onClick={cancelEditIncome}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Cancel Income Edit"
//                             >
//                               <FiX />
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => startEditIncome(i)}
//                               className="text-blue-600 hover:text-blue-800"
//                               aria-label="Edit Income"
//                             >
//                               <FiEdit2 />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteIncome(i._id)}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Delete Income"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {/* Income Pagination */}
//           {totalIncomePages > 1 && (
//             <div className="flex justify-center items-center gap-4 mt-4">
//               <button
//                 onClick={() => setCurrentIncomePage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentIncomePage === 1}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Previous Income Page"
//               >
//                 <FiChevronLeft /> Previous
//               </button>
//               <span className="text-gray-700">
//                 Page {currentIncomePage} of {totalIncomePages}
//               </span>
//               <button
//                 onClick={() => setCurrentIncomePage((prev) => Math.min(prev + 1, totalIncomePages))}
//                 disabled={currentIncomePage === totalIncomePages}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Next Income Page"
//               >
//                 Next <FiChevronRight />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Expenses Section */}
//         <div className="bg-white p-4 sm:p-10 rounded-2xl shadow-lg">
//           <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-red-500" /> Expenses
//           </h3>
//           {/* <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap"> */}
//           <div className="flex flex-col sm:flex-row gap-3 mb-4">

//             <input
//               type="text"
//               placeholder="Title"
//               value={newExpense.title}
//               onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Expense Title"
//             />
//             <select
//               value={newExpense.category}
//               onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Select Expense Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {EXPENSE_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newExpense.amount}
//               onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Expense Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newExpense.date}
//               onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Expense Date"
//             />
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newExpense.notes}
//               onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Expense Notes"
//             />
//             <button
//               onClick={handleAddExpense}
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full sm:w-auto"
//               aria-label="Add Expense"
//             >
//               Add
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse rounded-lg shadow-sm">
//               <thead className="bg-red-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left text-xs sm:text-base">Type</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Category</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Title</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Amount</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Date</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Notes</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : paginatedExpenses.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       No expense records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedExpenses.map((e) => (
//                     <tr key={e._id} className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.type}
//                             readOnly
//                             aria-label="Expense Type (Read-only)"
//                           />
//                         ) : (
//                           e.type
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.category || ''}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, category: ev.target.value })}
//                             aria-label="Edit Expense Category"
//                           >
//                             <option value="">Select Category (Optional)</option>
//                             {EXPENSE_CATEGORIES.map((c) => (
//                               <option key={c} value={c}>
//                                 {c}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           e.category || '-'
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.title}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, title: ev.target.value })}
//                             aria-label="Edit Expense Title"
//                           />
//                         ) : (
//                           e.title
//                         )}
//                       </td>
//                       <td className="p-3 text-red-600 font-semibold text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             type="number"
//                             value={editingExpense.amount}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, amount: ev.target.value })}
//                             aria-label="Edit Expense Amount"
//                             min="0"
//                           />
//                         ) : (
//                           `₹${e.amount.toLocaleString()}`
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             type="date"
//                             value={editingExpense.date}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, date: ev.target.value })}
//                             aria-label="Edit Expense Date"
//                           />
//                         ) : (
//                           new Date(e.date).toLocaleDateString('en-IN')
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.notes || ''}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, notes: ev.target.value })}
//                             aria-label="Edit Expense Notes"
//                           />
//                         ) : (
//                           e.notes || '-'
//                         )}
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         {editingExpense?._id === e._id ? (
//                           <>
//                             <button
//                               onClick={saveEditExpense}
//                               className="text-green-600 hover:text-green-800"
//                               aria-label="Save Expense Edit"
//                             >
//                               <FiCheck />
//                             </button>
//                             <button
//                               onClick={cancelEditExpense}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Cancel Expense Edit"
//                             >
//                               <FiX />
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => startEditExpense(e)}
//                               className="text-blue-600 hover:text-blue-800"
//                               aria-label="Edit Expense"
//                             >
//                               <FiEdit2 />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteExpense(e._id)}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Delete Expense"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {/* Expense Pagination */}
//           {totalExpensePages > 1 && (
//             <div className="flex justify-center items-center gap-4 mt-4">
//               <button
//                 onClick={() => setCurrentExpensePage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentExpensePage === 1}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Previous Expense Page"
//               >
//                 <FiChevronLeft /> Previous
//               </button>
//               <span className="text-gray-700">
//                 Page {currentExpensePage} of {totalExpensePages}
//               </span>
//               <button
//                 onClick={() => setCurrentExpensePage((prev) => Math.min(prev + 1, totalExpensePages))}
//                 disabled={currentExpensePage === totalExpensePages}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Next Expense Page"
//               >
//                 Next <FiChevronRight />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Finance;

//-------------------------


// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api';
// import {
//   FiTrendingUp,
//   FiDollarSign,
//   FiTrash2,
//   FiDownload,
//   FiLogOut,
//   FiEdit2,
//   FiCheck,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
// } from 'react-icons/fi';

// // 🔹 Predefined categories from backend schemas
// const INCOME_CATEGORIES = [
//   'MCO Meta',
//   'MCO PPC',
//   'Meta Rental',
//   'Commission',
//   'Technology Sale',
//   'Domestic Tour Package',
//   'International Tour Package',
//   'Airline Ticket',
//   'Hotel',
//   'Car Hire',
//   'Activities',
//   'Airport Transfers',
//   'Visa',
// ];

// const EXPENSE_CATEGORIES = [
//   'Salaries',
//   'Incentives',
//   'Rent',
//   'Travel Allowance Agent',
//   'Travel Allowance Owner',
//   'Meta Recharge',
//   'Chargeback',
//   'Refunds',
//   'Miscellaneous Expenses',
//   'Call Payment',
// ];

// const CURRENCIES = ['USD', 'AED', 'INR', 'CAD', 'AUD'];

// const Finance = () => {
//   const [summary, setSummary] = useState(null);
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [newIncome, setNewIncome] = useState({
//     type: 'Income',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//     currency: 'INR',
//   });
//   const [newExpense, setNewExpense] = useState({
//     type: 'Expense',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//     currency: 'INR',
//   });
//   const [selectedCurrency, setSelectedCurrency] = useState('INR');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [editingIncome, setEditingIncome] = useState(null);
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [filterType, setFilterType] = useState('monthYear');
//   const [currentIncomePage, setCurrentIncomePage] = useState(1);
//   const [currentExpensePage, setCurrentExpensePage] = useState(1);
//   const itemsPerPage = 10;

//   const navigate = useNavigate();

//   // 🔹 Currency symbol mapping
//   const currencySymbols = {
//     USD: '$',
//     AED: 'د.إ',
//     INR: '₹',
//     CAD: 'C$',
//     AUD: 'A$',
//   };

//   // 🔹 Currency conversion rates (simplified, replace with real rates from API or backend)
//   const conversionRates = {
//     USD: 0.012, // Approx. USD to INR
//     AED: 0.044, // Approx. AED to INR
//     INR: 1,     // Base currency
//     CAD: 0.016, // Approx. CAD to INR
//     AUD: 0.018, // Approx. CAD to INR
//   };

//   // 🔹 Convert amount to different currencies
//   const convertAmount = (amount, fromCurrency, toCurrency) => {
//     const baseAmount = amount / conversionRates[fromCurrency]; // Convert to base (INR)
//     return Math.round(baseAmount * conversionRates[toCurrency] * 100) / 100; // Convert to target currency with 2 decimal places
//   };

//   // 🔹 Validate input
//   const validateInput = (input) => {
//     if (!input.title || !input.amount || !input.date || !input.currency) {
//       setError('Title, amount, date, and currency are required.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (isNaN(input.amount) || Number(input.amount) <= 0) {
//       setError('Amount must be a positive number.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(input.date)) {
//       setError('Invalid date format.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (input.category && input.type === 'Income' && !INCOME_CATEGORIES.includes(input.category)) {
//       setError(`Category must be one of: ${INCOME_CATEGORIES.join(', ')}.`);
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (input.category && input.type === 'Expense' && !EXPENSE_CATEGORIES.includes(input.category)) {
//       setError(`Category must be one of: ${EXPENSE_CATEGORIES.join(', ')}.`);
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!CURRENCIES.includes(input.currency)) {
//       setError(`Currency must be one of: ${CURRENCIES.join(', ')}.`);
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Validate date range
//   const validateDateRange = () => {
//     if (filterType !== 'dateRange') return true;
//     if (!startDate || !endDate) {
//       setError('Both start date and end date are required for date range filtering.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(startDate) || !Date.parse(endDate)) {
//       setError('Invalid date format for start or end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (new Date(startDate) > new Date(endDate)) {
//       setError('Start date cannot be after end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Fetch Finance Data
//   const fetchData = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     setIsLoading(true);
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}&currency=${selectedCurrency}`
//         : `month=${month}&year=${year}&currency=${selectedCurrency}`;
//       const [summaryRes, incomesRes, expensesRes] = await Promise.all([
//         api.get(`/finance/summary?${query}`),
//         api.get(`/finance/incomes?${query}`),
//         api.get(`/finance/expenses?${query}`),
//       ]);
//       setSummary(summaryRes.data);
//       setIncomes(
//         Array.isArray(incomesRes.data.incomes)
//           ? incomesRes.data.incomes.map(i => ({
//               ...i,
//               amount: i.currency === selectedCurrency ? i.amount : convertAmount(i.amount, i.currency, selectedCurrency),
//             })).sort((a, b) => new Date(b.date) - new Date(a.date))
//           : []
//       );
//       setExpenses(
//         Array.isArray(expensesRes.data.expenses)
//           ? expensesRes.data.expenses.map(e => ({
//               ...e,
//               amount: e.currency === selectedCurrency ? e.amount : convertAmount(e.amount, e.currency, selectedCurrency),
//             })).sort((a, b) => new Date(b.date) - new Date(a.date))
//           : []
//       );
//       setCurrentIncomePage(1);
//       setCurrentExpensePage(1);
//     } catch (err) {
//       console.error('❌ Error fetching finance data:', err);
//       setError(err.response?.data?.message || 'Failed to fetch financial data. Please try again.');
//       setTimeout(() => setError(''), 3000);
//       setIncomes([]);
//       setExpenses([]);
//       setSummary(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [month, year, startDate, endDate, filterType, selectedCurrency]);

//   // 🔹 Logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setMessage('✅ You have successfully logged out!');
//     setTimeout(() => navigate('/login'), 1500);
//   };

//   // 🔹 Excel Download
//   const handleDownloadExcel = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}&currency=${selectedCurrency}`
//         : `month=${month}&year=${year}&currency=${selectedCurrency}`;
//       const res = await api.get(`/finance/download/excel?${query}`, { responseType: 'blob' });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute(
//         'download',
//         filterType === 'dateRange'
//           ? `finance_report_${startDate}_to_${endDate}_${selectedCurrency}.xlsx`
//           : `finance_report_${month}_${year}_${selectedCurrency}.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('❌ Error downloading Excel:', err);
//       setError(err.response?.data?.message || 'Failed to download Excel file. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Income
//   const handleAddIncome = async () => {
//     if (!validateInput(newIncome)) return;
//     try {
//       await api.post('/finance/income', { ...newIncome, amount: Number(newIncome.amount) });
//       setNewIncome({
//         type: 'Income',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//         currency: selectedCurrency,
//       });
//       setMessage('✅ Income added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding income:', err);
//       setError(err.response?.data?.message || 'Failed to add income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Expense
//   const handleAddExpense = async () => {
//     if (!validateInput(newExpense)) return;
//     try {
//       await api.post('/finance/expense', { ...newExpense, amount: Number(newExpense.amount) });
//       setNewExpense({
//         type: 'Expense',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//         currency: selectedCurrency,
//       });
//       setMessage('✅ Expense added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding expense:', err);
//       setError(err.response?.data?.message || 'Failed to add expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Delete Handlers
//   const handleDeleteIncome = async (id) => {
//     try {
//       await api.delete(`/finance/income/${id}`);
//       setMessage('✅ Income deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting income:', err);
//       setError(err.response?.data?.message || 'Failed to delete income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleDeleteExpense = async (id) => {
//     try {
//       await api.delete(`/finance/expense/${id}`);
//       setMessage('✅ Expense deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting expense:', err);
//       setError(err.response?.data?.message || 'Failed to delete expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Edit Handlers
//   const startEditIncome = (income) => {
//     setEditingIncome({
//       ...income,
//       date: new Date(income.date).toISOString().split('T')[0],
//     });
//   };

//   const cancelEditIncome = () => setEditingIncome(null);

//   const saveEditIncome = async () => {
//     if (!validateInput(editingIncome)) return;
//     try {
//       await api.put(`/finance/income/${editingIncome._id}`, {
//         ...editingIncome,
//         amount: Number(editingIncome.amount),
//       });
//       setEditingIncome(null);
//       setMessage('✅ Income updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating income:', err);
//       setError(err.response?.data?.message || 'Failed to update income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const startEditExpense = (expense) => {
//     setEditingExpense({
//       ...expense,
//       date: new Date(expense.date).toISOString().split('T')[0],
//     });
//   };

//   const cancelEditExpense = () => setEditingExpense(null);

//   const saveEditExpense = async () => {
//     if (!validateInput(editingExpense)) return;
//     try {
//       await api.put(`/finance/expense/${editingExpense._id}`, {
//         ...editingExpense,
//         amount: Number(editingExpense.amount),
//       });
//       setEditingExpense(null);
//       setMessage('✅ Expense updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating expense:', err);
//       setError(err.response?.data?.message || 'Failed to update expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // Pagination for Incomes
//   const totalIncomePages = Math.ceil(incomes.length / itemsPerPage);
//   const paginatedIncomes = incomes.slice((currentIncomePage - 1) * itemsPerPage, currentIncomePage * itemsPerPage);

//   // Pagination for Expenses
//   const totalExpensePages = Math.ceil(expenses.length / itemsPerPage);
//   const paginatedExpenses = expenses.slice((currentExpensePage - 1) * itemsPerPage, currentExpensePage * itemsPerPage);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Fixed Title Bar */}
//       <header className="fixed top-0 left-0 right-0 bg-blue-700 text-white shadow-lg z-10">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
//           <h1 className="text-xl sm:text-2xl font-bold tracking-wide">FareBuzzer Accounting Report</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition mt-2 sm:mt-0"
//             aria-label="Logout"
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </header>

//       {/* Scrollable Content */}
//       <div className="mt-20 sm:mt-16 max-w-7xl mx-auto p-4 sm:p-6 space-y-8 overflow-y-auto">
//         {/* Messages */}
//         {message && (
//           <div className="bg-green-100 text-green-700 p-3 rounded-lg shadow">{message}</div>
//         )}
//         {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg shadow">{error}</div>}

//         {/* Title + Excel Download */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
//             <FiTrendingUp className="text-blue-600" /> Accounting Dashboard
//           </h2>
//           <button
//             onClick={handleDownloadExcel}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//             aria-label="Download Excel Report"
//           >
//             <FiDownload /> Download Excel
//           </button>
//         </div>

//         {/* Filter Type and Currency Selector */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <select
//             value={filterType}
//             onChange={(e) => {
//               setFilterType(e.target.value);
//               setStartDate('');
//               setEndDate('');
//               setMonth(new Date().getMonth() + 1);
//               setYear(new Date().getFullYear());
//             }}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
//             aria-label="Select Filter Type"
//           >
//             <option value="monthYear">Month/Year</option>
//             <option value="dateRange">Date Range</option>
//           </select>

//           <select
//             value={selectedCurrency}
//             onChange={(e) => setSelectedCurrency(e.target.value)}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
//             aria-label="Select Currency"
//           >
//             {CURRENCIES.map((currency) => (
//               <option key={currency} value={currency}>
//                 {currency}
//               </option>
//             ))}
//           </select>

//           {filterType === 'monthYear' ? (
//             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//               <select
//                 value={month}
//                 onChange={(e) => setMonth(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
//                 aria-label="Select Month"
//               >
//                 {[...Array(12)].map((_, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={year}
//                 onChange={(e) => setYear(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
//                 aria-label="Select Year"
//               >
//                 {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 1 + i).map((y) => (
//                   <option key={y} value={y}>
//                     {y}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ) : (
//             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
//                 aria-label="Select Start Date"
//               />
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
//                 aria-label="Select End Date"
//               />
//             </div>
//           )}
//         </div>

//         {/* Summary */}
//         {isLoading ? (
//           <div className="text-center text-gray-500">Loading...</div>
//         ) : summary ? (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
//               <div className="p-4 bg-green-50 rounded-lg shadow">
//                 <p className="text-sm text-gray-500">Total Income</p>
//                 <p className="text-lg sm:text-xl font-bold text-green-600">
//                   {currencySymbols[selectedCurrency]}{summary.totalIncome.toLocaleString()}
//                 </p>
//               </div>
//               <div className="p-4 bg-red-50 rounded-lg shadow">
//                 <p className="text-sm text-gray-500">Total Expenses</p>
//                 <p className="text-lg sm:text-xl font-bold text-red-600">
//                   {currencySymbols[selectedCurrency]}{summary.totalExpense.toLocaleString()}
//                 </p>
//               </div>
//               <div className="p-4 bg-blue-50 rounded-lg shadow">
//                 <p className="text-sm text-gray-500">Balance</p>
//                 <p className="text-lg sm:text-xl font-bold text-blue-600">
//                   {currencySymbols[selectedCurrency]}{summary.balance.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//             {/* Multi-Currency Summary */}
//             <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-4 text-center">
//               {CURRENCIES.map((currency) => (
//                 <div key={currency} className="p-4 bg-gray-50 rounded-lg shadow">
//                   <p className="text-sm text-gray-500">{currency}</p>
//                   <p className="text-sm font-bold text-green-600">
//                     Income: {currencySymbols[currency]}{convertAmount(summary.totalIncome, selectedCurrency, currency).toLocaleString()}
//                   </p>
//                   <p className="text-sm font-bold text-red-600">
//                     Expenses: {currencySymbols[currency]}{convertAmount(summary.totalExpense, selectedCurrency, currency).toLocaleString()}
//                   </p>
//                   <p className="text-sm font-bold text-blue-600">
//                     Balance: {currencySymbols[currency]}{convertAmount(summary.balance, selectedCurrency, currency).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <div className="text-center text-gray-500">No summary data available.</div>
//         )}

//         {/* Income Section */}
//         <div className="bg-white p-4 sm:p-10 rounded-2xl shadow-lg">
//           <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-green-500" /> Income
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newIncome.title}
//               onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Income Title"
//             />
//             <select
//               value={newIncome.category}
//               onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Select Income Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {INCOME_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newIncome.amount}
//               onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Income Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newIncome.date}
//               onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Income Date"
//             />
//             <select
//               value={newIncome.currency}
//               onChange={(e) => setNewIncome({ ...newIncome, currency: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Select Income Currency"
//             >
//               {CURRENCIES.map((currency) => (
//                 <option key={currency} value={currency}>
//                   {currency}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newIncome.notes}
//               onChange={(e) => setNewIncome({ ...newIncome, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Income Notes"
//             />
//             <button
//               onClick={handleAddIncome}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
//               aria-label="Add Income"
//             >
//               Add
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse rounded-lg shadow-sm">
//               <thead className="bg-green-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left text-xs sm:text-base">Type</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Category</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Title</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Amount</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Currency</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Date</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Notes</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan="8" className="p-3 text-center text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : paginatedIncomes.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="p-3 text-center text-gray-500">
//                       No income records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedIncomes.map((i) => (
//                     <tr key={i._id} className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.type}
//                             readOnly
//                             aria-label="Income Type (Read-only)"
//                           />
//                         ) : (
//                           i.type
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.category || ''}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, category: e.target.value })}
//                             aria-label="Edit Income Category"
//                           >
//                             <option value="">Select Category (Optional)</option>
//                             {INCOME_CATEGORIES.map((c) => (
//                               <option key={c} value={c}>
//                                 {c}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           i.category || '-'
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.title}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, title: e.target.value })}
//                             aria-label="Edit Income Title"
//                           />
//                         ) : (
//                           i.title
//                         )}
//                       </td>
//                       <td className="p-3 text-green-600 font-semibold text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             type="number"
//                             value={editingIncome.amount}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, amount: e.target.value })}
//                             aria-label="Edit Income Amount"
//                             min="0"
//                           />
//                         ) : (
//                           `${currencySymbols[selectedCurrency]}${i.amount.toLocaleString()}`
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.currency}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, currency: e.target.value })}
//                             aria-label="Edit Income Currency"
//                           >
//                             {CURRENCIES.map((currency) => (
//                               <option key={currency} value={currency}>
//                                 {currency}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           i.currency || selectedCurrency // Ensure currency is displayed
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             type="date"
//                             value={editingIncome.date}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, date: e.target.value })}
//                             aria-label="Edit Income Date"
//                           />
//                         ) : (
//                           new Date(i.date).toLocaleDateString('en-IN')
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.notes || ''}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, notes: e.target.value })}
//                             aria-label="Edit Income Notes"
//                           />
//                         ) : (
//                           i.notes || '-'
//                         )}
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         {editingIncome?._id === i._id ? (
//                           <>
//                             <button
//                               onClick={saveEditIncome}
//                               className="text-green-600 hover:text-green-800"
//                               aria-label="Save Income Edit"
//                             >
//                               <FiCheck />
//                             </button>
//                             <button
//                               onClick={cancelEditIncome}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Cancel Income Edit"
//                             >
//                               <FiX />
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => startEditIncome(i)}
//                               className="text-blue-600 hover:text-blue-800"
//                               aria-label="Edit Income"
//                             >
//                               <FiEdit2 />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteIncome(i._id)}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Delete Income"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {/* Income Pagination */}
//           {totalIncomePages > 1 && (
//             <div className="flex justify-center items-center gap-4 mt-4">
//               <button
//                 onClick={() => setCurrentIncomePage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentIncomePage === 1}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Previous Income Page"
//               >
//                 <FiChevronLeft /> Previous
//               </button>
//               <span className="text-gray-700">
//                 Page {currentIncomePage} of {totalIncomePages}
//               </span>
//               <button
//                 onClick={() => setCurrentIncomePage((prev) => Math.min(prev + 1, totalIncomePages))}
//                 disabled={currentIncomePage === totalIncomePages}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Next Income Page"
//               >
//                 Next <FiChevronRight />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Expenses Section */}
//         <div className="bg-white p-4 sm:p-10 rounded-2xl shadow-lg">
//           <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-red-500" /> Expenses
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newExpense.title}
//               onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Expense Title"
//             />
//             <select
//               value={newExpense.category}
//               onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Select Expense Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {EXPENSE_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newExpense.amount}
//               onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Expense Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newExpense.date}
//               onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Expense Date"
//             />
//             <select
//               value={newExpense.currency}
//               onChange={(e) => setNewExpense({ ...newExpense, currency: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Select Expense Currency"
//             >
//               {CURRENCIES.map((currency) => (
//                 <option key={currency} value={currency}>
//                   {currency}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newExpense.notes}
//               onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Expense Notes"
//             />
//             <button
//               onClick={handleAddExpense}
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full sm:w-auto"
//               aria-label="Add Expense"
//             >
//               Add
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse rounded-lg shadow-sm">
//               <thead className="bg-red-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left text-xs sm:text-base">Type</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Category</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Title</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Amount</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Currency</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Date</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Notes</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan="8" className="p-3 text-center text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : paginatedExpenses.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="p-3 text-center text-gray-500">
//                       No expense records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedExpenses.map((e) => (
//                     <tr key={e._id} className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.type}
//                             readOnly
//                             aria-label="Expense Type (Read-only)"
//                           />
//                         ) : (
//                           e.type
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.category || ''}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, category: ev.target.value })}
//                             aria-label="Edit Expense Category"
//                           >
//                             <option value="">Select Category (Optional)</option>
//                             {EXPENSE_CATEGORIES.map((c) => (
//                               <option key={c} value={c}>
//                                 {c}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           e.category || '-'
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.title}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, title: ev.target.value })}
//                             aria-label="Edit Expense Title"
//                           />
//                         ) : (
//                           e.title
//                         )}
//                       </td>
//                       <td className="p-3 text-red-600 font-semibold text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             type="number"
//                             value={editingExpense.amount}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, amount: ev.target.value })}
//                             aria-label="Edit Expense Amount"
//                             min="0"
//                           />
//                         ) : (
//                           `${currencySymbols[selectedCurrency]}${e.amount.toLocaleString()}`
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.currency}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, currency: ev.target.value })}
//                             aria-label="Edit Expense Currency"
//                           >
//                             {CURRENCIES.map((currency) => (
//                               <option key={currency} value={currency}>
//                                 {currency}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           e.currency || selectedCurrency // Ensure currency is displayed
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             type="date"
//                             value={editingExpense.date}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, date: ev.target.value })}
//                             aria-label="Edit Expense Date"
//                           />
//                         ) : (
//                           new Date(e.date).toLocaleDateString('en-IN')
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.notes || ''}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, notes: ev.target.value })}
//                             aria-label="Edit Expense Notes"
//                           />
//                         ) : (
//                           e.notes || '-'
//                         )}
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         {editingExpense?._id === e._id ? (
//                           <>
//                             <button
//                               onClick={saveEditExpense}
//                               className="text-green-600 hover:text-green-800"
//                               aria-label="Save Expense Edit"
//                             >
//                               <FiCheck />
//                             </button>
//                             <button
//                               onClick={cancelEditExpense}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Cancel Expense Edit"
//                             >
//                               <FiX />
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => startEditExpense(e)}
//                               className="text-blue-600 hover:text-blue-800"
//                               aria-label="Edit Expense"
//                             >
//                               <FiEdit2 />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteExpense(e._id)}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Delete Expense"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {/* Expense Pagination */}
//           {totalExpensePages > 1 && (
//             <div className="flex justify-center items-center gap-4 mt-4">
//               <button
//                 onClick={() => setCurrentExpensePage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentExpensePage === 1}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Previous Expense Page"
//               >
//                 <FiChevronLeft /> Previous
//               </button>
//               <span className="text-gray-700">
//                 Page {currentExpensePage} of {totalExpensePages}
//               </span>
//               <button
//                 onClick={() => setCurrentExpensePage((prev) => Math.min(prev + 1, totalExpensePages))}
//                 disabled={currentExpensePage === totalExpensePages}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Next Expense Page"
//               >
//                 Next <FiChevronRight />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Finance;

//------------------




// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api';
// import {
//   FiTrendingUp,
//   FiDollarSign,
//   FiTrash2,
//   FiDownload,
//   FiLogOut,
//   FiEdit2,
//   FiCheck,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
// } from 'react-icons/fi';

// // 🔹 Predefined categories from backend schemas
// const INCOME_CATEGORIES = [
//   'MCO Meta',
//   'MCO PPC',
//   'Meta Rental',
//   'Commission',
//   'Technology Sale',
//   'Domestic Tour Package',
//   'International Tour Package',
//   'Airline Ticket',
//   'Hotel',
//   'Car Hire',
//   'Activities',
//   'Airport Transfers',
//   'Visa',
// ];

// const EXPENSE_CATEGORIES = [
//   'Salaries',
//   'Incentives',
//   'Rent',
//   'Travel Allowance Agent',
//   'Travel Allowance Owner',
//   'Meta Recharge',
//   'Chargeback',
//   'Refunds',
//   'Miscellaneous Expenses',
//   'Call Payment',
// ];

// const CURRENCIES = ['USD', 'AED', 'INR', 'CAD', 'AUD'];

// const Finance = () => {
//   const [summary, setSummary] = useState(null);
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [newIncome, setNewIncome] = useState({
//     type: 'Income',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//     currency: 'INR', // Default currency
//   });
//   const [newExpense, setNewExpense] = useState({
//     type: 'Expense',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//     currency: 'INR', // Default currency
//   });
//   const [selectedCurrency, setSelectedCurrency] = useState('INR');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [editingIncome, setEditingIncome] = useState(null);
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [filterType, setFilterType] = useState('monthYear');
//   const [currentIncomePage, setCurrentIncomePage] = useState(1);
//   const [currentExpensePage, setCurrentExpensePage] = useState(1);
//   const itemsPerPage = 10;

//   const navigate = useNavigate();

//   // 🔹 Currency symbol mapping
//   const currencySymbols = {
//     USD: '$',
//     AED: 'د.إ',
//     INR: '₹',
//     CAD: 'C$',
//     AUD: 'A$',
//   };

//   // 🔹 Currency conversion rates
//   // const conversionRates = {
//   //   USD: 0.012,
//   //   AED: 0.044,
//   //   INR: 1,
//   //   CAD: 0.016,
//   //   AUD: 0.018,
//   // };


//   const conversionRates = {
//   USD: 83.33,    // 1 USD = ~83.33 INR
//   AED: 22.67,    // 1 AED = ~22.67 INR
//   INR: 1,        // Base currency
//   CAD: 61.50,    // 1 CAD = ~61.50 INR
//   AUD: 54.00,    // 1 AUD = ~54.00 INR
// };
//   // 🔹 Convert amount to different currencies
//   const convertAmount = (amount, fromCurrency, toCurrency) => {
//     if (isNaN(amount) || amount === null || amount === undefined) {
//       return 0;
//     }

//     if (fromCurrency === toCurrency) {
//       return Number(amount);
//     }

//     try {
//       const amountInINR = Number(amount) / conversionRates[fromCurrency];
//       const convertedAmount = amountInINR * conversionRates[toCurrency];
//       return Math.round(convertedAmount * 100) / 100;
//     } catch (error) {
//       return Number(amount) || 0;
//     }
//   };

//   // 🔹 Validate input
//   const validateInput = (input) => {
//     if (!input.title || !input.amount || !input.date || !input.currency) {
//       setError('Title, amount, date, and currency are required.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (isNaN(input.amount) || Number(input.amount) <= 0) {
//       setError('Amount must be a positive number.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Validate date range
//   const validateDateRange = () => {
//     if (filterType !== 'dateRange') return true;
//     if (!startDate || !endDate) {
//       setError('Both start date and end date are required for date range filtering.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (new Date(startDate) > new Date(endDate)) {
//       setError('Start date cannot be after end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Fetch Finance Data
//   const fetchData = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     setIsLoading(true);
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}&currency=${selectedCurrency}`
//         : `month=${month}&year=${year}&currency=${selectedCurrency}`;

//       const [summaryRes, incomesRes, expensesRes] = await Promise.all([
//         api.get(`/finance/summary?${query}`),
//         api.get(`/finance/incomes?${query}`),
//         api.get(`/finance/expenses?${query}`),
//       ]);

//       setSummary(summaryRes.data);

//       // Process incomes - IMPORTANT: Use the currency from backend response
//       const processedIncomes = Array.isArray(incomesRes.data?.incomes) 
//         ? incomesRes.data.incomes.map(i => {
//             // Use the currency from the backend response, don't convert if already in correct currency
//             const displayAmount = i.currency === selectedCurrency 
//               ? Number(i.amount) 
//               : convertAmount(i.amount, i.currency, selectedCurrency);

//             return {
//               ...i,
//               amount: isNaN(displayAmount) ? 0 : displayAmount,
//               // Keep the original currency from backend
//               currency: i.currency || 'INR',
//             };
//           }).sort((a, b) => new Date(b.date) - new Date(a.date))
//         : [];

//       setIncomes(processedIncomes);

//       // Process expenses - IMPORTANT: Use the currency from backend response
//       const processedExpenses = Array.isArray(expensesRes.data?.expenses)
//         ? expensesRes.data.expenses.map(e => {
//             const displayAmount = e.currency === selectedCurrency 
//               ? Number(e.amount)
//               : convertAmount(e.amount, e.currency, selectedCurrency);

//             return {
//               ...e,
//               amount: isNaN(displayAmount) ? 0 : displayAmount,
//               // Keep the original currency from backend
//               currency: e.currency || 'INR',
//             };
//           }).sort((a, b) => new Date(b.date) - new Date(a.date))
//         : [];

//       setExpenses(processedExpenses);

//       // Debug logs to check what currency comes from backend
//       console.log('Raw incomes from backend:', incomesRes.data?.incomes);
//       console.log('Raw expenses from backend:', expensesRes.data?.expenses);

//     } catch (err) {
//       console.error('❌ Error fetching finance data:', err);
//       setError(err.response?.data?.message || 'Failed to fetch financial data. Please try again.');
//       setTimeout(() => setError(''), 3000);
//       setIncomes([]);
//       setExpenses([]);
//       setSummary(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [month, year, startDate, endDate, filterType, selectedCurrency]);

//   // 🔹 Logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setMessage('✅ You have successfully logged out!');
//     setTimeout(() => navigate('/login'), 1500);
//   };

//   // 🔹 Excel Download
//   const handleDownloadExcel = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}&currency=${selectedCurrency}`
//         : `month=${month}&year=${year}&currency=${selectedCurrency}`;
//       const res = await api.get(`/finance/download/excel?${query}`, { responseType: 'blob' });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute(
//         'download',
//         filterType === 'dateRange'
//           ? `finance_report_${startDate}_to_${endDate}_${selectedCurrency}.xlsx`
//           : `finance_report_${month}_${year}_${selectedCurrency}.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('❌ Error downloading Excel:', err);
//       setError(err.response?.data?.message || 'Failed to download Excel file. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Income - FIXED: Send the selected currency to backend
//   const handleAddIncome = async () => {
//     if (!validateInput(newIncome)) return;
//     try {
//       const incomeData = {
//         ...newIncome,
//         amount: Number(newIncome.amount),
//         currency: newIncome.currency, // Send the selected currency
//       };

//       console.log('Sending income data to backend:', incomeData); // Debug log

//       await api.post('/finance/income', incomeData);
//       setNewIncome({
//         type: 'Income',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//         currency: selectedCurrency, // Reset to selected currency
//       });
//       setMessage('✅ Income added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding income:', err);
//       setError(err.response?.data?.message || 'Failed to add income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Expense - FIXED: Send the selected currency to backend
//   const handleAddExpense = async () => {
//     if (!validateInput(newExpense)) return;
//     try {
//       const expenseData = {
//         ...newExpense,
//         amount: Number(newExpense.amount),
//         currency: newExpense.currency, // Send the selected currency
//       };

//       console.log('Sending expense data to backend:', expenseData); // Debug log

//       await api.post('/finance/expense', expenseData);
//       setNewExpense({
//         type: 'Expense',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//         currency: selectedCurrency, // Reset to selected currency
//       });
//       setMessage('✅ Expense added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding expense:', err);
//       setError(err.response?.data?.message || 'Failed to add expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Delete Handlers
//   const handleDeleteIncome = async (id) => {
//     try {
//       await api.delete(`/finance/income/${id}`);
//       setMessage('✅ Income deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting income:', err);
//       setError(err.response?.data?.message || 'Failed to delete income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleDeleteExpense = async (id) => {
//     try {
//       await api.delete(`/finance/expense/${id}`);
//       setMessage('✅ Expense deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting expense:', err);
//       setError(err.response?.data?.message || 'Failed to delete expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Edit Handlers
//   const startEditIncome = (income) => {
//     setEditingIncome({
//       ...income,
//       date: new Date(income.date).toISOString().split('T')[0],
//     });
//   };

//   const cancelEditIncome = () => setEditingIncome(null);

//   const saveEditIncome = async () => {
//     if (!validateInput(editingIncome)) return;
//     try {
//       await api.put(`/finance/income/${editingIncome._id}`, {
//         ...editingIncome,
//         amount: Number(editingIncome.amount),
//       });
//       setEditingIncome(null);
//       setMessage('✅ Income updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating income:', err);
//       setError(err.response?.data?.message || 'Failed to update income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const startEditExpense = (expense) => {
//     setEditingExpense({
//       ...expense,
//       date: new Date(expense.date).toISOString().split('T')[0],
//     });
//   };

//   const cancelEditExpense = () => setEditingExpense(null);

//   const saveEditExpense = async () => {
//     if (!validateInput(editingExpense)) return;
//     try {
//       await api.put(`/finance/expense/${editingExpense._id}`, {
//         ...editingExpense,
//         amount: Number(editingExpense.amount),
//       });
//       setEditingExpense(null);
//       setMessage('✅ Expense updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating expense:', err);
//       setError(err.response?.data?.message || 'Failed to update expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // Pagination for Incomes
//   const totalIncomePages = Math.ceil(incomes.length / itemsPerPage);
//   const paginatedIncomes = incomes.slice((currentIncomePage - 1) * itemsPerPage, currentIncomePage * itemsPerPage);

//   // Pagination for Expenses
//   const totalExpensePages = Math.ceil(expenses.length / itemsPerPage);
//   const paginatedExpenses = expenses.slice((currentExpensePage - 1) * itemsPerPage, currentExpensePage * itemsPerPage);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Fixed Title Bar */}
//       <header className="fixed top-0 left-0 right-0 bg-blue-700 text-white shadow-lg z-10">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
//           <h1 className="text-xl sm:text-2xl font-bold tracking-wide">FareBuzzer Accounting Report</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition mt-2 sm:mt-0"
//             aria-label="Logout"
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </header>

//       {/* Scrollable Content */}
//       <div className="mt-20 sm:mt-16 max-w-7xl mx-auto p-4 sm:p-6 space-y-8 overflow-y-auto">
//         {/* Messages */}
//         {message && (
//           <div className="bg-green-100 text-green-700 p-3 rounded-lg shadow">{message}</div>
//         )}
//         {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg shadow">{error}</div>}

//         {/* Title + Excel Download */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
//             <FiTrendingUp className="text-blue-600" /> Accounting Dashboard
//           </h2>
//           <button
//             onClick={handleDownloadExcel}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//             aria-label="Download Excel Report"
//           >
//             <FiDownload /> Download Excel
//           </button>
//         </div>

//         {/* Filter Type and Currency Selector */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <select
//             value={filterType}
//             onChange={(e) => {
//               setFilterType(e.target.value);
//               setStartDate('');
//               setEndDate('');
//               setMonth(new Date().getMonth() + 1);
//               setYear(new Date().getFullYear());
//             }}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
//             aria-label="Select Filter Type"
//           >
//             <option value="monthYear">Month/Year</option>
//             <option value="dateRange">Date Range</option>
//           </select>

//           <select
//             value={selectedCurrency}
//             onChange={(e) => setSelectedCurrency(e.target.value)}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
//             aria-label="Select Currency"
//           >
//             {CURRENCIES.map((currency) => (
//               <option key={currency} value={currency}>
//                 {currency}
//               </option>
//             ))}
//           </select>

//           {filterType === 'monthYear' ? (
//             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//               <select
//                 value={month}
//                 onChange={(e) => setMonth(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
//                 aria-label="Select Month"
//               >
//                 {[...Array(12)].map((_, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={year}
//                 onChange={(e) => setYear(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
//                 aria-label="Select Year"
//               >
//                 {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 1 + i).map((y) => (
//                   <option key={y} value={y}>
//                     {y}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ) : (
//             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
//                 aria-label="Select Start Date"
//               />
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
//                 aria-label="Select End Date"
//               />
//             </div>
//           )}
//         </div>

//         {/* Summary */}
//         {isLoading ? (
//           <div className="text-center text-gray-500">Loading...</div>
//         ) : summary ? (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
//               <div className="p-4 bg-green-50 rounded-lg shadow">
//                 <p className="text-sm text-gray-500">Total Income</p>
//                 <p className="text-lg sm:text-xl font-bold text-green-600">
//                   {currencySymbols[selectedCurrency]}{summary.totalIncome?.toLocaleString() || '0'}
//                 </p>
//               </div>
//               <div className="p-4 bg-red-50 rounded-lg shadow">
//                 <p className="text-sm text-gray-500">Total Expenses</p>
//                 <p className="text-lg sm:text-xl font-bold text-red-600">
//                   {currencySymbols[selectedCurrency]}{summary.totalExpense?.toLocaleString() || '0'}
//                 </p>
//               </div>
//               <div className="p-4 bg-blue-50 rounded-lg shadow">
//                 <p className="text-sm text-gray-500">Balance</p>
//                 <p className="text-lg sm:text-xl font-bold text-blue-600">
//                   {currencySymbols[selectedCurrency]}{summary.balance?.toLocaleString() || '0'}
//                 </p>
//               </div>
//             </div>
//             {/* Multi-Currency Summary */}
//             <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-4 text-center">
//               {CURRENCIES.map((currency) => (
//                 <div key={currency} className="p-4 bg-gray-50 rounded-lg shadow">
//                   <p className="text-sm text-gray-500">{currency}</p>
//                   <p className="text-sm font-bold text-green-600">
//                     Income: {currencySymbols[currency]}{convertAmount(summary.totalIncome || 0, selectedCurrency, currency).toLocaleString()}
//                   </p>
//                   <p className="text-sm font-bold text-red-600">
//                     Expenses: {currencySymbols[currency]}{convertAmount(summary.totalExpense || 0, selectedCurrency, currency).toLocaleString()}
//                   </p>
//                   <p className="text-sm font-bold text-blue-600">
//                     Balance: {currencySymbols[currency]}{convertAmount(summary.balance || 0, selectedCurrency, currency).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <div className="text-center text-gray-500">No summary data available.</div>
//         )}

//         {/* Income Section */}
//         <div className="bg-white p-4 sm:p-10 rounded-2xl shadow-lg">
//           <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-green-500" /> Income
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newIncome.title}
//               onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Income Title"
//             />
//             <select
//               value={newIncome.category}
//               onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Select Income Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {INCOME_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newIncome.amount}
//               onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Income Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newIncome.date}
//               onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Income Date"
//             />
//             <select
//               value={newIncome.currency}
//               onChange={(e) => setNewIncome({ ...newIncome, currency: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Select Income Currency"
//             >
//               {CURRENCIES.map((currency) => (
//                 <option key={currency} value={currency}>
//                   {currency}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newIncome.notes}
//               onChange={(e) => setNewIncome({ ...newIncome, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Income Notes"
//             />
//             <button
//               onClick={handleAddIncome}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
//               aria-label="Add Income"
//             >
//               Add
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse rounded-lg shadow-sm">
//               <thead className="bg-green-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left text-xs sm:text-base">Type</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Category</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Title</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Amount</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Currency</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Date</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Notes</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan="8" className="p-3 text-center text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : paginatedIncomes.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="p-3 text-center text-gray-500">
//                       No income records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedIncomes.map((i) => (
//                     <tr key={i._id} className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.type}
//                             readOnly
//                             aria-label="Income Type (Read-only)"
//                           />
//                         ) : (
//                           i.type
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.category || ''}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, category: e.target.value })}
//                             aria-label="Edit Income Category"
//                           >
//                             <option value="">Select Category (Optional)</option>
//                             {INCOME_CATEGORIES.map((c) => (
//                               <option key={c} value={c}>
//                                 {c}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           i.category || '-'
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.title}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, title: e.target.value })}
//                             aria-label="Edit Income Title"
//                           />
//                         ) : (
//                           i.title
//                         )}
//                       </td>
//                       <td className="p-3 text-green-600 font-semibold text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             type="number"
//                             value={editingIncome.amount}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, amount: e.target.value })}
//                             aria-label="Edit Income Amount"
//                             min="0"
//                           />
//                         ) : (
//                           // FIXED: Use the currency from the item, not selectedCurrency
//                           `${currencySymbols[i.currency] || currencySymbols.INR}${!isNaN(i.amount) ? i.amount.toLocaleString() : '0'}`
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.currency}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, currency: e.target.value })}
//                             aria-label="Edit Income Currency"
//                           >
//                             {CURRENCIES.map((currency) => (
//                               <option key={currency} value={currency}>
//                                 {currency}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           i.currency // FIXED: Show the actual currency from backend
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             type="date"
//                             value={editingIncome.date}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, date: e.target.value })}
//                             aria-label="Edit Income Date"
//                           />
//                         ) : (
//                           new Date(i.date).toLocaleDateString('en-IN')
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.notes || ''}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, notes: e.target.value })}
//                             aria-label="Edit Income Notes"
//                           />
//                         ) : (
//                           i.notes || '-'
//                         )}
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         {editingIncome?._id === i._id ? (
//                           <>
//                             <button
//                               onClick={saveEditIncome}
//                               className="text-green-600 hover:text-green-800"
//                               aria-label="Save Income Edit"
//                             >
//                               <FiCheck />
//                             </button>
//                             <button
//                               onClick={cancelEditIncome}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Cancel Income Edit"
//                             >
//                               <FiX />
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => startEditIncome(i)}
//                               className="text-blue-600 hover:text-blue-800"
//                               aria-label="Edit Income"
//                             >
//                               <FiEdit2 />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteIncome(i._id)}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Delete Income"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {/* Income Pagination */}
//           {totalIncomePages > 1 && (
//             <div className="flex justify-center items-center gap-4 mt-4">
//               <button
//                 onClick={() => setCurrentIncomePage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentIncomePage === 1}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Previous Income Page"
//               >
//                 <FiChevronLeft /> Previous
//               </button>
//               <span className="text-gray-700">
//                 Page {currentIncomePage} of {totalIncomePages}
//               </span>
//               <button
//                 onClick={() => setCurrentIncomePage((prev) => Math.min(prev + 1, totalIncomePages))}
//                 disabled={currentIncomePage === totalIncomePages}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Next Income Page"
//               >
//                 Next <FiChevronRight />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Expenses Section */}
//         <div className="bg-white p-4 sm:p-10 rounded-2xl shadow-lg">
//           <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-red-500" /> Expenses
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newExpense.title}
//               onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Expense Title"
//             />
//             <select
//               value={newExpense.category}
//               onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Select Expense Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {EXPENSE_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newExpense.amount}
//               onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Expense Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newExpense.date}
//               onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Expense Date"
//             />
//             <select
//               value={newExpense.currency}
//               onChange={(e) => setNewExpense({ ...newExpense, currency: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Select Expense Currency"
//             >
//               {CURRENCIES.map((currency) => (
//                 <option key={currency} value={currency}>
//                   {currency}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newExpense.notes}
//               onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
//               aria-label="Expense Notes"
//             />
//             <button
//               onClick={handleAddExpense}
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full sm:w-auto"
//               aria-label="Add Expense"
//             >
//               Add
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse rounded-lg shadow-sm">
//               <thead className="bg-red-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left text-xs sm:text-base">Type</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Category</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Title</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Amount</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Currency</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Date</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Notes</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan="8" className="p-3 text-center text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : paginatedExpenses.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="p-3 text-center text-gray-500">
//                       No expense records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedExpenses.map((e) => (
//                     <tr key={e._id} className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.type}
//                             readOnly
//                             aria-label="Expense Type (Read-only)"
//                           />
//                         ) : (
//                           e.type
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.category || ''}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, category: ev.target.value })}
//                             aria-label="Edit Expense Category"
//                           >
//                             <option value="">Select Category (Optional)</option>
//                             {EXPENSE_CATEGORIES.map((c) => (
//                               <option key={c} value={c}>
//                                 {c}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           e.category || '-'
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.title}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, title: ev.target.value })}
//                             aria-label="Edit Expense Title"
//                           />
//                         ) : (
//                           e.title
//                         )}
//                       </td>
//                       <td className="p-3 text-red-600 font-semibold text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             type="number"
//                             value={editingExpense.amount}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, amount: ev.target.value })}
//                             aria-label="Edit Expense Amount"
//                             min="0"
//                           />
//                         ) : (
//                           // FIXED: Use the currency from the item, not selectedCurrency
//                           `${currencySymbols[e.currency] || currencySymbols.INR}${!isNaN(e.amount) ? e.amount.toLocaleString() : '0'}`
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.currency}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, currency: ev.target.value })}
//                             aria-label="Edit Expense Currency"
//                           >
//                             {CURRENCIES.map((currency) => (
//                               <option key={currency} value={currency}>
//                                 {currency}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           e.currency // FIXED: Show the actual currency from backend
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             type="date"
//                             value={editingExpense.date}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, date: ev.target.value })}
//                             aria-label="Edit Expense Date"
//                           />
//                         ) : (
//                           new Date(e.date).toLocaleDateString('en-IN')
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.notes || ''}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, notes: ev.target.value })}
//                             aria-label="Edit Expense Notes"
//                           />
//                         ) : (
//                           e.notes || '-'
//                         )}
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         {editingExpense?._id === e._id ? (
//                           <>
//                             <button
//                               onClick={saveEditExpense}
//                               className="text-green-600 hover:text-green-800"
//                               aria-label="Save Expense Edit"
//                             >
//                               <FiCheck />
//                             </button>
//                             <button
//                               onClick={cancelEditExpense}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Cancel Expense Edit"
//                             >
//                               <FiX />
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => startEditExpense(e)}
//                               className="text-blue-600 hover:text-blue-800"
//                               aria-label="Edit Expense"
//                             >
//                               <FiEdit2 />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteExpense(e._id)}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Delete Expense"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {/* Expense Pagination */}
//           {totalExpensePages > 1 && (
//             <div className="flex justify-center items-center gap-4 mt-4">
//               <button
//                 onClick={() => setCurrentExpensePage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentExpensePage === 1}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Previous Expense Page"
//               >
//                 <FiChevronLeft /> Previous
//               </button>
//               <span className="text-gray-700">
//                 Page {currentExpensePage} of {totalExpensePages}
//               </span>
//               <button
//                 onClick={() => setCurrentExpensePage((prev) => Math.min(prev + 1, totalExpensePages))}
//                 disabled={currentExpensePage === totalExpensePages}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Next Expense Page"
//               >
//                 Next <FiChevronRight />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Finance;

//-----------------------------CORRECT===========================


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import {
  FiTrendingUp,
  FiDollarSign,
  FiTrash2,
  FiDownload,
  FiLogOut,
  FiEdit2,
  FiCheck,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

// 🔹 Predefined categories from backend schemas
const INCOME_CATEGORIES = [
  'MCO Meta',
  'MCO PPC',
  'Meta Rental',
  'Commission',
  'Technology Sale',
  'Domestic Tour Package',
  'International Tour Package',
  'Airline Ticket',
  'Hotel',
  'Car Hire',
  'Activities',
  'Airport Transfers',
  'Visa',
  'Others'
];

const EXPENSE_CATEGORIES = [
  'Salaries',
  'Incentives',
  'Rent',
  'Travel Allowance Agent',
  'Travel Allowance Owner',
  'Meta Recharge',
  'Chargeback',
  'Refunds',
  'Miscellaneous Expenses',
  'Call Payment',
  'Others'
];

const CURRENCIES = ['USD', 'AED', 'INR', 'CAD', 'AUD'];

const Finance = () => {
  const [summary, setSummary] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [newIncome, setNewIncome] = useState({
    type: 'Income',
    category: '',
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    currency: 'INR',
  });
  const [newExpense, setNewExpense] = useState({
    type: 'Expense',
    category: '',
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    currency: 'INR',
  });
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editingIncome, setEditingIncome] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterType, setFilterType] = useState('monthYear');
  const [currentIncomePage, setCurrentIncomePage] = useState(1);
  const [currentExpensePage, setCurrentExpensePage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  // 🔹 Currency symbol mapping
  const currencySymbols = {
    USD: '$',
    AED: 'د.إ',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
  };

  // 🔹 CORRECT Currency conversion rates (1 foreign currency = X INR)
  const conversionRates = {
    USD: 83.33,    // 1 USD = 83.33 INR
    AED: 22.67,    // 1 AED = 22.67 INR
    INR: 1,        // Base currency
    CAD: 61.50,    // 1 CAD = 61.50 INR
    AUD: 54.00,    // 1 AUD = 54.00 INR
  };

  // 🔹 Convert amount to INR for summary calculations
  const convertToINR = (amount, fromCurrency) => {
    if (isNaN(amount) || amount === null || amount === undefined) {
      return 0;
    }

    if (fromCurrency === 'INR') {
      return Number(amount);
    }

    try {
      return Number(amount) * conversionRates[fromCurrency];
    } catch (error) {
      console.error('Error in currency conversion to INR:', error);
      return Number(amount) || 0;
    }
  };

  // 🔹 Convert amount from INR to target currency for display
  const convertFromINR = (amountInINR, toCurrency) => {
    if (isNaN(amountInINR) || amountInINR === null || amountInINR === undefined) {
      return 0;
    }

    if (toCurrency === 'INR') {
      return Number(amountInINR);
    }

    try {
      return Number(amountInINR) / conversionRates[toCurrency];
    } catch (error) {
      console.error('Error in currency conversion from INR:', error);
      return Number(amountInINR) || 0;
    }
  };

  // 🔹 Validate input
  const validateInput = (input) => {
    if (!input.title || !input.amount || !input.date || !input.currency) {
      setError('Title, amount, date, and currency are required.');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    if (isNaN(input.amount) || Number(input.amount) <= 0) {
      setError('Amount must be a positive number.');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    if (!Date.parse(input.date)) {
      setError('Invalid date format.');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    if (input.category && input.type === 'Income' && !INCOME_CATEGORIES.includes(input.category)) {
      setError(`Category must be one of: ${INCOME_CATEGORIES.join(', ')}.`);
      setTimeout(() => setError(''), 3000);
      return false;
    }
    if (input.category && input.type === 'Expense' && !EXPENSE_CATEGORIES.includes(input.category)) {
      setError(`Category must be one of: ${EXPENSE_CATEGORIES.join(', ')}.`);
      setTimeout(() => setError(''), 3000);
      return false;
    }
    if (!CURRENCIES.includes(input.currency)) {
      setError(`Currency must be one of: ${CURRENCIES.join(', ')}.`);
      setTimeout(() => setError(''), 3000);
      return false;
    }
    return true;
  };

  // 🔹 Validate date range
  const validateDateRange = () => {
    if (filterType !== 'dateRange') return true;
    if (!startDate || !endDate) {
      setError('Both start date and end date are required for date range filtering.');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    if (!Date.parse(startDate) || !Date.parse(endDate)) {
      setError('Invalid date format for start or end date.');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date cannot be after end date.');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    return true;
  };

  // 🔹 Fetch Finance Data


  const fetchData = async () => {
    if (filterType === 'dateRange' && !validateDateRange()) return;
    setIsLoading(true);
    try {
      const query = filterType === 'dateRange'
        ? `startDate=${startDate}&endDate=${endDate}&currency=INR`  // Add currency=INR
        : `month=${month}&year=${year}&currency=INR`;  // Add currency=INR

      const [summaryRes, incomesRes, expensesRes] = await Promise.all([
        api.get(`/finance/summary?${query}`),
        api.get(`/finance/incomes?${query}`),
        api.get(`/finance/expenses?${query}`),
      ]);

      // Summary is in INR (converted by backend)
      setSummary(summaryRes.data);

      // Process incomes - Show original amounts with their currencies
      const processedIncomes = Array.isArray(incomesRes.data?.incomes)
        ? incomesRes.data.incomes.map(i => ({
          ...i,
          amount: Number(i.amount) || 0,
          currency: i.currency || 'INR',
        })).sort((a, b) => new Date(b.date) - new Date(a.date))
        : [];

      setIncomes(processedIncomes);

      // Process expenses - Show original amounts with their currencies
      const processedExpenses = Array.isArray(expensesRes.data?.expenses)
        ? expensesRes.data.expenses.map(e => ({
          ...e,
          amount: Number(e.amount) || 0,
          currency: e.currency || 'INR',
        })).sort((a, b) => new Date(b.date) - new Date(a.date))
        : [];

      setExpenses(processedExpenses);

    } catch (err) {
      console.error('❌ Error fetching finance data:', err);
      setError(err.response?.data?.message || 'Failed to fetch financial data. Please try again.');
      setTimeout(() => setError(''), 3000);
      setIncomes([]);
      setExpenses([]);
      setSummary(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month, year, startDate, endDate, filterType]);

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setMessage('✅ You have successfully logged out!');
    setTimeout(() => navigate('/login'), 1500);
  };

  // 🔹 Excel Download

  // 🔹 Excel Download - Updated to include currency
  const handleDownloadExcel = async () => {
    if (filterType === 'dateRange' && !validateDateRange()) return;
    try {
      const query = filterType === 'dateRange'
        ? `startDate=${startDate}&endDate=${endDate}&currency=${selectedCurrency}`
        : `month=${month}&year=${year}&currency=${selectedCurrency}`;

      const res = await api.get(`/finance/download/excel?${query}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        filterType === 'dateRange'
          ? `finance_report_${startDate}_to_${endDate}_${selectedCurrency}.xlsx`
          : `finance_report_${month}_${year}_${selectedCurrency}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('❌ Error downloading Excel:', err);
      setError(err.response?.data?.message || 'Failed to download Excel file. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };
  // 🔹 Add Income
  const handleAddIncome = async () => {
    if (!validateInput(newIncome)) return;
    try {
      const incomeData = {
        ...newIncome,
        amount: Number(newIncome.amount),
        currency: newIncome.currency,
      };

      await api.post('/finance/income', incomeData);
      setNewIncome({
        type: 'Income',
        category: '',
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        currency: 'INR',
      });
      setMessage('✅ Income added successfully!');
      setTimeout(() => setMessage(''), 1500);
      fetchData();
    } catch (err) {
      console.error('❌ Error adding income:', err);
      setError(err.response?.data?.message || 'Failed to add income. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  // 🔹 Add Expense
  const handleAddExpense = async () => {
    if (!validateInput(newExpense)) return;
    try {
      const expenseData = {
        ...newExpense,
        amount: Number(newExpense.amount),
        currency: newExpense.currency,
      };

      await api.post('/finance/expense', expenseData);
      setNewExpense({
        type: 'Expense',
        category: '',
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        currency: 'INR',
      });
      setMessage('✅ Expense added successfully!');
      setTimeout(() => setMessage(''), 1500);
      fetchData();
    } catch (err) {
      console.error('❌ Error adding expense:', err);
      setError(err.response?.data?.message || 'Failed to add expense. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  // 🔹 Delete Handlers
  const handleDeleteIncome = async (id) => {
    try {
      await api.delete(`/finance/income/${id}`);
      setMessage('✅ Income deleted successfully!');
      setTimeout(() => setMessage(''), 1500);
      fetchData();
    } catch (err) {
      console.error('❌ Error deleting income:', err);
      setError(err.response?.data?.message || 'Failed to delete income. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await api.delete(`/finance/expense/${id}`);
      setMessage('✅ Expense deleted successfully!');
      setTimeout(() => setMessage(''), 1500);
      fetchData();
    } catch (err) {
      console.error('❌ Error deleting expense:', err);
      setError(err.response?.data?.message || 'Failed to delete expense. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  // 🔹 Edit Handlers
  const startEditIncome = (income) => {
    setEditingIncome({
      ...income,
      date: new Date(income.date).toISOString().split('T')[0],
    });
  };

  const cancelEditIncome = () => setEditingIncome(null);


  const saveEditIncome = async () => {
    if (!validateInput(editingIncome)) return;
    try {
      await api.put(`/finance/income/${editingIncome._id}`, {
        ...editingIncome,
        amount: Number(editingIncome.amount),
        currency: editingIncome.currency, // Make sure currency is included
      });
      setEditingIncome(null);
      setMessage('✅ Income updated successfully!');
      setTimeout(() => setMessage(''), 1500);
      fetchData();
    } catch (err) {
      console.error('❌ Error updating income:', err);
      setError(err.response?.data?.message || 'Failed to update income. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };
  const startEditExpense = (expense) => {
    setEditingExpense({
      ...expense,
      date: new Date(expense.date).toISOString().split('T')[0],
    });
  };

  const cancelEditExpense = () => setEditingExpense(null);


  const saveEditExpense = async () => {
    if (!validateInput(editingExpense)) return;
    try {
      await api.put(`/finance/expense/${editingExpense._id}`, {
        ...editingExpense,
        amount: Number(editingExpense.amount),
        currency: editingExpense.currency, // Make sure currency is included
      });
      setEditingExpense(null);
      setMessage('✅ Expense updated successfully!');
      setTimeout(() => setMessage(''), 1500);
      fetchData();
    } catch (err) {
      console.error('❌ Error updating expense:', err);
      setError(err.response?.data?.message || 'Failed to update expense. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const getConvertedSummary = () => {
    if (!summary) return null;

    return {
      totalIncome: convertFromINR(summary.totalIncome, selectedCurrency),
      totalExpense: convertFromINR(summary.totalExpense, selectedCurrency),
      balance: convertFromINR(summary.balance, selectedCurrency),
    };
  };

  const convertedSummary = getConvertedSummary();

  // Pagination for Incomes
  const totalIncomePages = Math.ceil(incomes.length / itemsPerPage);
  const paginatedIncomes = incomes.slice((currentIncomePage - 1) * itemsPerPage, currentIncomePage * itemsPerPage);

  // Pagination for Expenses
  const totalExpensePages = Math.ceil(expenses.length / itemsPerPage);
  const paginatedExpenses = expenses.slice((currentExpensePage - 1) * itemsPerPage, currentExpensePage * itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Fixed Title Bar */}
      <header className="fixed top-0 left-0 right-0 bg-blue-700 text-white shadow-lg z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
          {/* <h1 className="text-xl sm:text-2xl font-bold tracking-wide">FareBuzzer Accounting Report</h1> */}
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">FareBuzzer Admin Dashboard</h1>


       
          {/* <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition mt-2 sm:mt-0"
            aria-label="Logout"
          >
            <FiLogOut /> Logout
          </button> */}
          <button
  onClick={handleLogout}
  className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition mt-2 sm:mt-0 cursor-pointer"
  aria-label="Logout"
>
  <FiLogOut /> Logout
</button>

        </div>
      </header>

      {/* Scrollable Content */}
      <div className="mt-20 sm:mt-16 max-w-7xl mx-auto p-4 sm:p-6 space-y-8 overflow-y-auto">
        {/* Messages */}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg shadow">{message}</div>
        )}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg shadow">{error}</div>}

        {/* Title + Excel Download */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FiTrendingUp className="text-blue-600" /> Accounting Dashboard
          </h2>
          <button
            onClick={handleDownloadExcel}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
            aria-label="Download Excel Report"
          >
            <FiDownload /> Download Excel
          </button>
        </div>

        {/* Filter Type and Currency Selector */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setStartDate('');
              setEndDate('');
              setMonth(new Date().getMonth() + 1);
              setYear(new Date().getFullYear());
            }}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
            aria-label="Select Filter Type"
          >
            <option value="monthYear">Month/Year</option>
            <option value="dateRange">Date Range</option>
          </select>

          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
            aria-label="Select Currency"
          >
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          {filterType === 'monthYear' ? (
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
                aria-label="Select Month"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
                aria-label="Select Year"
              >
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 1 + i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
                aria-label="Select Start Date"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
                aria-label="Select End Date"
              />
            </div>
          )}
        </div>

        {/* Summary */}
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : summary ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="p-4 bg-green-50 rounded-lg shadow">
                <p className="text-sm text-gray-500">Total Income</p>
                <p className="text-lg sm:text-xl font-bold text-green-600">
                  {currencySymbols[selectedCurrency]}{(convertedSummary?.totalIncome || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  (₹{summary.totalIncome?.toLocaleString() || '0'} INR)
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg shadow">
                <p className="text-sm text-gray-500">Total Expenses</p>
                <p className="text-lg sm:text-xl font-bold text-red-600">
                  {currencySymbols[selectedCurrency]}{(convertedSummary?.totalExpense || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  (₹{summary.totalExpense?.toLocaleString() || '0'} INR)
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow">
                <p className="text-sm text-gray-500">Balance</p>
                <p className="text-lg sm:text-xl font-bold text-blue-600">
                  {currencySymbols[selectedCurrency]}{(convertedSummary?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  (₹{summary.balance?.toLocaleString() || '0'} INR)
                </p>
              </div>
            </div>

            {/* Multi-Currency Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-4 text-center">
              {CURRENCIES.map((currency) => {
                const currencySummary = {
                  income: convertFromINR(summary.totalIncome || 0, currency),
                  expense: convertFromINR(summary.totalExpense || 0, currency),
                  balance: convertFromINR(summary.balance || 0, currency),
                };

                return (
                  <div key={currency} className="p-4 bg-gray-50 rounded-lg shadow">
                    <p className="text-sm text-gray-500">{currency}</p>
                    <p className="text-sm font-bold text-green-600">
                      Income: {currencySymbols[currency]}{currencySummary.income.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm font-bold text-red-600">
                      Expenses: {currencySymbols[currency]}{currencySummary.expense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm font-bold text-blue-600">
                      Balance: {currencySymbols[currency]}{currencySummary.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">No summary data available.</div>
        )}

        {/* Income Section */}
        <div className="bg-white p-4 sm:p-10 rounded-2xl shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
            <FiDollarSign className="text-green-500" /> Income
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="Title"
              value={newIncome.title}
              onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
              aria-label="Income Title"
            />
            <select
              value={newIncome.category}
              onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
              aria-label="Select Income Category"
            >
              <option value="">Select Category (Optional)</option>
              {INCOME_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={newIncome.amount}
              onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
              aria-label="Income Amount"
              min="0"
              step="0.01"
            />
            <input
              type="date"
              value={newIncome.date}
              onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
              aria-label="Income Date"
            />
            <select
              value={newIncome.currency}
              onChange={(e) => setNewIncome({ ...newIncome, currency: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
              aria-label="Select Income Currency"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Notes (optional)"
              value={newIncome.notes}
              onChange={(e) => setNewIncome({ ...newIncome, notes: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5 cursor-pointer"
              aria-label="Income Notes"
            />
            <button
              onClick={handleAddIncome}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto cursor-pointer"
              aria-label="Add Income"
            >
              Add
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg shadow-sm">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-3 text-left text-xs sm:text-base">Type</th>
                  <th className="p-3 text-left text-xs sm:text-base">Category</th>
                  <th className="p-3 text-left text-xs sm:text-base">Title</th>
                  <th className="p-3 text-left text-xs sm:text-base">Amount</th>
                  <th className="p-3 text-left text-xs sm:text-base">Currency</th>
                  <th className="p-3 text-left text-xs sm:text-base">Date</th>
                  <th className="p-3 text-left text-xs sm:text-base">Notes</th>
                  <th className="p-3 text-left text-xs sm:text-base">Action</th>
                </tr>
              </thead>


              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="8" className="p-3 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : paginatedIncomes.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-3 text-center text-gray-500">
                      No income records found.
                    </td>
                  </tr>
                ) : (
                  paginatedIncomes.map((i) => (
                    <tr key={i._id} className="border-b hover:bg-gray-50 transition">
                      {/* Type */}
                      <td className="p-3 text-xs sm:text-base">
                        {editingIncome?._id === i._id ? (
                          <input
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={editingIncome.type}
                            readOnly
                          />
                        ) : (
                          i.type
                        )}
                      </td>

                      {/* Category */}
                      <td className="p-3 text-xs sm:text-base">
                        {editingIncome?._id === i._id ? (
                          <select
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={editingIncome.category || ''}
                            onChange={(e) => setEditingIncome({ ...editingIncome, category: e.target.value })}
                          >
                            <option value="">Select Category</option>
                            {INCOME_CATEGORIES.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        ) : (
                          i.category || '-'
                        )}
                      </td>

                      {/* Title */}
                      <td className="p-3 text-xs sm:text-base">
                        {editingIncome?._id === i._id ? (
                          <input
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={editingIncome.title}
                            onChange={(e) => setEditingIncome({ ...editingIncome, title: e.target.value })}
                          />
                        ) : (
                          i.title
                        )}
                      </td>

                      {/* Amount */}
                      <td className="p-3 text-green-600 font-semibold text-xs sm:text-base">
                        {editingIncome?._id === i._id ? (
                          <input
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            type="number"
                            value={editingIncome.amount}
                            onChange={(e) => setEditingIncome({ ...editingIncome, amount: e.target.value })}
                            min="0"
                            step="0.01"
                          />
                        ) : (
                          `${currencySymbols[i.currency]}${i.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        )}
                      </td>

                      {/* Currency */}
                      <td className="p-3 text-xs sm:text-base">
                        {editingIncome?._id === i._id ? (
                          <select
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={editingIncome.currency}
                            onChange={(e) => setEditingIncome({ ...editingIncome, currency: e.target.value })}
                          >
                            {CURRENCIES.map((currency) => (
                              <option key={currency} value={currency}>{currency}</option>
                            ))}
                          </select>
                        ) : (
                          i.currency
                        )}
                      </td>

                      {/* Date */}
                      <td className="p-3 text-xs sm:text-base">
                        {editingIncome?._id === i._id ? (
                          <input
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            type="date"
                            value={editingIncome.date}
                            onChange={(e) => setEditingIncome({ ...editingIncome, date: e.target.value })}
                          />
                        ) : (
                          new Date(i.date).toLocaleDateString('en-IN')
                        )}
                      </td>

                      {/* Notes */}
                      <td className="p-3 text-xs sm:text-base">
                        {editingIncome?._id === i._id ? (
                          <input
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={editingIncome.notes || ''}
                            onChange={(e) => setEditingIncome({ ...editingIncome, notes: e.target.value })}
                          />
                        ) : (
                          i.notes || '-'
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="p-3 flex gap-2 ">
                        {editingIncome?._id === i._id ? (
                          <>
                            <button
                              onClick={saveEditIncome}
                              className="text-green-600 hover:text-green-800 cursor-pointer"
                              aria-label="Save Income Edit"
                            >
                              <FiCheck />
                            </button>
                            <button
                              onClick={cancelEditIncome}
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                              aria-label="Cancel Income Edit"
                            >
                              <FiX />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditIncome(i)}
                              className="text-blue-600 hover:text-blue-800 cursor-pointer"
                              aria-label="Edit Income"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => handleDeleteIncome(i._id)}
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                              aria-label="Delete Income"
                            >
                              <FiTrash2 />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
          {/* Income Pagination */}
          {totalIncomePages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => setCurrentIncomePage((prev) => Math.max(prev - 1, 1))}
                disabled={currentIncomePage === 1}
                className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                aria-label="Previous Income Page"
              >
                <FiChevronLeft /> Previous
              </button>
              <span className="text-gray-700">
                Page {currentIncomePage} of {totalIncomePages}
              </span>
              <button
                onClick={() => setCurrentIncomePage((prev) => Math.min(prev + 1, totalIncomePages))}
                disabled={currentIncomePage === totalIncomePages}
                className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                aria-label="Next Income Page"
              >
                Next <FiChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Expenses Section */}
        <div className="bg-white p-4 sm:p-10 rounded-2xl shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
            <FiDollarSign className="text-red-500" /> Expenses
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="Title"
              value={newExpense.title}
              onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
              aria-label="Expense Title"
            />
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
              aria-label="Select Expense Category"
            >
              <option value="">Select Category (Optional)</option>
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
              aria-label="Expense Amount"
              min="0"
              step="0.01"
            />
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
              aria-label="Expense Date"
            />
            <select
              value={newExpense.currency}
              onChange={(e) => setNewExpense({ ...newExpense, currency: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
              aria-label="Select Expense Currency"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Notes (optional)"
              value={newExpense.notes}
              onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5 cursor-pointer"
              aria-label="Expense Notes"
            />
            <button
              onClick={handleAddExpense}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full sm:w-auto cursor-pointer"
              aria-label="Add Expense"
            >
              Add
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg shadow-sm">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="p-3 text-left text-xs sm:text-base">Type</th>
                  <th className="p-3 text-left text-xs sm:text-base">Category</th>
                  <th className="p-3 text-left text-xs sm:text-base">Title</th>
                  <th className="p-3 text-left text-xs sm:text-base">Amount</th>
                  <th className="p-3 text-left text-xs sm:text-base">Currency</th>
                  <th className="p-3 text-left text-xs sm:text-base">Date</th>
                  <th className="p-3 text-left text-xs sm:text-base">Notes</th>
                  <th className="p-3 text-left text-xs sm:text-base">Action</th>
                </tr>
              </thead>


              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="8" className="p-3 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : paginatedExpenses.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-3 text-center text-gray-500">
                      No expense records found.
                    </td>
                  </tr>
                ) : (
                  paginatedExpenses.map((e) => (
                    <tr key={e._id} className="border-b hover:bg-gray-50 transition">
                      {/* Type */}
                      <td className="p-3 text-xs sm:text-base">
                        {editingExpense?._id === e._id ? (
                          <input
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={editingExpense.type}
                            readOnly
                          />
                        ) : (
                          e.type
                        )}
                      </td>

                      {/* Category */}
                      <td className="p-3 text-xs sm:text-base">
                        {editingExpense?._id === e._id ? (
                          <select
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={editingExpense.category || ''}
                            onChange={(ev) => setEditingExpense({ ...editingExpense, category: ev.target.value })}
                          >
                            <option value="">Select Category</option>
                            {EXPENSE_CATEGORIES.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        ) : (
                          e.category || '-'
                        )}
                      </td>

                      {/* Title */}
                      <td className="p-3 text-xs sm:text-base">
                        {editingExpense?._id === e._id ? (
                          <input
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={editingExpense.title}
                            onChange={(ev) => setEditingExpense({ ...editingExpense, title: ev.target.value })}
                          />
                        ) : (
                          e.title
                        )}
                      </td>

                      {/* Amount */}
                      <td className="p-3 text-red-600 font-semibold text-xs sm:text-base">
                        {editingExpense?._id === e._id ? (
                          <input
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                            type="number"
                            value={editingExpense.amount}
                            onChange={(ev) => setEditingExpense({ ...editingExpense, amount: ev.target.value })}
                            min="0"
                            step="0.01"
                          />
                        ) : (
                          `${currencySymbols[e.currency]}${e.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        )}
                      </td>

                      {/* Currency */}
                      <td className="p-3 text-xs sm:text-base">
                        {editingExpense?._id === e._id ? (
                          <select
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={editingExpense.currency}
                            onChange={(ev) => setEditingExpense({ ...editingExpense, currency: ev.target.value })}
                          >
                            {CURRENCIES.map((currency) => (
                              <option key={currency} value={currency}>{currency}</option>
                            ))}
                          </select>
                        ) : (
                          e.currency
                        )}
                      </td>

                      {/* Date */}
                      <td className="p-3 text-xs sm:text-base">
                        {editingExpense?._id === e._id ? (
                          <input
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                            type="date"
                            value={editingExpense.date}
                            onChange={(ev) => setEditingExpense({ ...editingExpense, date: ev.target.value })}
                          />
                        ) : (
                          new Date(e.date).toLocaleDateString('en-IN')
                        )}
                      </td>

                      {/* Notes */}
                      <td className="p-3 text-xs sm:text-base">
                        {editingExpense?._id === e._id ? (
                          <input
                            className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={editingExpense.notes || ''}
                            onChange={(ev) => setEditingExpense({ ...editingExpense, notes: ev.target.value })}
                          />
                        ) : (
                          e.notes || '-'
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="p-3 flex gap-2">
                        {editingExpense?._id === e._id ? (
                          <>
                            <button
                              onClick={saveEditExpense}
                              className="text-green-600 hover:text-green-800 cursor-pointer "
                              aria-label="Save Expense Edit"
                            >
                              <FiCheck />
                            </button>
                            <button
                              onClick={cancelEditExpense}
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                              aria-label="Cancel Expense Edit"
                            >
                              <FiX />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditExpense(e)}
                              className="text-blue-600 hover:text-blue-800 cursor-pointer "
                              aria-label="Edit Expense"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => handleDeleteExpense(e._id)}
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                              aria-label="Delete Expense"
                            >
                              <FiTrash2 />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
          {/* Expense Pagination */}
          {totalExpensePages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => setCurrentExpensePage((prev) => Math.max(prev - 1, 1))}
                disabled={currentExpensePage === 1}
                className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                aria-label="Previous Expense Page"
              >
                <FiChevronLeft /> Previous
              </button>
              <span className="text-gray-700">
                Page {currentExpensePage} of {totalExpensePages}
              </span>
              <button
                onClick={() => setCurrentExpensePage((prev) => Math.min(prev + 1, totalExpensePages))}
                disabled={currentExpensePage === totalExpensePages}
                className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                aria-label="Next Expense Page"
              >
                Next <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Finance;


//================

















//-----------------grok new---------------


// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api';
// import {
//   FiTrendingUp,
//   FiDollarSign,
//   FiTrash2,
//   FiDownload,
//   FiLogOut,
//   FiEdit2,
//   FiCheck,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
// } from 'react-icons/fi';

// // 🔹 Predefined categories from backend schemas
// const INCOME_CATEGORIES = [
//   'MCO Meta',
//   'MCO PPC',
//   'Meta Rental',
//   'Commission',
//   'Technology Sale',
//   'Domestic Tour Package',
//   'International Tour Package',
//   'Airline Ticket',
//   'Hotel',
//   'Car Hire',
//   'Activities',
//   'Airport Transfers',
//   'Visa',
// ];
// const EXPENSE_CATEGORIES = [
//   'Salaries',
//   'Incentives',
//   'Rent',
//   'Travel Allowance Agent',
//   'Travel Allowance Owner',
//   'Meta Recharge',
//   'Chargeback',
//   'Refunds',
//   'Miscellaneous Expenses',
//   'Call Payment',
// ];

// const Finance = () => {
//   const [summary, setSummary] = useState(null);
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [newIncome, setNewIncome] = useState({
//     type: 'Income',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//   });
//   const [newExpense, setNewExpense] = useState({
//     type: 'Expense',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [editingIncome, setEditingIncome] = useState(null);
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [filterType, setFilterType] = useState('monthYear'); // 'monthYear' or 'dateRange'
//   const [currentIncomePage, setCurrentIncomePage] = useState(1);
//   const [currentExpensePage, setCurrentExpensePage] = useState(1);
//   const itemsPerPage = 10;
//   const navigate = useNavigate();

//   // 🔹 Validate input (aligned with backend)
//   const validateInput = (input) => {
//     // Check if all required fields are empty
//     if (!input.title && !input.amount && !input.date) {
//       setError('Please fill in at least one required field (Title, Amount, or Date).');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!input.title || !input.amount || !input.date) {
//       setError('Title, amount, and date are required.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (isNaN(input.amount) || Number(input.amount) <= 0) {
//       setError('Amount must be a positive number.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(input.date)) {
//       setError('Invalid date format.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (input.category && input.type === 'Income' && !INCOME_CATEGORIES.includes(input.category)) {
//       setError(`Category must be one of: ${INCOME_CATEGORIES.join(', ')}.`);
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (input.category && input.type === 'Expense' && !EXPENSE_CATEGORIES.includes(input.category)) {
//       setError(`Category must be one of: ${EXPENSE_CATEGORIES.join(', ')}.`);
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Validate date range
//   const validateDateRange = () => {
//     if (filterType !== 'dateRange') return true;
//     if (!startDate || !endDate) {
//       setError('Both start date and end date are required for date range filtering.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(startDate) || !Date.parse(endDate)) {
//       setError('Invalid date format for start or end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (new Date(startDate) > new Date(endDate)) {
//       setError('Start date cannot be after end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Fetch Finance Data
//   const fetchData = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     setIsLoading(true);
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}`
//         : `month=${month}&year=${year}`;
//       const [summaryRes, incomesRes, expensesRes] = await Promise.all([
//         api.get(`/finance/summary?${query}`),
//         api.get(`/finance/incomes?${query}`),
//         api.get(`/finance/expenses?${query}`),
//       ]);
//       setSummary(summaryRes.data);
//       setIncomes(
//         Array.isArray(incomesRes.data.incomes)
//           ? incomesRes.data.incomes.sort((a, b) => new Date(b.date) - new Date(a.date))
//           : []
//       );
//       setExpenses(
//         Array.isArray(expensesRes.data.expenses)
//           ? expensesRes.data.expenses.sort((a, b) => new Date(b.date) - new Date(a.date))
//           : []
//       );
//       setCurrentIncomePage(1);
//       setCurrentExpensePage(1);
//     } catch (err) {
//       console.error('❌ Error fetching finance data:', err);
//       setError(err.response?.data?.message || 'Failed to fetch financial data. Please try again.');
//       setTimeout(() => setError(''), 3000);
//       setIncomes([]);
//       setExpenses([]);
//       setSummary(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [month, year, startDate, endDate, filterType]);

//   // 🔹 Logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setMessage('✅ You have successfully logged out!');
//     setTimeout(() => navigate('/login'), 1500);
//   };

//   // 🔹 Excel Download
//   const handleDownloadExcel = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}`
//         : `month=${month}&year=${year}`;
//       const res = await api.get(`/finance/download/excel?${query}`, { responseType: 'blob' });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute(
//         'download',
//         filterType === 'dateRange'
//           ? `finance_report_${startDate}_to_${endDate}.xlsx`
//           : `finance_report_${month}_${year}.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('❌ Error downloading Excel:', err);
//       setError(err.response?.data?.message || 'Failed to download Excel file. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Income
//   const handleAddIncome = async () => {
//     if (!validateInput(newIncome)) return;
//     try {
//       await api.post('/finance/income', { ...newIncome, amount: Number(newIncome.amount) });
//       setNewIncome({
//         type: 'Income',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//       });
//       setMessage('✅ Income added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding income:', err);
//       setError(err.response?.data?.message || 'Failed to add income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Expense
//   const handleAddExpense = async () => {
//     if (!validateInput(newExpense)) return;
//     try {
//       await api.post('/finance/expense', { ...newExpense, amount: Number(newExpense.amount) });
//       setNewExpense({
//         type: 'Expense',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//       });
//       setMessage('✅ Expense added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding expense:', err);
//       setError(err.response?.data?.message || 'Failed to add expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Delete Handlers
//   const handleDeleteIncome = async (id) => {
//     try {
//       await api.delete(`/finance/income/${id}`);
//       setMessage('✅ Income deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting income:', err);
//       setError(err.response?.data?.message || 'Failed to delete income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleDeleteExpense = async (id) => {
//     try {
//       await api.delete(`/finance/expense/${id}`);
//       setMessage('✅ Expense deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting expense:', err);
//       setError(err.response?.data?.message || 'Failed to delete expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Edit Handlers
//   const startEditIncome = (income) => {
//     console.log('Editing income:', income);
//     setEditingIncome({
//       ...income,
//       date: new Date(income.date).toISOString().split('T')[0],
//     });
//   };

//   const cancelEditIncome = () => setEditingIncome(null);

//   const saveEditIncome = async () => {
//     if (!validateInput(editingIncome)) return;
//     try {
//       await api.put(`/finance/income/${editingIncome._id}`, {
//         ...editingIncome,
//         amount: Number(editingIncome.amount),
//       });
//       setEditingIncome(null);
//       setMessage('✅ Income updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating income:', err);
//       setError(err.response?.data?.message || 'Failed to update income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const startEditExpense = (expense) => {
//     console.log('Editing expense:', expense);
//     setEditingExpense({
//       ...expense,
//       date: new Date(expense.date).toISOString().split('T')[0],
//     });
//   };

//   const cancelEditExpense = () => setEditingExpense(null);

//   const saveEditExpense = async () => {
//     if (!validateInput(editingExpense)) return;
//     try {
//       await api.put(`/finance/expense/${editingExpense._id}`, {
//         ...editingExpense,
//         amount: Number(editingExpense.amount),
//       });
//       setEditingExpense(null);
//       setMessage('✅ Expense updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating expense:', err);
//       setError(err.response?.data?.message || 'Failed to update expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // Pagination for Incomes
//   const totalIncomePages = Math.ceil(incomes.length / itemsPerPage);
//   const paginatedIncomes = incomes.slice((currentIncomePage - 1) * itemsPerPage, currentIncomePage * itemsPerPage);

//   // Pagination for Expenses
//   const totalExpensePages = Math.ceil(expenses.length / itemsPerPage);
//   const paginatedExpenses = expenses.slice((currentExpensePage - 1) * itemsPerPage, currentExpensePage * itemsPerPage);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Fixed Title Bar */}
//       <header className="fixed top-0 left-0 right-0 bg-blue-700 text-white shadow-lg z-10">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
//           <h1 className="text-xl sm:text-2xl font-bold tracking-wide">FareBuzzer Accounting Report</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition mt-2 sm:mt-0"
//             aria-label="Logout"
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </header>

//       {/* Scrollable Content */}
//       <div className="mt-20 sm:mt-16 max-w-7xl mx-auto p-4 sm:p-6 space-y-8 overflow-y-auto">
//         {/* Messages */}
//         {message && (
//           <div className="bg-green-100 text-green-700 p-3 rounded-lg shadow">{message}</div>
//         )}
//         {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg shadow">{error}</div>}

//         {/* Title + Excel Download */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
//             <FiTrendingUp className="text-blue-600" /> Accounting Dashboard
//           </h2>
//           <button
//             onClick={handleDownloadExcel}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//             aria-label="Download Excel Report"
//           >
//             <FiDownload /> Download Excel
//           </button>
//         </div>

//         {/* Filter Type Selector */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <select
//             value={filterType}
//             onChange={(e) => {
//               setFilterType(e.target.value);
//               setStartDate('');
//               setEndDate('');
//               setMonth(new Date().getMonth() + 1);
//               setYear(new Date().getFullYear());
//             }}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full cursor-pointer"
//             aria-label="Select Filter Type"
//           >
//             <option value="monthYear">Month/Year</option>
//             <option value="dateRange">Date Range</option>
//           </select>

//           {filterType === 'monthYear' ? (
//             <div className="flex flex-col sm:flex-row gap-4 w-full">
//               <select
//                 value={month}
//                 onChange={(e) => setMonth(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full cursor-pointer"
//                 aria-label="Select Month"
//               >
//                 {[...Array(12)].map((_, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={year}
//                 onChange={(e) => setYear(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full cursor-pointer"
//                 aria-label="Select Year"
//               >
//                 {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 1 + i).map((y) => (
//                   <option key={y} value={y}>
//                     {y}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ) : (
//             <div className="flex flex-col sm:flex-row gap-4 w-full">
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full cursor-pointer"
//                 aria-label="Select Start Date"
//               />
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full cursor-pointer"
//                 aria-label="Select End Date"
//               />
//             </div>
//           )}
//         </div>

//         {/* Summary */}
//         {isLoading ? (
//           <div className="text-center text-gray-500">Loading...</div>
//         ) : summary ? (
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
//             <div className="p-4 bg-green-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Income</p>
//               <p className="text-lg sm:text-xl font-bold text-green-600">
//                 ₹{summary.totalIncome.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-red-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Expenses</p>
//               <p className="text-lg sm:text-xl font-bold text-red-600">
//                 ₹{summary.totalExpense.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-blue-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Balance</p>
//               <p className="text-lg sm:text-xl font-bold text-blue-600">
//                 ₹{summary.balance.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">No summary data available.</div>
//         )}

//         {/* Income Section */}
//         <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
//           <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-green-500" /> Income
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newIncome.title}
//               onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full cursor-pointer"
//               aria-label="Income Title"
//             />
//             <select
//               value={newIncome.category}
//               onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full cursor-pointer"
//               aria-label="Select Income Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {INCOME_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newIncome.amount}
//               onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full cursor-pointer"
//               aria-label="Income Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newIncome.date}
//               onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full cursor-pointer"
//               aria-label="Income Date"
//             />
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newIncome.notes}
//               onChange={(e) => setNewIncome({ ...newIncome, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full cursor-pointer"
//               aria-label="Income Notes"
//             />
//             <button
//               onClick={handleAddIncome}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
//               aria-label="Add Income"
//             >
//               Add
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse rounded-lg shadow-sm">
//               <thead className="bg-green-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left text-xs sm:text-base">Type</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Category</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Title</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Amount</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Date</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Notes</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : paginatedIncomes.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       No income records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedIncomes.map((i) => (
//                     <tr key={i._id} className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
//                             value={editingIncome.type}
//                             readOnly
//                             aria-label="Income Type (Read-only)"
//                           />
//                         ) : (
//                           i.type
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
//                             value={editingIncome.category || ''}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, category: e.target.value })}
//                             aria-label="Edit Income Category"
//                           >
//                             <option value="">Select Category (Optional)</option>
//                             {INCOME_CATEGORIES.map((c) => (
//                               <option key={c} value={c}>
//                                 {c}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           i.category || '-'
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
//                             value={editingIncome.title}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, title: e.target.value })}
//                             aria-label="Edit Income Title"
//                           />
//                         ) : (
//                           i.title
//                         )}
//                       </td>
//                       <td className="p-3 text-green-600 font-semibold text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
//                             type="number"
//                             value={editingIncome.amount}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, amount: e.target.value })}
//                             aria-label="Edit Income Amount"
//                             min="0"
//                           />
//                         ) : (
//                           `₹${i.amount.toLocaleString()}`
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
//                             type="date"
//                             value={editingIncome.date}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, date: e.target.value })}
//                             aria-label="Edit Income Date"
//                           />
//                         ) : (
//                           new Date(i.date).toLocaleDateString('en-IN')
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
//                             value={editingIncome.notes || ''}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, notes: e.target.value })}
//                             aria-label="Edit Income Notes"
//                           />
//                         ) : (
//                           i.notes || '-'
//                         )}
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         {editingIncome?._id === i._id ? (
//                           <>
//                             <button
//                               onClick={saveEditIncome}
//                               className="text-green-600 hover:text-green-800"
//                               aria-label="Save Income Edit"
//                             >
//                               <FiCheck />
//                             </button>
//                             <button
//                               onClick={cancelEditIncome}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Cancel Income Edit"
//                             >
//                               <FiX />
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => startEditIncome(i)}
//                               className="text-blue-600 hover:text-blue-800"
//                               aria-label="Edit Income"
//                             >
//                               <FiEdit2 />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteIncome(i._id)}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Delete Income"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {/* Income Pagination */}
//           {totalIncomePages > 1 && (
//             <div className="flex justify-center items-center gap-4 mt-4">
//               <button
//                 onClick={() => setCurrentIncomePage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentIncomePage === 1}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Previous Income Page"
//               >
//                 <FiChevronLeft /> Previous
//               </button>
//               <span className="text-gray-700">
//                 Page {currentIncomePage} of {totalIncomePages}
//               </span>
//               <button
//                 onClick={() => setCurrentIncomePage((prev) => Math.min(prev + 1, totalIncomePages))}
//                 disabled={currentIncomePage === totalIncomePages}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Next Income Page"
//               >
//                 Next <FiChevronRight />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Expenses Section */}
//         <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
//           <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-red-500" /> Expenses
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newExpense.title}
//               onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full cursor-pointer"
//               aria-label="Expense Title"
//             />
//             <select
//               value={newExpense.category}
//               onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full cursor-pointer"
//               aria-label="Select Expense Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {EXPENSE_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newExpense.amount}
//               onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full cursor-pointer"
//               aria-label="Expense Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newExpense.date}
//               onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full cursor-pointer"
//               aria-label="Expense Date"
//             />
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newExpense.notes}
//               onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full cursor-pointer"
//               aria-label="Expense Notes"
//             />
//             <button
//               onClick={handleAddExpense}
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full"
//               aria-label="Add Expense"
//             >
//               Add
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse rounded-lg shadow-sm">
//               <thead className="bg-red-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left text-xs sm:text-base">Type</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Category</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Title</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Amount</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Date</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Notes</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : paginatedExpenses.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       No expense records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedExpenses.map((e) => (
//                     <tr key={e._id} className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
//                             value={editingExpense.type}
//                             readOnly
//                             aria-label="Expense Type (Read-only)"
//                           />
//                         ) : (
//                           e.type
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
//                             value={editingExpense.category || ''}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, category: ev.target.value })}
//                             aria-label="Edit Expense Category"
//                           >
//                             <option value="">Select Category (Optional)</option>
//                             {EXPENSE_CATEGORIES.map((c) => (
//                               <option key={c} value={c}>
//                                 {c}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           e.category || '-'
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
//                             value={editingExpense.title}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, title: ev.target.value })}
//                             aria-label="Edit Expense Title"
//                           />
//                         ) : (
//                           e.title
//                         )}
//                       </td>
//                       <td className="p-3 text-red-600 font-semibold text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
//                             type="number"
//                             value={editingExpense.amount}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, amount: ev.target.value })}
//                             aria-label="Edit Expense Amount"
//                             min="0"
//                           />
//                         ) : (
//                           `₹${e.amount.toLocaleString()}`
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
//                             type="date"
//                             value={editingExpense.date}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, date: ev.target.value })}
//                             aria-label="Edit Expense Date"
//                           />
//                         ) : (
//                           new Date(e.date).toLocaleDateString('en-IN')
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
//                             value={editingExpense.notes || ''}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, notes: ev.target.value })}
//                             aria-label="Edit Expense Notes"
//                           />
//                         ) : (
//                           e.notes || '-'
//                         )}
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         {editingExpense?._id === e._id ? (
//                           <>
//                             <button
//                               onClick={saveEditExpense}
//                               className="text-green-600 hover:text-green-800"
//                               aria-label="Save Expense Edit"
//                             >
//                               <FiCheck />
//                             </button>
//                             <button
//                               onClick={cancelEditExpense}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Cancel Expense Edit"
//                             >
//                               <FiX />
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => startEditExpense(e)}
//                               className="text-blue-600 hover:text-blue-800"
//                               aria-label="Edit Expense"
//                             >
//                               <FiEdit2 />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteExpense(e._id)}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Delete Expense"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {/* Expense Pagination */}
//           {totalExpensePages > 1 && (
//             <div className="flex justify-center items-center gap-4 mt-4">
//               <button
//                 onClick={() => setCurrentExpensePage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentExpensePage === 1}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Previous Expense Page"
//               >
//                 <FiChevronLeft /> Previous
//               </button>
//               <span className="text-gray-700">
//                 Page {currentExpensePage} of {totalExpensePages}
//               </span>
//               <button
//                 onClick={() => setCurrentExpensePage((prev) => Math.min(prev + 1, totalExpensePages))}
//                 disabled={currentExpensePage === totalExpensePages}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Next Expense Page"
//               >
//                 Next <FiChevronRight />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Finance;




//-----------------CORRECT PAGEINATION---------------

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api';
// import {
//   FiTrendingUp,
//   FiDollarSign,
//   FiTrash2,
//   FiDownload,
//   FiLogOut,
//   FiEdit2,
//   FiCheck,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
// } from 'react-icons/fi';

// // 🔹 Predefined categories from backend schemas
// const INCOME_CATEGORIES = [
//   'MCO Meta',
//   'MCO PPC',
//   'Meta Rental',
//   'Commission',
//   'Technology Sale',
//   'Domestic Tour Package',
//   'International Tour Package',
//   'Airline Ticket',
//   'Hotel',
//   'Car Hire',
//   'Activities',
//   'Airport Transfers',
//   'Visa',
// ];

// const EXPENSE_CATEGORIES = [
//   'Salaries',
//   'Incentives',
//   'Rent',
//   'Travel Allowance Agent',
//   'Travel Allowance Owner',
//   'Meta Recharge',
//   'Chargeback',
//   'Refunds',
//   'Miscellaneous Expenses',
//   'Call Payment',
// ];

// const Finance = () => {
//   const [summary, setSummary] = useState(null);
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [newIncome, setNewIncome] = useState({
//     type: 'Income',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//   });
//   const [newExpense, setNewExpense] = useState({
//     type: 'Expense',
//     category: '',
//     title: '',
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     notes: '',
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [editingIncome, setEditingIncome] = useState(null);
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [filterType, setFilterType] = useState('monthYear'); // 'monthYear' or 'dateRange'
//   const [currentIncomePage, setCurrentIncomePage] = useState(1);
//   const [currentExpensePage, setCurrentExpensePage] = useState(1);
//   const itemsPerPage = 10;

//   const navigate = useNavigate();

//   // 🔹 Validate input (aligned with backend)
//   const validateInput = (input) => {
//     if (!input.title || !input.amount || !input.date) {
//       setError('Title, amount, and date are required.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (isNaN(input.amount) || Number(input.amount) <= 0) {
//       setError('Amount must be a positive number.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(input.date)) {
//       setError('Invalid date format.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (input.category && input.type === 'Income' && !INCOME_CATEGORIES.includes(input.category)) {
//       setError(`Category must be one of: ${INCOME_CATEGORIES.join(', ')}.`);
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (input.category && input.type === 'Expense' && !EXPENSE_CATEGORIES.includes(input.category)) {
//       setError(`Category must be one of: ${EXPENSE_CATEGORIES.join(', ')}.`);
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Validate date range
//   const validateDateRange = () => {
//     if (filterType !== 'dateRange') return true;
//     if (!startDate || !endDate) {
//       setError('Both start date and end date are required for date range filtering.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (!Date.parse(startDate) || !Date.parse(endDate)) {
//       setError('Invalid date format for start or end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     if (new Date(startDate) > new Date(endDate)) {
//       setError('Start date cannot be after end date.');
//       setTimeout(() => setError(''), 3000);
//       return false;
//     }
//     return true;
//   };

//   // 🔹 Fetch Finance Data
//   const fetchData = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     setIsLoading(true);
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}`
//         : `month=${month}&year=${year}`;
//       const [summaryRes, incomesRes, expensesRes] = await Promise.all([
//         api.get(`/finance/summary?${query}`),
//         api.get(`/finance/incomes?${query}`),
//         api.get(`/finance/expenses?${query}`),
//       ]);
//       setSummary(summaryRes.data);
//       setIncomes(Array.isArray(incomesRes.data.incomes) ? incomesRes.data.incomes : []);
//       setExpenses(Array.isArray(expensesRes.data.expenses) ? expensesRes.data.expenses : []);
//       setCurrentIncomePage(1);
//       setCurrentExpensePage(1);
//     } catch (err) {
//       console.error('❌ Error fetching finance data:', err);
//       setError(err.response?.data?.message || 'Failed to fetch financial data. Please try again.');
//       setTimeout(() => setError(''), 3000);
//       setIncomes([]);
//       setExpenses([]);
//       setSummary(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [month, year, startDate, endDate, filterType]);

//   // 🔹 Logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setMessage('✅ You have successfully logged out!');
//     setTimeout(() => navigate('/login'), 1500);
//   };

//   // 🔹 Excel Download
//   const handleDownloadExcel = async () => {
//     if (filterType === 'dateRange' && !validateDateRange()) return;
//     try {
//       const query = filterType === 'dateRange'
//         ? `startDate=${startDate}&endDate=${endDate}`
//         : `month=${month}&year=${year}`;
//       const res = await api.get(`/finance/download/excel?${query}`, { responseType: 'blob' });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute(
//         'download',
//         filterType === 'dateRange'
//           ? `finance_report_${startDate}_to_${endDate}.xlsx`
//           : `finance_report_${month}_${year}.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('❌ Error downloading Excel:', err);
//       setError(err.response?.data?.message || 'Failed to download Excel file. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Income
//   const handleAddIncome = async () => {
//     if (!validateInput(newIncome)) return;
//     try {
//       await api.post('/finance/income', { ...newIncome, amount: Number(newIncome.amount) });
//       setNewIncome({
//         type: 'Income',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//       });
//       setMessage('✅ Income added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding income:', err);
//       setError(err.response?.data?.message || 'Failed to add income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Add Expense
//   const handleAddExpense = async () => {
//     if (!validateInput(newExpense)) return;
//     try {
//       await api.post('/finance/expense', { ...newExpense, amount: Number(newExpense.amount) });
//       setNewExpense({
//         type: 'Expense',
//         category: '',
//         title: '',
//         amount: '',
//         date: new Date().toISOString().split('T')[0],
//         notes: '',
//       });
//       setMessage('✅ Expense added successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error adding expense:', err);
//       setError(err.response?.data?.message || 'Failed to add expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Delete Handlers
//   const handleDeleteIncome = async (id) => {
//     try {
//       await api.delete(`/finance/income/${id}`);
//       setMessage('✅ Income deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting income:', err);
//       setError(err.response?.data?.message || 'Failed to delete income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleDeleteExpense = async (id) => {
//     try {
//       await api.delete(`/finance/expense/${id}`);
//       setMessage('✅ Expense deleted successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error deleting expense:', err);
//       setError(err.response?.data?.message || 'Failed to delete expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // 🔹 Edit Handlers
//   const startEditIncome = (income) => setEditingIncome({
//     ...income,
//     date: new Date(income.date).toISOString().split('T')[0],
//   });
//   const cancelEditIncome = () => setEditingIncome(null);
//   const saveEditIncome = async () => {
//     if (!validateInput(editingIncome)) return;
//     try {
//       await api.put(`/finance/income/${editingIncome._id}`, {
//         ...editingIncome,
//         amount: Number(editingIncome.amount),
//       });
//       setEditingIncome(null);
//       setMessage('✅ Income updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating income:', err);
//       setError(err.response?.data?.message || 'Failed to update income. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const startEditExpense = (expense) => setEditingExpense({
//     ...expense,
//     date: new Date(expense.date).toISOString().split('T')[0],
//   });
//   const cancelEditExpense = () => setEditingExpense(null);
//   const saveEditExpense = async () => {
//     if (!validateInput(editingExpense)) return;
//     try {
//       await api.put(`/finance/expense/${editingExpense._id}`, {
//         ...editingExpense,
//         amount: Number(editingExpense.amount),
//       });
//       setEditingExpense(null);
//       setMessage('✅ Expense updated successfully!');
//       setTimeout(() => setMessage(''), 1500);
//       fetchData();
//     } catch (err) {
//       console.error('❌ Error updating expense:', err);
//       setError(err.response?.data?.message || 'Failed to update expense. Please try again.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // Pagination for Incomes
//   const totalIncomePages = Math.ceil(incomes.length / itemsPerPage);
//   const paginatedIncomes = incomes.slice((currentIncomePage - 1) * itemsPerPage, currentIncomePage * itemsPerPage);

//   // Pagination for Expenses
//   const totalExpensePages = Math.ceil(expenses.length / itemsPerPage);
//   const paginatedExpenses = expenses.slice((currentExpensePage - 1) * itemsPerPage, currentExpensePage * itemsPerPage);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Fixed Title Bar */}
//       <header className="fixed top-0 left-0 right-0 bg-blue-700 text-white shadow-lg z-10">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
//           <h1 className="text-xl sm:text-2xl font-bold tracking-wide">FareBuzzer Accounting Report</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition mt-2 sm:mt-0"
//             aria-label="Logout"
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </header>

//       {/* Scrollable Content */}
//       <div className="mt-20 sm:mt-16 max-w-7xl mx-auto p-4 sm:p-6 space-y-8 overflow-y-auto">
//         {/* Messages */}
//         {message && (
//           <div className="bg-green-100 text-green-700 p-3 rounded-lg shadow">{message}</div>
//         )}
//         {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg shadow">{error}</div>}

//         {/* Title + Excel Download */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
//             <FiTrendingUp className="text-blue-600" /> Accounting Dashboard
//           </h2>
//           <button
//             onClick={handleDownloadExcel}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//             aria-label="Download Excel Report"
//           >
//             <FiDownload /> Download Excel
//           </button>
//         </div>

//         {/* Filter Type Selector */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <select
//             value={filterType}
//             onChange={(e) => {
//               setFilterType(e.target.value);
//               setStartDate('');
//               setEndDate('');
//               setMonth(new Date().getMonth() + 1);
//               setYear(new Date().getFullYear());
//             }}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//             aria-label="Select Filter Type"
//           >
//             <option value="monthYear">Month/Year</option>
//             <option value="dateRange">Date Range</option>
//           </select>

//           {filterType === 'monthYear' ? (
//             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//               <select
//                 value={month}
//                 onChange={(e) => setMonth(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                 aria-label="Select Month"
//               >
//                 {[...Array(12)].map((_, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={year}
//                 onChange={(e) => setYear(Number(e.target.value))}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                 aria-label="Select Year"
//               >
//                 {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 1 + i).map((y) => (
//                   <option key={y} value={y}>
//                     {y}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ) : (
//             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                 aria-label="Select Start Date"
//               />
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                 aria-label="Select End Date"
//               />
//             </div>
//           )}
//         </div>

//         {/* Summary */}
//         {isLoading ? (
//           <div className="text-center text-gray-500">Loading...</div>
//         ) : summary ? (
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
//             <div className="p-4 bg-green-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Income</p>
//               <p className="text-lg sm:text-xl font-bold text-green-600">
//                 ₹{summary.totalIncome.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-red-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Total Expenses</p>
//               <p className="text-lg sm:text-xl font-bold text-red-600">
//                 ₹{summary.totalExpense.toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-blue-50 rounded-lg shadow">
//               <p className="text-sm text-gray-500">Balance</p>
//               <p className="text-lg sm:text-xl font-bold text-blue-600">
//                 ₹{summary.balance.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">No summary data available.</div>
//         )}

//         {/* Income Section */}
//         <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
//           <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-green-500" /> Income
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newIncome.title}
//               onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Income Title"
//             />
//             <select
//               value={newIncome.category}
//               onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Select Income Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {INCOME_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newIncome.amount}
//               onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Income Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newIncome.date}
//               onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Income Date"
//             />
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newIncome.notes}
//               onChange={(e) => setNewIncome({ ...newIncome, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/5"
//               aria-label="Income Notes"
//             />
//             <button
//               onClick={handleAddIncome}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
//               aria-label="Add Income"
//             >
//               Add
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse rounded-lg shadow-sm">
//               <thead className="bg-green-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left text-xs sm:text-base">Type</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Category</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Title</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Amount</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Date</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Notes</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : paginatedIncomes.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       No income records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedIncomes.map((i) => (
//                     <tr key={i._id} className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.type}
//                             readOnly
//                             aria-label="Income Type (Read-only)"
//                           />
//                         ) : (
//                           i.type
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.category || ''}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, category: e.target.value })}
//                             aria-label="Edit Income Category"
//                           >
//                             <option value="">Select Category (Optional)</option>
//                             {INCOME_CATEGORIES.map((c) => (
//                               <option key={c} value={c}>
//                                 {c}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           i.category || '-'
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.title}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, title: e.target.value })}
//                             aria-label="Edit Income Title"
//                           />
//                         ) : (
//                           i.title
//                         )}
//                       </td>
//                       <td className="p-3 text-green-600 font-semibold text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             type="number"
//                             value={editingIncome.amount}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, amount: e.target.value })}
//                             aria-label="Edit Income Amount"
//                             min="0"
//                           />
//                         ) : (
//                           `₹${i.amount.toLocaleString()}`
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             type="date"
//                             value={editingIncome.date}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, date: e.target.value })}
//                             aria-label="Edit Income Date"
//                           />
//                         ) : (
//                           new Date(i.date).toLocaleDateString('en-IN')
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingIncome?._id === i._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                             value={editingIncome.notes || ''}
//                             onChange={(e) => setEditingIncome({ ...editingIncome, notes: e.target.value })}
//                             aria-label="Edit Income Notes"
//                           />
//                         ) : (
//                           i.notes || '-'
//                         )}
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         {editingIncome?._id === i._id ? (
//                           <>
//                             <button
//                               onClick={saveEditIncome}
//                               className="text-green-600 hover:text-green-800"
//                               aria-label="Save Income Edit"
//                             >
//                               <FiCheck />
//                             </button>
//                             <button
//                               onClick={cancelEditIncome}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Cancel Income Edit"
//                             >
//                               <FiX />
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => startEditIncome(i)}
//                               className="text-blue-600 hover:text-blue-800"
//                               aria-label="Edit Income"
//                             >
//                               <FiEdit2 />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteIncome(i._id)}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Delete Income"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {/* Income Pagination */}
//           {totalIncomePages > 1 && (
//             <div className="flex justify-center items-center gap-4 mt-4">
//               <button
//                 onClick={() => setCurrentIncomePage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentIncomePage === 1}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Previous Income Page"
//               >
//                 <FiChevronLeft /> Previous
//               </button>
//               <span className="text-gray-700">
//                 Page {currentIncomePage} of {totalIncomePages}
//               </span>
//               <button
//                 onClick={() => setCurrentIncomePage((prev) => Math.min(prev + 1, totalIncomePages))}
//                 disabled={currentIncomePage === totalIncomePages}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Next Income Page"
//               >
//                 Next <FiChevronRight />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Expenses Section */}
//         <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
//           <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiDollarSign className="text-red-500" /> Expenses
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newExpense.title}
//               onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Expense Title"
//             />
//             <select
//               value={newExpense.category}
//               onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Select Expense Category"
//             >
//               <option value="">Select Category (Optional)</option>
//               {EXPENSE_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newExpense.amount}
//               onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Expense Amount"
//               min="0"
//             />
//             <input
//               type="date"
//               value={newExpense.date}
//               onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Expense Date"
//             />
//             <input
//               type="text"
//               placeholder="Notes (optional)"
//               value={newExpense.notes}
//               onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/5"
//               aria-label="Expense Notes"
//             />
//             <button
//               onClick={handleAddExpense}
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full sm:w-auto"
//               aria-label="Add Expense"
//             >
//               Add
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse rounded-lg shadow-sm">
//               <thead className="bg-red-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left text-xs sm:text-base">Type</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Category</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Title</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Amount</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Date</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Notes</th>
//                   <th className="p-3 text-left text-xs sm:text-base">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : paginatedExpenses.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="p-3 text-center text-gray-500">
//                       No expense records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedExpenses.map((e) => (
//                     <tr key={e._id} className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.type}
//                             readOnly
//                             aria-label="Expense Type (Read-only)"
//                           />
//                         ) : (
//                           e.type
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <select
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.category || ''}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, category: ev.target.value })}
//                             aria-label="Edit Expense Category"
//                           >
//                             <option value="">Select Category (Optional)</option>
//                             {EXPENSE_CATEGORIES.map((c) => (
//                               <option key={c} value={c}>
//                                 {c}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           e.category || '-'
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.title}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, title: ev.target.value })}
//                             aria-label="Edit Expense Title"
//                           />
//                         ) : (
//                           e.title
//                         )}
//                       </td>
//                       <td className="p-3 text-red-600 font-semibold text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             type="number"
//                             value={editingExpense.amount}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, amount: ev.target.value })}
//                             aria-label="Edit Expense Amount"
//                             min="0"
//                           />
//                         ) : (
//                           `₹${e.amount.toLocaleString()}`
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             type="date"
//                             value={editingExpense.date}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, date: ev.target.value })}
//                             aria-label="Edit Expense Date"
//                           />
//                         ) : (
//                           new Date(e.date).toLocaleDateString('en-IN')
//                         )}
//                       </td>
//                       <td className="p-3 text-xs sm:text-base">
//                         {editingExpense?._id === e._id ? (
//                           <input
//                             className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                             value={editingExpense.notes || ''}
//                             onChange={(ev) => setEditingExpense({ ...editingExpense, notes: ev.target.value })}
//                             aria-label="Edit Expense Notes"
//                           />
//                         ) : (
//                           e.notes || '-'
//                         )}
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         {editingExpense?._id === e._id ? (
//                           <>
//                             <button
//                               onClick={saveEditExpense}
//                               className="text-green-600 hover:text-green-800"
//                               aria-label="Save Expense Edit"
//                             >
//                               <FiCheck />
//                             </button>
//                             <button
//                               onClick={cancelEditExpense}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Cancel Expense Edit"
//                             >
//                               <FiX />
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => startEditExpense(e)}
//                               className="text-blue-600 hover:text-blue-800"
//                               aria-label="Edit Expense"
//                             >
//                               <FiEdit2 />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteExpense(e._id)}
//                               className="text-red-600 hover:text-red-800"
//                               aria-label="Delete Expense"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {/* Expense Pagination */}
//           {totalExpensePages > 1 && (
//             <div className="flex justify-center items-center gap-4 mt-4">
//               <button
//                 onClick={() => setCurrentExpensePage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentExpensePage === 1}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Previous Expense Page"
//               >
//                 <FiChevronLeft /> Previous
//               </button>
//               <span className="text-gray-700">
//                 Page {currentExpensePage} of {totalExpensePages}
//               </span>
//               <button
//                 onClick={() => setCurrentExpensePage((prev) => Math.min(prev + 1, totalExpensePages))}
//                 disabled={currentExpensePage === totalExpensePages}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                 aria-label="Next Expense Page"
//               >
//                 Next <FiChevronRight />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Finance;