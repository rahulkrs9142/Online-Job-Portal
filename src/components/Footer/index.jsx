import { Briefcase, ShieldCheck, Globe, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 pt-16 pb-12 mt-24 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Talent<span className="text-blue-600 dark:text-blue-500">Sphere</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              The premier career ecosystem connecting exceptional talent with high-impact enterprises, fast-growing startups, and global teams.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Verified Opportunities
              </span>
              <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-2xs">
                <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Global Hiring
              </span>
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              For Candidates
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Explore All Jobs
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Remote Opportunities
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Engineering & Tech
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Product & Design
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Salary Benchmark
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              For Employers
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/post-job" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-blue-600 dark:text-blue-400">
                  Post a Position →
                </Link>
              </li>
              <li>
                <a href="#hiring" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Hiring Solutions
                </a>
              </li>
              <li>
                <a href="#talent" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Talent Sourcing
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Enterprise Plans
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Compliance & Security
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate / Support */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Support Desk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TalentSphere Enterprise Technologies Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with precision for modern enterprise hiring <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
