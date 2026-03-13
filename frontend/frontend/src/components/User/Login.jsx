import { loadPermissionById } from "@/redux/rtk/features/auth/authSlice";
import { addUser } from "@/redux/rtk/features/hrm/user/userSlice";
import { getSetting } from "@/redux/rtk/features/setting/settingSlice";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginTable from "../Card/LoginTable";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [defaultValue, setDefaultValue] = useState("");
  const [imageError, setImageError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading: settingLoading } =
    useSelector((state) => state?.setting) || {};

  const setValue = (data) => {
    if (data && data.length > 0) {
      const selectedUser = data[0];
      setUsername(selectedUser.username || "");
      setPassword(selectedUser.password || "");
      setErrors({});
      setDefaultValue(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!username) newErrors.username = "Please input your username!";
    if (!password) newErrors.password = "Please input password!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const values = { username, password };
      const resp = await dispatch(addUser(values));

      if (resp.payload.message === "success") {
        dispatch(getSetting());
        dispatch(loadPermissionById(resp.payload?.data?.roleId));
        // Navigation will be handled by the useEffect that checks isLogged
      } else {
        setLoading(false);
        setErrors({ general: "Login failed. Please try again." });
      }
    } catch (error) {
      setLoading(false);
      setErrors({ general: "An error occurred. Please try again." });
    }
  };

  // Check if user is already logged in
  const isLogged = Boolean(localStorage.getItem("isLogged"));
  useEffect(() => {
    if (isLogged) {
      navigate("/admin");
    }
  }, [isLogged, navigate]);

  // Update form fields when defaultValue changes
  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      setUsername(defaultValue[0].username || "");
      setPassword(defaultValue[0].password || "");
    }
  }, [defaultValue]);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Design */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full opacity-20 -ml-48 -mb-48"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex">
              {[...Array(6)].map((_, j) => (
                <div
                  key={`${i}-${j}`}
                  className="w-24 h-24 border border-white"
                  style={{
                    opacity: Math.random() * 0.5,
                  }}></div>
              ))}
            </div>
          ))}
        </div>

        {/* Content - Moved more to the right */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 pr-16 text-white w-full">
          <div className="max-w-xl relative">
            {/* Analytics Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
              <h3 className="text-sm font-semibold mb-4 text-white/90">
                Invoices
              </h3>
              <div className="flex gap-2 mb-4">
                <button className="px-3 py-1 bg-white/20 rounded-lg text-xs">
                  Weekly
                </button>
                <button className="px-3 py-1 text-white/70 hover:bg-white/10 rounded-lg text-xs">
                  Monthly
                </button>
                <button className="px-3 py-1 text-white/70 hover:bg-white/10 rounded-lg text-xs">
                  Yearly
                </button>
              </div>
              <div className="h-32 flex items-end justify-between gap-2">
                {[40, 65, 45, 80, 55, 70, 50].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-white/30 rounded-t-lg transition-all hover:bg-white/40"
                    style={{ height: `${height}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/70">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>
            </div>

            {/* Circular Progress - Adjusted position */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl inline-block absolute -top-20 -right-10">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="white"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="351.86"
                    strokeDashoffset="140"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs text-white/70">Total</span>
                  <span className="text-2xl font-bold">42%</span>
                </div>
              </div>
            </div>

            {/* Main Heading - Right aligned */}
            <div className="text-left">
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Effortlessly manage your customer and operations
              </h2>
              <p className="text-lg text-white/80">
                Welcome to QUICK CRM! Streamline customer relationships, boost
                sales, and drive business growth effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            {data && !settingLoading && (
              <div className="w-[180px] h-[70px] mx-auto flex items-center justify-center mb-4">
                {data?.logo && !imageError ? (
                  <img
                    className="text-white text-center"
                    alt="logo"
                    src={data.logo}
                    style={{ width: "180px", height: "70px" }}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#2158e1] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">O</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700">
                      QUICK<span className="text-blue-600"> CRM</span>
                    </h2>
                  </div>
                )}
              </div>
            )}

            {settingLoading && (
              <div className="w-[180px] h-[70px] mx-auto flex flex-col gap-1 mb-4">
                <div className="bg-slate-200 h-4 rounded w-full animate-pulse"></div>
                <div className="bg-slate-200 h-4 rounded w-full animate-pulse"></div>
                <div className="bg-slate-200 h-4 rounded w-full animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-700 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* General Error */}
            {errors.general && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg">
                {errors.general}
              </div>
            )}

            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserOutlined className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      username: "",
                      general: "",
                    }));
                  }}
                  placeholder="Enter your username"
                  className={`w-full pl-10 pr-4 py-3 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockOutlined className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      password: "",
                      general: "",
                    }));
                  }}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showPassword ? (
                    <EyeInvisibleOutlined className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeOutlined className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full  text-white py-3 rounded-lg font-semibold bg-[#2158e1] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          {/* Login Table - Conditional rendering based on environment variable */}
          <div className="mt-3">
            {import.meta.env.VITE_LOGIN_TABLE === "true" && (
              <>
                <div className="mt-10">
                  <Divider />
                  <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">
                    Quick Login Options
                  </h3>
                  <LoginTable setDefaultValue={setValue} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
