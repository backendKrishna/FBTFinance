// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api";

// const Signup = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await api.post("/auth/signup", { ...form, role: "admin" }); // force admin role
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Admin Signup</h2>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Signup
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm">
//           Already signed up?{" "}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;




//----------------1-----

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api";

// const Signup = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await api.post("/auth/signup", { ...form, role: "admin" }); // force admin role
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4">
//       <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
//           🚀 Admin Signup
//         </h2>

//         {error && (
//           <p className="text-red-500 mb-4 text-center bg-red-50 p-2 rounded">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-3 outline-none"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-3 outline-none"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-3 outline-none"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-3 rounded-lg font-semibold shadow-md"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-blue-600 font-medium hover:underline"
//           >
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


//-------------2 with success message-------

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      await api.post("/auth/signup", { ...form, role: "admin" });
      setSuccess("🎉 Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // redirect after 2 sec
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 px-4">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          📝 Admin Signup
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

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            Signup
          </button>
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













