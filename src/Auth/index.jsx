import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Briefcase, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";

function Auth() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage({
          type: "success",
          text: "Registration successful! Redirecting to home...",
        });
        setTimeout(() => navigate("/"), 1200);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage({
          type: "success",
          text: "Authentication successful! Redirecting...",
        });
        setTimeout(() => navigate("/"), 800);
      }
    } catch (error) {
      let friendlyError = error.message;
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        friendlyError = "Invalid email or password. Please check your credentials.";
      } else if (error.code === "auth/email-already-in-use") {
        friendlyError = "An account with this email address already exists. Please sign in.";
      } else if (error.code === "auth/weak-password") {
        friendlyError = "Password should be at least 6 characters.";
      }
      setMessage({ type: "error", text: friendlyError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col justify-between transition-colors duration-200">
      <div>
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
          <div className="max-w-md w-full">
            
            {/* Header / Brand */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/25 mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {isRegister ? "Create Your TalentSphere Account" : "Welcome Back"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
                {isRegister
                  ? "Join the network to discover verified roles and track applications."
                  : "Access your candidate profile, saved roles, and company dashboard."}
              </p>
            </div>

            {/* Auth Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-7 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none">
              
              {/* Tab Switcher */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setMessage({ type: "", text: "" });
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    !isRegister
                      ? "bg-white dark:bg-slate-750 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true);
                    setMessage({ type: "", text: "" });
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    isRegister
                      ? "bg-white dark:bg-slate-750 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Alert Feedback */}
              {message.text && (
                <div
                  className={`mb-5 p-3.5 rounded-xl text-xs font-medium flex items-start gap-2.5 ${
                    message.type === "success"
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                      : "bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Official Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {isRegister && (
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Must be at least 6 characters.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm mt-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{isRegister ? "Complete Registration" : "Sign In"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isRegister ? "Already registered?" : "New to TalentSphere?"}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(!isRegister);
                      setMessage({ type: "", text: "" });
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-semibold"
                  >
                    {isRegister ? "Sign In instead" : "Create an Account"}
                  </button>
                </p>
              </div>

            </div>

            {/* Trust Footer */}
            <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Encrypted enterprise authentication via Firebase Auth</span>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Auth;