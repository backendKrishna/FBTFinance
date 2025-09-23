// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Finance from "./pages/Finance";

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token || role !== "admin") {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/finance"
//           element={
//             <PrivateRoute>
//               <Finance />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

//=============*============

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// // import AdminFinance from "./pages/AdminFinance";
// import AdminFinance from "./pages/Finance";

// import GuestFinance from "./pages/GuestFinance";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

// function App() {
//   const role = localStorage.getItem("role");

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/finance"
//           element={
//             <ProtectedRoute>
//               {role === "admin" ? <AdminFinance /> : <GuestFinance />}
//             </ProtectedRoute>
//           }
//         />
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

//===========
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminFinance from "./pages/Finance"; // Corrected import
import GuestFinance from "./pages/GuestFinance";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/finance"
          element={
            <ProtectedRoute>
              {role === "admin" ? <AdminFinance /> : <GuestFinance />}
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;