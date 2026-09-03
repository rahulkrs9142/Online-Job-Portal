import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc
} from "firebase/firestore";
import dayjs from "dayjs";
import { db } from "./firebase.config";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import JobDetails from "./components/JobDetails";
import PostJob from "./PostJob";
import Auth from "./Auth";
import Footer from "./components/Footer";
import dummyJobsList from "./JobDummyData";
import { 
  Briefcase, 
  RotateCcw, 
  SearchX, 
  SlidersHorizontal, 
  Database
} from "lucide-react";

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const [activeCriteria, setActiveCriteria] = useState({
    title: "",
    type: "",
    location: "",
    experience: "",
  });
  const [sortBy, setSortBy] = useState("latest");
  const [seeding, setSeeding] = useState(false);

  // Safe date parser for Firestore Timestamps and strings
  const parseJobDate = (createdAt) => {
    if (!createdAt) return dayjs();
    if (typeof createdAt.toDate === "function") {
      return dayjs(createdAt.toDate());
    }
    return dayjs(createdAt);
  };

  // Fetch all jobs from Firebase Firestore
  const fetchJobs = async () => {
    setLoading(true);
    setCustomSearch(false);
    setActiveCriteria({
      title: "",
      type: "",
      location: "",
      experience: "",
    });

    try {
      const q = query(
        collection(db, "jobs"),
        orderBy("createdAt", "desc")
      );

      const req = await getDocs(q);

      const tempJobs = req.docs.map((docSnap) => {
        const data = docSnap.data();
        const dateObj = parseJobDate(data.createdAt);

        return {
          ...data,
          id: docSnap.id,
          createdAt: dateObj.toDate ? dateObj.toDate() : dateObj,
          postedDaysAgo: Math.max(0, dayjs().diff(dateObj, "day")),
        };
      });

      setJobs(tempJobs);
    } catch (error) {
      console.error("Error fetching jobs from Firebase:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Search/filter jobs with criteria
  const fetchJobsCustom = async (jobCriteria) => {
    setLoading(true);
    setCustomSearch(true);
    setActiveCriteria(jobCriteria);

    try {
      const q = query(
        collection(db, "jobs"),
        orderBy("createdAt", "desc")
      );
      const req = await getDocs(q);

      const allJobs = req.docs.map((docSnap) => {
        const data = docSnap.data();
        const dateObj = parseJobDate(data.createdAt);

        return {
          ...data,
          id: docSnap.id,
          createdAt: dateObj.toDate ? dateObj.toDate() : dateObj,
          postedDaysAgo: Math.max(0, dayjs().diff(dateObj, "day")),
        };
      });

      // Filter in-memory for flexible multi-field matching
      const { title, type, location, experience } = jobCriteria;

      const filtered = allJobs.filter((job) => {
        const matchesTitle =
          !title ||
          (job.title && job.title.toLowerCase().includes(title.toLowerCase())) ||
          (job.skills && job.skills.some((s) => s.toLowerCase().includes(title.toLowerCase())));

        const matchesType = !type || job.type === type;
        const matchesLocation =
          !location || (job.location && job.location.toLowerCase().includes(location.toLowerCase()));
        const matchesExperience = !experience || job.experience === experience;

        return matchesTitle && matchesType && matchesLocation && matchesExperience;
      });

      setJobs(filtered);
    } catch (error) {
      console.error("Error searching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Seed sample jobs to Firestore if the collection is empty
  const handleSeedJobs = async () => {
    setSeeding(true);
    try {
      for (const item of dummyJobsList) {
        await addDoc(collection(db, "jobs"), {
          title: item.title,
          company: item.company,
          location: item.location,
          type: item.type,
          experience: item.experience,
          salary: item.type === "Full-time" ? "₹16 - 24 LPA" : "₹8 - 14 LPA",
          skills: item.skills || ["Engineering"],
          applyLink: item.job_link || "https://google.com/careers",
          description: `Exciting opportunity to work at ${item.company} as a ${item.title}. You will design high-performance systems and build next-gen features.`,
          createdAt: new Date(),
        });
      }
      await fetchJobs();
    } catch (err) {
      console.error("Error seeding sample jobs:", err);
    } finally {
      setSeeding(false);
    }
  };

  // Quick tag selection from Header
  const handleSelectTag = (tag) => {
    const criteria = {
      title: tag === "Remote" ? "" : tag,
      type: "",
      location: tag === "Remote" ? "Remote" : "",
      experience: "",
    };
    fetchJobsCustom(criteria);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Sorted jobs
  const sortedJobs = useMemo(() => {
    const list = [...jobs];
    if (sortBy === "latest") {
      return list.sort((a, b) => (a.postedDaysAgo || 0) - (b.postedDaysAgo || 0));
    }
    return list;
  }, [jobs, sortBy]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col justify-between transition-colors duration-200">
      <div>
        <Navbar />
        <Header onSelectTag={handleSelectTag} />
        
        <SearchBar
          fetchJobsCustom={fetchJobsCustom}
          fetchJobs={fetchJobs}
          initialCriteria={activeCriteria}
        />

        {/* Main Listings Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          
          {/* Section Header & Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <span>Available Career Opportunities</span>
                {!loading && (
                  <span className="text-xs font-semibold bg-blue-100/70 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-200/50 dark:border-blue-800">
                    {jobs.length} open
                  </span>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {customSearch
                  ? "Showing filtered results matching your custom criteria."
                  : "Verified corporate and startup positions actively hiring."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl shadow-2xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span className="font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="latest" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">Most Recent</option>
                  <option value="all" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">Standard</option>
                </select>
              </div>

              {customSearch && (
                <button
                  onClick={fetchJobs}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 px-3 py-2 rounded-xl transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                      <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Job Listings List */}
          {!loading && sortedJobs.length > 0 && (
            <div className="space-y-4">
              {sortedJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && sortedJobs.length === 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-12 text-center max-w-2xl mx-auto my-8 shadow-xs">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                No matching positions found
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                {customSearch
                  ? "We couldn't find any positions matching your search filters. Try widening your criteria or clearing filters."
                  : "There are currently no job postings in the database. As an administrator, you can seed sample opportunities or post a new job."}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {customSearch ? (
                  <button
                    onClick={fetchJobs}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Clear Search Filters</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSeedJobs}
                    disabled={seeding}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
                  >
                    {seeding ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Database className="w-4 h-4" />
                    )}
                    <span>{seeding ? "Populating Database..." : "Seed Sample Corporate Jobs"}</span>
                  </button>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/job-details" element={<JobDetails />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;