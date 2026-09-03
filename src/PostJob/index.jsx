import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Banknote, 
  Link as LinkIcon, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    experience: "2-5 Years",
    salary: "",
    skills: "",
    description: "",
    applyLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!job.title.trim() || !job.company.trim() || !job.location.trim() || !job.applyLink.trim()) {
      setError("Please fill in all required fields (Job Title, Company, Location, and Application Link).");
      return;
    }

    setLoading(true);

    try {
      const skillsArray = job.skills
        ? job.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : ["General"];

      await addDoc(collection(db, "jobs"), {
        title: job.title.trim(),
        company: job.company.trim(),
        location: job.location.trim(),
        type: job.type,
        experience: job.experience,
        salary: job.salary.trim() || "Competitive",
        skills: skillsArray,
        description: job.description.trim() || "",
        applyLink: job.applyLink.trim(),
        createdAt: new Date(),
      });

      setSuccess(true);
      setJob({
        title: "",
        company: "",
        location: "",
        type: "Full-time",
        experience: "2-5 Years",
        salary: "",
        skills: "",
        description: "",
        applyLink: "",
      });
    } catch (err) {
      console.error("Error posting job to Firestore:", err);
      setError(err.message || "Failed to post job. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Preview card props
  const previewSkills = job.skills
    ? job.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : ["React", "TypeScript", "Tailwind"];

  const previewJob = {
    id: "preview-101",
    title: job.title || "Senior Full Stack Engineer",
    company: job.company || "Acme Corporation",
    location: job.location || "Bangalore / Remote",
    type: job.type || "Full-time",
    experience: job.experience || "2-5 Years",
    salary: job.salary || "₹18 - 25 LPA",
    skills: previewSkills.length > 0 ? previewSkills : ["Software Engineering"],
    postedDaysAgo: 0,
    applyLink: job.applyLink,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col justify-between transition-colors duration-200">
      <div>
        <Navbar />

        {/* Header Banner */}
        <div className="bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900/80 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Employer Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Post an Open Position
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Connect with top-tier verified professionals. Published listings go live instantly on the TalentSphere network.
            </p>
          </div>
        </div>

        {/* Main Content Area: Form & Live Preview */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form Section */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
                
                {success && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Position Published Successfully!</h4>
                      <p className="text-xs mt-1 text-emerald-700 dark:text-emerald-300">
                        Your listing is now live on the portal and searchable by candidate filters.
                      </p>
                      <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="mt-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        View on Job Board <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    <p className="text-xs font-semibold">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      Company & Role Identity
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Job Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          required
                          placeholder="e.g. Lead Frontend Engineer"
                          value={job.title}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Company Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          placeholder="e.g. Acme Technologies"
                          value={job.company}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location & Employment Spec */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      Location & Employment Parameters
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Location <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="location"
                          required
                          placeholder="e.g. Bangalore, Remote"
                          value={job.location}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Employment Type
                        </label>
                        <select
                          name="type"
                          value={job.type}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Experience Level
                        </label>
                        <select
                          name="experience"
                          value={job.experience}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Fresher">Fresher</option>
                          <option value="0-2 Years">0-2 Years</option>
                          <option value="2-5 Years">2-5 Years</option>
                          <option value="5+ Years">5+ Years</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Compensation & Skills */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      Compensation & Technical Requirements
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Salary / Compensation
                        </label>
                        <input
                          type="text"
                          name="salary"
                          placeholder="e.g. ₹15 - 22 LPA or $90k - $120k"
                          value={job.salary}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Required Skills (Comma separated)
                        </label>
                        <input
                          type="text"
                          name="skills"
                          placeholder="React, Node.js, TypeScript, AWS"
                          value={job.skills}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description & Apply Link */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      Description & Application Channel
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Application URL or Email <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                            <LinkIcon className="w-4 h-4" />
                          </div>
                          <input
                            type="url"
                            name="applyLink"
                            required
                            placeholder="https://company.com/careers/apply or mailto:jobs@company.com"
                            value={job.applyLink}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Role Overview & Qualifications (Optional)
                        </label>
                        <textarea
                          name="description"
                          rows={4}
                          placeholder="Outline the core responsibilities, team structure, and prerequisites for this position..."
                          value={job.description}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl shadow-md shadow-blue-500/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Publishing to Enterprise Network...</span>
                        </>
                      ) : (
                        <>
                          <Briefcase className="w-4 h-4" />
                          <span>Publish Open Position</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>
            </div>

            {/* Right Section: Live Preview Card */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Live Candidate View Preview
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This is how your listing will be displayed to thousands of job seekers on the TalentSphere portal.
                </p>

                <div className="scale-95 sm:scale-100 origin-top">
                  <JobCard {...previewJob} />
                </div>

                <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800 rounded-xl p-4 text-xs text-blue-800 dark:text-blue-300">
                  <span className="font-bold block mb-1">💡 TalentSphere Quality Guarantee</span>
                  Verified jobs are prioritized across candidate search indexes and weekly digest alerts.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PostJob;