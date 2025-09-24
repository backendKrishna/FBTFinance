

//-----------------2 with success message--------

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const res = await api.post("/auth/login", form);
//       const { token, user } = res.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);

//       setSuccess("✅ Login successful! Redirecting...");
//       setTimeout(() => navigate("/finance"), 2000); // redirect after 2 sec
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600 px-4">
//       <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
//           🔐 Admin Login
//         </h2>

//         {error && (
//           <p className="text-red-500 mb-4 text-center bg-red-50 p-2 rounded">
//             {error}
//           </p>
//         )}
//         {success && (
//           <p className="text-green-600 mb-4 text-center bg-green-50 p-2 rounded">
//             {success}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-3 rounded-lg font-semibold shadow-md"
//           >
//             Login
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Not registered?{" "}
//           <Link
//             to="/signup"
//             className="text-blue-600 font-medium hover:underline"
//           >
//             Signup here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

//===============*===========

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const res = await api.post("/auth/login", form);
//       const { token, user } = res.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("userId", user.id); // Store user ID for potential use

//       setSuccess("✅ Login successful! Redirecting...");
//       setTimeout(() => navigate("/finance"), 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600 px-4">
//       <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
//           🔐 Login
//         </h2>

//         {error && (
//           <p className="text-red-500 mb-4 text-center bg-red-50 p-2 rounded">
//             {error}
//           </p>
//         )}
//         {success && (
//           <p className="text-green-600 mb-4 text-center bg-green-50 p-2 rounded">
//             {success}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
//           >
//             Login
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Not registered?{" "}
//           <Link to="/signup" className="text-blue-600 font-medium hover:underline">
//             Signup here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

//===========================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Login = ({ setRole }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/login", form);
      const { token, user } = res.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);

      // 🔹 Immediately update App.jsx state so role changes without refresh
      setRole(user.role);

      setSuccess("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/finance"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600 px-4">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          🔐 Login
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-center bg-red-50 p-2 rounded">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 mb-4 text-center bg-green-50 p-2 rounded">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full cursor-pointer  bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Not registered?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


//============with attrctive css==========

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api";

// const Login = ({ setRole }) => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setIsLoading(true);

//     try {
//       const res = await api.post("/auth/login", form);
//       const { token, user } = res.data;

//       // Save to localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("userId", user.id);
//       if (rememberMe) {
//         localStorage.setItem("rememberMe", "true");
//       }

//       // 🔹 Immediately update App.jsx state so role changes without refresh
//       setRole(user.role);

//       setSuccess("✅ Login successful! Redirecting to your dashboard...");
//       setTimeout(() => navigate("/finance"), 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please check your credentials.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
//       </div>

//       <div className="relative w-full max-w-md">
//         {/* Header Card */}
//         <div className="bg-white/10 backdrop-blur-lg rounded-t-2xl p-6 text-center border-b border-white/20">
//           <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
//             <span className="text-2xl text-white font-bold">F</span>
//           </div>
//           <h1 className="text-2xl font-bold text-white mb-1">Welcome Back</h1>
//           <p className="text-white/70 text-sm">Sign in to your Farebuzzer CRM</p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white/95 backdrop-blur-lg p-8 rounded-b-2xl shadow-2xl border-t border-white/20">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
//             Account Login
//           </h2>
//           <p className="text-gray-600 text-center mb-6 text-sm">
//             Access your accounting dashboard
//           </p>

//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
//               <span className="text-red-500 mr-2">⚠️</span>
//               <span className="text-red-700 text-sm">{error}</span>
//             </div>
//           )}
          
//           {success && (
//             <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
//               <span className="text-green-500 mr-2">✅</span>
//               <span className="text-green-700 text-sm">{success}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="your@email.com"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                   required
//                 />
//                 <span className="absolute left-3 top-3 text-gray-400">📧</span>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Enter your password"
//                   value={form.password}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                   required
//                 />
//                 <span className="absolute left-3 top-3 text-gray-400">🔒</span>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
//                 />
//                 <span className="ml-2 text-sm text-gray-600">Remember me</span>
//               </label>
              
//               <Link 
//                 to="/forgot-password" 
//                 className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Signing In...
//                 </span>
//               ) : (
//                 "Sign In to Dashboard"
//               )}
//             </button>
//           </form>

//           {/* Demo Credentials Hint */}
//           <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//             <p className="text-xs text-blue-700 text-center">
//               <strong>Demo Access:</strong> Try with demo@farebuzzer.com / demo123
//             </p>
//           </div>

//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <p className="text-center text-sm text-gray-600">
//               Don't have an account?{" "}
//               <Link 
//                 to="/signup" 
//                 className="text-cyan-600 font-semibold hover:text-cyan-700 transition-colors"
//               >
//                 Create account here
//               </Link>
//             </p>
//           </div>

//           <div className="mt-4 text-center">
//             <p className="text-xs text-gray-500">
//               Secure access to your accounting workspace
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


