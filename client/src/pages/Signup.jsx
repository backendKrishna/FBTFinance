
//-------------2 with success message-------

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api";

// const Signup = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
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
//       await api.post("/auth/signup", { ...form, role: "admin" });
//       setSuccess("🎉 Signup successful! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 2000); // redirect after 2 sec
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 px-4">
//       <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
//           📝 Admin Signup
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
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
//           >
//             Signup
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Already signed up?{" "}
//           <Link to="/login" className="text-green-600 font-medium hover:underline">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

//============*===========


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "guest" });
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
      const res = await api.post("/auth/signup", form);
      setSuccess("🎉 Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 px-4">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          📝 Signup
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
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="guest">Guest (View Only)</option>
              <option value="admin">Admin (Full Access)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            Signup
          </button>


{/* <button
  type="submit"
  disabled
  className="w-full cursor-not-allowed bg-green-400 text-white py-3 rounded-lg font-semibold shadow-md transition opacity-60"
>
  Signup
</button> */}


        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already signed up?{" "}
          <Link to="/login" className="text-green-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;




//============with attrcative css===============



// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api";

// const Signup = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "", role: "guest" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
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
//       const res = await api.post("/auth/signup", form);
//       setSuccess("🎉 Account created successfully! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed. Please try again.");
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
//           <h1 className="text-2xl font-bold text-white mb-1">Farebuzzer CRM</h1>
//           <p className="text-white/70 text-sm">Create your accounting dashboard</p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white/95 backdrop-blur-lg p-8 rounded-b-2xl shadow-2xl border-t border-white/20">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
//             Create Account
//           </h2>
//           <p className="text-gray-600 text-center mb-6 text-sm">
//             Join thousands of accounting professionals
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
//                 Full Name
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Enter your full name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                   required
//                 />
//                 <span className="absolute left-3 top-3 text-gray-400">👤</span>
//               </div>
//             </div>

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
//                   placeholder="Create a strong password"
//                   value={form.password}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                   required
//                 />
//                 <span className="absolute left-3 top-3 text-gray-400">🔒</span>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Account Type
//               </label>
//               <div className="relative">
//                 <select
//                   name="role"
//                   value={form.role}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-3 pl-10 pr-4 focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none transition-all"
//                   required
//                 >
//                   <option value="guest">Guest (View Only)</option>
//                   <option value="admin">Admin (Full Access)</option>
//                 </select>
//                 <span className="absolute left-3 top-3 text-gray-400">👥</span>
//                 <span className="absolute right-3 top-3 text-gray-400">▼</span>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Creating Account...
//                 </span>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <p className="text-center text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link 
//                 to="/login" 
//                 className="text-cyan-600 font-semibold hover:text-cyan-700 transition-colors"
//               >
//                 Sign in here
//               </Link>
//             </p>
//           </div>

//           <div className="mt-4 text-center">
//             <p className="text-xs text-gray-500">
//               By signing up, you agree to our Terms of Service and Privacy Policy
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;













