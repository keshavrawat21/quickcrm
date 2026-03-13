import React, { useEffect } from "react";

export default function ButtonHome() {
  useEffect(() => {
    // This instantly redirects the user to your raw HTML file in the public folder
    window.location.href = "/main-website/index.html";
  }, []);

  // Show a clean loading state for the split second it takes to redirect
  return (
    <div style={{ 
      height: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "#f8faff",
      color: "#4f6ef7",
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontWeight: "500",
      fontSize: "1.1rem"
    }}>
       Loading Quick CRM...
    </div>
  );
}
// Keshav Landing Page
// import { useEffect, useState } from "react";
// import {
//   FaChartLine,
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaTwitter,
//   FaYoutube,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// export default function WelcomeHome() {
//   const [animate, setAnimate] = useState(false);

//   useEffect(() => {
//     setTimeout(() => {
//       setAnimate(true);
//     }, 100);
//   }, []);

//   // Demo data - replace with your Redux data
//   const data = {
//     companyName: "QUICK CRM",
//     tagLine: "Streamline your business operations",
//   };

//   const logoRender = (
//     <div className="flex items-center">
//       <h2 className="text-gray-800 flex items-center justify-center gap-1 text-3xl">
//         <strong>QUICK</strong>
//         <strong style={{ color: "#319AF6", fontWeight: "bold" }}>CRM</strong>
//       </h2>
//     </div>
//   );

//   return (
//     <div className="min-h-screen w-full overflow-hidden flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-white relative">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
//         <div className="absolute top-40 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Header */}
//       <header
//         className={`relative z-10 py-6 px-8 transition-all duration-500 ₹{
//           animate ? "opacity-100" : "opacity-0"
//         }`}>
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <div>{logoRender}</div>
//           <div className="flex items-center space-x-3">
//             <Link to="/login">
//               {/* <button className="px-6 py-2.5 rounded-full text-gray-700 hover:bg-white hover:shadow-md transition-all duration-300 font-medium">
//                 Customer Login
//               </button> */}
//             </Link>

//             <Link to="/admin/auth/login">
//               <button
//                 className="px-6 py-2.5 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
//                 style={{ backgroundColor: "#319AF6" }}>
//                 Admin Login
//               </button>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10 flex-grow flex items-center px-8 py-12">
//         <div className="max-w-7xl mx-auto w-full">
//           <div
//             className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ₹{
//               animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//             }`}>
//             {/* Left Column - Hero Text */}
//             <div className="space-y-6">
//               <div className="inline-block">
//                 <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
//                   <div
//                     className="w-2 h-2 rounded-full animate-pulse"
//                     style={{ backgroundColor: "#319AF6" }}></div>
//                   <span className="text-sm text-gray-600">
//                     A Product by {data?.companyName || "QUICK CRM"}
//                   </span>
//                 </div>
//               </div>

//               <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
//                 <span className="text-gray-900">Your Complete</span>
//                 <br />
//                 <span className="text-gray-900">Business Management</span>
//                 <br />
//                 <span style={{ color: "#319AF6" }}>Solution</span>
//               </h1>

//               <p className="text-lg text-gray-600 max-w-xl">
//                 Manage members, billing, expenses, and packages effortlessly.
//                 Track everything in real time with one powerful management
//                 system.
//               </p>

//               <div className="flex flex-wrap gap-4 pt-4">
//                 <Link to="/admin/auth/login">
//                   <button
//                     className="flex items-center space-x-2 px-8 py-3.5 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//                     style={{ backgroundColor: "#319AF6" }}>
//                     <span>Admin Login</span>
//                   </button>
//                 </Link>

//                 <Link to="/login">
//                   {/* <button className="px-8 py-3.5 rounded-full bg-white text-gray-700 font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
//                     Customer Login
//                   </button> */}
//                 </Link>
//               </div>
//             </div>

//             {/* Right Column - Scattered Dashboard Cards */}
//             <div className="relative h-[600px]">
//               {/* Circle Radiation Effect - Center */}
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5">
//                 <div className="relative w-96 h-96">
//                   {/* Outer rings */}
//                   <div className="absolute inset-0 rounded-full border-2 border-gray-100 opacity-20"></div>
//                   <div className="absolute inset-8 rounded-full border-2 border-gray-100 opacity-25"></div>
//                   <div className="absolute inset-16 rounded-full border-2 border-gray-200 opacity-30"></div>
//                   <div className="absolute inset-24 rounded-full border-2 border-gray-200 opacity-35"></div>
//                   <div className="absolute inset-32 rounded-full border-2 border-gray-300 opacity-40"></div>
//                   <div className="absolute inset-40 rounded-full border-2 border-gray-300 opacity-45"></div>
//                   <div className="absolute inset-48 rounded-full border-2 border-gray-400 opacity-50"></div>
//                   <div className="absolute inset-56 rounded-full border-2 border-gray-400 opacity-55"></div>
//                   <div className="absolute inset-64 rounded-full border-2 border-gray-500 opacity-60"></div>
//                 </div>
//               </div>
//               {/* Paper Plane Decoration */}
//               <div className="absolute top-4 right-16 z-20 text-red-400 text-4xl transform rotate-45">
//                 ✈️
//               </div>

//               {/* Handat Full Management Card - Top Left */}
//               <div
//                 className="absolute top-0 left-0 w-72 bg-gradient-to-br from-orange-50 via-white to-pink-50 rounded-2xl p-5 border border-orange-100 shadow-xl transform hover:scale-105 transition-all duration-300"
//                 style={{ zIndex: 15 }}>
//                 <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200 rounded-full filter blur-2xl opacity-20"></div>
//                 <div className="relative">
//                   <div className="flex items-center space-x-2 mb-3">
//                     <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-orange-500">
//                       <FaChartLine className="w-4 h-4 text-white" />
//                     </div>
//                     <span className="font-semibold text-sm text-gray-800">
//                       Lead Distribution
//                     </span>
//                   </div>

//                   {/* Pie Chart */}
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="relative w-24 h-24">
//                       <svg
//                         viewBox="0 0 100 100"
//                         className="transform -rotate-90">
//                         <circle
//                           cx="50"
//                           cy="50"
//                           r="40"
//                           fill="none"
//                           stroke="#e5e7eb"
//                           strokeWidth="12"
//                         />
//                         <circle
//                           cx="50"
//                           cy="50"
//                           r="40"
//                           fill="none"
//                           stroke="#ef4444"
//                           strokeWidth="12"
//                           strokeDasharray="75.4 251.2"
//                           strokeDashoffset="0"
//                         />
//                         <circle
//                           cx="50"
//                           cy="50"
//                           r="40"
//                           fill="none"
//                           stroke="#3b82f6"
//                           strokeWidth="12"
//                           strokeDasharray="62.8 251.2"
//                           strokeDashoffset="-75.4"
//                         />
//                         <circle
//                           cx="50"
//                           cy="50"
//                           r="40"
//                           fill="none"
//                           stroke="#10b981"
//                           strokeWidth="12"
//                           strokeDasharray="50.2 251.2"
//                           strokeDashoffset="-138.2"
//                         />
//                       </svg>
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="text-center">
//                           <div
//                             className="text-base font-bold"
//                             style={{ color: "#319AF6" }}>
//                             ₹ 79K
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Legend */}
//                     <div className="flex flex-col space-y-1 text-xs">
//                       <div className="flex items-center space-x-1">
//                         <div className="w-2 h-2 rounded-full bg-red-500"></div>
//                         <span className="text-gray-600">Salary</span>
//                         <span className="ml-auto font-medium">30%</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//                         <span className="text-gray-600">Invest</span>
//                         <span className="ml-auto font-medium">25%</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                         <span className="text-gray-600">Expense</span>
//                         <span className="ml-auto font-medium">20%</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
//                         <span className="text-gray-600">Tax</span>
//                         <span className="ml-auto font-medium">15%</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Payment Checkboxes */}
//                   <div className="space-y-1.5">
//                     <div className="text-xs font-semibold text-gray-700 mb-1">
//                       Send Payment Reminder
//                     </div>
//                     <div className="flex items-center justify-between p-1.5 bg-white rounded border border-gray-100">
//                       <span className="text-xs text-gray-600">Send E-mail</span>
//                       <input
//                         type="checkbox"
//                         className="w-3 h-3"
//                         style={{ accentColor: "#319AF6" }}
//                         defaultChecked
//                       />
//                     </div>
//                     <div className="flex items-center justify-between p-1.5 bg-white rounded border border-gray-100">
//                       <span className="text-xs text-gray-600">Send E-mail</span>
//                       <input
//                         type="checkbox"
//                         className="w-3 h-3"
//                         style={{ accentColor: "#319AF6" }}
//                       />
//                     </div>
//                     <div className="flex items-center justify-between p-1.5 bg-white rounded border border-gray-100">
//                       <span className="text-xs text-gray-600">Send Phone</span>
//                       <input
//                         type="checkbox"
//                         className="w-3 h-3"
//                         style={{ accentColor: "#319AF6" }}
//                       />
//                     </div>
//                     <div className="flex items-center justify-between p-1.5 bg-white rounded border border-gray-100">
//                       <span className="text-xs text-gray-600">
//                         Send E-mail & Phone
//                       </span>
//                       <input
//                         type="checkbox"
//                         className="w-3 h-3"
//                         style={{ accentColor: "#319AF6" }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Company Stats - Top Right */}
//               <div
//                 className="absolute top-8 right-0 w-64 bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-4 border border-yellow-100 shadow-xl transform hover:scale-105 transition-all duration-300"
//                 style={{ zIndex: 10 }}>
//                 <div className="flex items-start space-x-3">
//                   <div className="text-3xl">🏢</div>
//                   <div className="flex-1">
//                     <div className="text-lg font-bold text-gray-900">
//                       Over 15+ Company's
//                     </div>
//                     <p className="text-xs text-gray-600 mt-1">
//                       managing business operations with our CRM system
//                       worldwide.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Admission Chart - Middle Right */}
//               <div
//                 className="absolute top-56 -right-7 w-80 bg-white rounded-2xl p-5 border border-gray-100 shadow-xl transform hover:scale-105 transition-all duration-300"
//                 style={{ zIndex: 12 }}>
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <div className="text-xs font-semibold text-gray-700">
//                       Transaction Trends
//                     </div>
//                     <div className="text-2xl font-bold text-gray-900 mt-1">
//                       8,458
//                     </div>
//                     <div className="text-xs text-gray-500 mt-0.5">
//                       Monthly growth of 1,555 transactions via automated billing
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-end justify-between h-24 space-x-1.5">
//                   <div
//                     className="flex-1 rounded-t-lg"
//                     style={{ height: "65%", backgroundColor: "#319AF6" }}></div>
//                   <div
//                     className="flex-1 rounded-t-lg"
//                     style={{ height: "70%", backgroundColor: "#319AF6" }}></div>
//                   <div
//                     className="flex-1 bg-gray-200 rounded-t-lg"
//                     style={{ height: "50%" }}></div>
//                   <div
//                     className="flex-1 rounded-t-lg"
//                     style={{ height: "85%", backgroundColor: "#4FADFF" }}></div>
//                   <div
//                     className="flex-1 bg-gray-200 rounded-t-lg"
//                     style={{ height: "45%" }}></div>
//                   <div
//                     className="flex-1 bg-gray-200 rounded-t-lg"
//                     style={{ height: "40%" }}></div>
//                 </div>
//                 <div className="flex justify-between mt-2 text-xs text-gray-500">
//                   <span>July</span>
//                   <span>Aug</span>
//                   <span>Sep</span>
//                   <span>Oct</span>
//                   <span>Nov</span>
//                   <span>Dec</span>
//                 </div>
//               </div>

//               {/* Progress Analytics - Bottom Left */}
//               <div
//                 className="absolute -bottom-5 left-8 w-80 bg-white rounded-2xl p-5 border border-gray-100 shadow-xl transform hover:scale-105 transition-all duration-300"
//                 style={{ zIndex: 14 }}>
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <div className="text-xs font-semibold text-gray-700">
//                       Sale Analytics
//                     </div>
//                     <div className="text-2xl font-bold text-gray-900 mt-1">
//                       ₹ 79,556
//                     </div>
//                     <div className="text-xs text-gray-500 mt-0.5">
//                       Total revenue from past year
//                     </div>
//                   </div>
//                   <button className="text-xs px-2 py-1 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
//                     Last 7 days
//                   </button>
//                 </div>
//                 <div className="flex items-end justify-between h-28 space-x-1.5">
//                   <div
//                     className="flex-1 rounded-t-lg"
//                     style={{ height: "35%", backgroundColor: "#7AC7FF" }}></div>
//                   <div
//                     className="flex-1 rounded-t-lg"
//                     style={{ height: "40%", backgroundColor: "#7AC7FF" }}></div>
//                   <div
//                     className="flex-1 rounded-t-lg"
//                     style={{ height: "65%", backgroundColor: "#319AF6" }}></div>
//                   <div
//                     className="flex-1 rounded-t-lg"
//                     style={{ height: "45%", backgroundColor: "#7AC7FF" }}></div>
//                   <div
//                     className="flex-1 rounded-t-lg"
//                     style={{ height: "75%", backgroundColor: "#4FADFF" }}></div>
//                   <div
//                     className="flex-1 rounded-t-lg"
//                     style={{ height: "95%", backgroundColor: "#1E7ED8" }}></div>
//                   <div
//                     className="flex-1 rounded-t-lg"
//                     style={{ height: "50%", backgroundColor: "#7AC7FF" }}></div>
//                   <div
//                     className="flex-1 rounded-t-lg"
//                     style={{ height: "40%", backgroundColor: "#7AC7FF" }}></div>
//                   <div
//                     className="flex-1 rounded-t-lg"
//                     style={{ height: "30%", backgroundColor: "#7AC7FF" }}></div>
//                 </div>
//                 <div className="flex justify-between mt-2 text-xs text-gray-500">
//                   <span>1st</span>
//                   <span>5th</span>
//                   <span>10th</span>
//                   <span>15th</span>
//                   <span>20th</span>
//                   <span>25th</span>
//                   <span>30th</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="relative z-10 py-6 px-8 border-t border-gray-200 bg-white bg-opacity-50 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//           <p className="text-gray-600 text-sm">
//             All rights reserved &copy; QUICK CRM
//           </p>
//           <div className="flex items-center space-x-5">
//             {/* <a
//               href="https://www.linkedin.com/company/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-500 hover:text-blue-600 transition-colors transform hover:scale-110">
//               <FaLinkedin size={20} />
//             </a>
//             <a
//               href="https://www.facebook.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-500 hover:text-blue-600 transition-colors transform hover:scale-110">
//               <FaFacebook size={20} />
//             </a>
//             <a
//               href="https://www.instagram.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-500 hover:text-blue-600 transition-colors transform hover:scale-110">
//               <FaInstagram size={20} />
//             </a>
//             <a
//               href="https://www.youtube.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-500 hover:text-blue-600 transition-colors transform hover:scale-110">
//               <FaYoutube size={20} />
//             </a>
//             <a
//               href="https://www.twitter.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-500 hover:text-blue-600 transition-colors transform hover:scale-110">
//               <FaTwitter size={20} />
//             </a> */}
//           </div>
//         </div>
//       </footer>

//       <style>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// }
