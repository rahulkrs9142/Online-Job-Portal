import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useTheme } from "../../context/useTheme";
import { 
  Briefcase, 
  PlusCircle, 
  LogOut, 
  LogIn, 
  Menu, 
  X,
  Compass,
  Sun,
  Moon
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getUserInitials = (email) => {
    if (!email) return "U";
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Talent<span className="text-blue-600 dark:text-blue-400">Sphere</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-200/60 dark:border-blue-800 hidden xs:inline-block">
                  Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium hidden md:block">
                Official Career Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                location.pathname === "/"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Compass className="w-4 h-4" />
              Explore Jobs
            </Link>

            <Link
              to="/post-job"
              className={`text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                location.pathname === "/post-job"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Post a Position
            </Link>
          </nav>

          {/* Action Area: Theme Selector + Auth Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* White / Dark Background Switcher (ALWAYS VISIBLE on all devices) */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                  theme === "light"
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                }`}
                title="Switch to Pure White Background"
              >
                <Sun className={`w-3.5 h-3.5 ${theme === "light" ? "text-amber-500 fill-amber-500/20" : "text-slate-400"}`} />
                <span>White</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                  theme === "dark"
                    ? "bg-slate-900 text-white shadow-sm border border-slate-700"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                }`}
                title="Switch to Dark Background"
              >
                <Moon className={`w-3.5 h-3.5 ${theme === "dark" ? "text-blue-400 fill-blue-400/20" : "text-slate-400"}`} />
                <span>Dark</span>
              </button>
            </div>

            {/* Desktop Auth / User Details */}
            <div className="hidden sm:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 px-3.5 py-1.5 rounded-full">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white dark:ring-slate-800 shadow-xs">
                      {getUserInitials(user.email)}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-800" />
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight truncate max-w-[130px]">
                      {user.email}
                    </p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium leading-none mt-0.5">
                      Online
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/auth"
                    className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 px-3.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                  <Link
                    to="/post-job"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Post Job</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex sm:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3 shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Explore Jobs
          </Link>
          <Link
            to="/post-job"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <PlusCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Post a Position
          </Link>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            {user ? (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {getUserInitials(user.email)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                      {user.email}
                    </p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Sign In
                </Link>
                <Link
                  to="/post-job"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-sm font-semibold text-white bg-blue-600 py-2.5 rounded-xl hover:bg-blue-700 shadow-xs"
                >
                  Post a Job
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;