import { Sparkles, Building2, Users, CheckCircle2, TrendingUp } from "lucide-react";

function Header({ onSelectTag }) {
  const trendingTags = [
    "React Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Android Developer",
    "Remote",
  ];

  return (
    <div className="relative overflow-hidden pt-12 pb-10 bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-900/60 dark:via-slate-950/40 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 transition-colors duration-200">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-400/15 dark:bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-indigo-400/15 dark:bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/70 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          The Premier Enterprise Career Network
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Find Your Next Career Move at{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-300 bg-clip-text text-transparent">
            Industry Leaders
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Discover thousands of verified career opportunities across engineering, product, AI, and design with transparent salaries and direct employer contacts.
        </p>

        {/* Popular Tags */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-blue-500" /> Trending:
          </span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onSelectTag && onSelectTag(tag)}
              className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-slate-800 dark:hover:text-blue-400 border border-slate-200/80 dark:border-slate-800 px-3 py-1.5 rounded-lg shadow-2xs transition-all duration-150 active:scale-95"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
          <div className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xs p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
              <Building2 className="w-4 h-4" />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">1,200+</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Hiring Companies</p>
          </div>

          <div className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xs p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">15k+</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Openings</p>
          </div>

          <div className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xs p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">45k+</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Candidates Placed</p>
          </div>

          <div className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xs p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">100%</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verified Employers</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Header;