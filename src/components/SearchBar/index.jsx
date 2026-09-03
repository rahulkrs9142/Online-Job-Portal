import { Search, MapPin, Briefcase, Award, RotateCcw, X, Filter } from "lucide-react";
import { useEffect, useState } from "react";

function SearchBar({ fetchJobsCustom, fetchJobs, initialCriteria }) {
  const [jobCriteria, setJobCriteria] = useState({
    title: "",
    type: "",
    location: "",
    experience: "",
  });

  useEffect(() => {
    if (initialCriteria) {
      setJobCriteria((prev) => ({
        ...prev,
        ...initialCriteria,
      }));
    }
  }, [initialCriteria]);

  const handleChange = (e) => {
    setJobCriteria((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    fetchJobsCustom(jobCriteria);
  };

  const handleClear = () => {
    const emptyCriteria = {
      title: "",
      type: "",
      location: "",
      experience: "",
    };
    setJobCriteria(emptyCriteria);
    fetchJobs();
  };

  const removeFilter = (key) => {
    const updated = { ...jobCriteria, [key]: "" };
    setJobCriteria(updated);
    fetchJobsCustom(updated);
  };

  const hasActiveFilters = Boolean(
    jobCriteria.title || jobCriteria.type || jobCriteria.location || jobCriteria.experience
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 p-4 sm:p-5 transition-colors duration-200">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Job Role / Keyword */}
            <div className="lg:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="title"
                placeholder="Job role, keywords (e.g. React Developer)"
                value={jobCriteria.title}
                onChange={handleChange}
                list="roles-list"
                className="w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-750 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <datalist id="roles-list">
                <option value="React Developer" />
                <option value="Frontend Developer" />
                <option value="Full Stack Developer" />
                <option value="Backend Developer" />
                <option value="Android Developer" />
                <option value="iOS Developer" />
                <option value="Data Scientist" />
                <option value="Product Manager" />
                <option value="UI/UX Designer" />
              </datalist>
            </div>

            {/* Job Type */}
            <div className="lg:col-span-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <Briefcase className="w-4 h-4" />
              </div>
              <select
                name="type"
                value={jobCriteria.type}
                onChange={handleChange}
                className="w-full pl-10 pr-8 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-750 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Location */}
            <div className="lg:col-span-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                name="location"
                value={jobCriteria.location}
                onChange={handleChange}
                className="w-full pl-10 pr-8 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-750 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">All Locations</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Delhi">Delhi / NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Chennai">Chennai</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Experience */}
            <div className="lg:col-span-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <Award className="w-4 h-4" />
              </div>
              <select
                name="experience"
                value={jobCriteria.experience}
                onChange={handleChange}
                className="w-full pl-10 pr-8 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-750 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">All Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="0-2 Years">0-2 Years</option>
                <option value="2-5 Years">2-5 Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-2 flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClear}
                  title="Clear all filters"
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 p-3 rounded-xl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </form>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Active Filters:
            </span>

            {jobCriteria.title && (
              <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-medium px-2.5 py-1 rounded-md border border-blue-200/60 dark:border-blue-800">
                Role: {jobCriteria.title}
                <button
                  type="button"
                  onClick={() => removeFilter("title")}
                  className="hover:text-blue-900 dark:hover:text-blue-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {jobCriteria.type && (
              <span className="inline-flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-medium px-2.5 py-1 rounded-md border border-indigo-200/60 dark:border-indigo-800">
                Type: {jobCriteria.type}
                <button
                  type="button"
                  onClick={() => removeFilter("type")}
                  className="hover:text-indigo-900 dark:hover:text-indigo-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {jobCriteria.location && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-medium px-2.5 py-1 rounded-md border border-emerald-200/60 dark:border-emerald-800">
                Location: {jobCriteria.location}
                <button
                  type="button"
                  onClick={() => removeFilter("location")}
                  className="hover:text-emerald-900 dark:hover:text-emerald-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {jobCriteria.experience && (
              <span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-medium px-2.5 py-1 rounded-md border border-amber-200/60 dark:border-amber-800">
                Exp: {jobCriteria.experience}
                <button
                  type="button"
                  onClick={() => removeFilter("experience")}
                  className="hover:text-amber-950 dark:hover:text-amber-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleClear}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold ml-2 underline"
            >
              Reset all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;