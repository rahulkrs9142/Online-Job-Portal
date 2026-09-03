import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase.config";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  Clock, 
  Building2, 
  CheckCircle2, 
  ExternalLink, 
  Share2, 
  Bookmark, 
  ShieldCheck, 
  Award,
  Sparkles,
  Check,
  Send
} from "lucide-react";
import dayjs from "dayjs";

function JobDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [job, setJob] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({ name: "", email: "", resume: "", note: "" });
  const [applySubmitted, setApplySubmitted] = useState(false);

  const jobIdFromQuery = searchParams.get("id");

  useEffect(() => {
    // If state is not present, fetch from Firestore by ID if available
    const fetchJobById = async () => {
      const idToFetch = jobIdFromQuery || location.state?.id;
      if (!job && idToFetch) {
        try {
          setLoading(true);
          const docRef = doc(db, "jobs", idToFetch);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            let postedDaysAgo = 0;
            if (data.createdAt) {
              const dt = typeof data.createdAt.toDate === "function" ? data.createdAt.toDate() : data.createdAt;
              postedDaysAgo = dayjs().diff(dayjs(dt), "day");
            }
            setJob({ id: docSnap.id, ...data, postedDaysAgo });
          }
        } catch (err) {
          console.error("Error fetching job details:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchJobById();
  }, [jobIdFromQuery, location.state]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleQuickApply = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "applications"), {
        jobId: job.id || "",
        jobTitle: job.title || "",
        company: job.company || "",
        applicantName: applyForm.name.trim(),
        applicantEmail: applyForm.email.trim(),
        resumeLink: applyForm.resume.trim(),
        coverNote: applyForm.note.trim(),
        applicantUid: auth.currentUser ? auth.currentUser.uid : null,
        appliedAt: new Date(),
      });
      setApplySubmitted(true);
      setTimeout(() => {
        setApplyModalOpen(false);
        setApplySubmitted(false);
        setApplyForm({ name: "", email: "", resume: "", note: "" });
      }, 2000);
    } catch (err) {
      console.error("Error saving job application to Firestore:", err);
      alert("Failed to submit application: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading position specifications...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Job Specification Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
            The position you are looking for may have expired, been closed by the recruiter, or moved.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Job Board
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const daysText =
    job.postedDaysAgo === 0
      ? "Posted Today"
      : job.postedDaysAgo === 1
      ? "Posted 1 day ago"
      : `Posted ${job.postedDaysAgo} days ago`;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col justify-between transition-colors duration-200">
      <div>
        <Navbar />

        {/* Breadcrumb & Navigation Bar */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Open Positions
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? "Link Copied!" : "Share"}</span>
              </button>

              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  bookmarked
                    ? "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400"
                    : "border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                title="Save position"
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-blue-600 dark:fill-blue-400" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Job Details */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Main Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        {job.company || "Enterprise Partner"}
                      </span>
                      <span className="inline-flex items-center text-blue-600 dark:text-blue-400" title="Verified Recruiter">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {job.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        {job.location || "Remote"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        {job.type || "Full-time"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        {daysText}
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-3">
                    {job.salary && (
                      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 px-4 py-2 rounded-xl text-center">
                        <span className="block text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                          Compensation
                        </span>
                        <span className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400">
                          {job.salary}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Overview Attributes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700">
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      Experience
                    </span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      {job.experience || "Any Level"}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700">
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      Job Type
                    </span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      {job.type || "Full-time"}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700">
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      Location
                    </span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      {job.location || "Remote"}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700">
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      Status
                    </span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Actively Hiring
                    </span>
                  </div>
                </div>

                {/* Required Skills */}
                {job.skills && job.skills.length > 0 && (
                  <div className="py-6 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                      Required Technical Stack & Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50/80 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-200/60 dark:border-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Role Description */}
                <div className="py-6 space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                      About the Position
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                      {job.description ||
                        `We are seeking an outstanding ${job.title} to join our high-performing team at ${job.company}. In this role, you will be instrumental in architecting, building, and deploying mission-critical systems and intuitive user interfaces that deliver high impact.`}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                      Core Responsibilities
                    </h3>
                    <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>Collaborate cross-functionally with product managers, designers, and engineering leaders.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>Design and implement clean, maintainable, performant, and well-tested code.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>Participate in peer code reviews, architectural discussions, and technical retrospectives.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>Drive reliability, scalability, and security standards throughout the engineering lifecycle.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                      Candidate Qualifications
                    </h3>
                    <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>Relevant experience ({job.experience || "1+ years"}) in a modern production engineering environment.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>Strong problem-solving capability and clear, professional written/verbal communication.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>Familiarity with agile methodologies, Git version control, and continuous integration.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                      Perks & Benefits
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
                      <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Comprehensive health & wellness coverage</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Flexible remote / hybrid work culture</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Annual learning & professional stipend</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Competitive performance bonuses</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Application Card & Company Overview */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Application Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs sticky top-28">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Ready to Apply?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                  Submit your application directly to {job.company}. Expected response time is within 48 hours.
                </p>

                <div className="space-y-3">
                  {job.applyLink && (
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm text-center"
                    >
                      <span>Apply on Company Portal</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setApplyModalOpen(true)}
                    className={`w-full font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm ${
                      job.applyLink
                        ? "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                        : "bg-blue-600 hover:bg-blue-700 active:scale-98 text-white shadow-md shadow-blue-500/20"
                    }`}
                  >
                    <span>Quick Apply on TalentSphere</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Role Reference:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">{job.id ? job.id.slice(0, 8) : "REF-1092"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Hiring Status:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Verification:</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified
                    </span>
                  </div>
                </div>

                {/* Company Mini Card */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                    About {job.company}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                    A certified employer on TalentSphere committed to building innovative solutions with inclusive, high-impact culture.
                  </p>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer">
                    View all {job.company} openings →
                  </div>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>

      {/* Quick Apply Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Apply for {job.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Submit your candidate profile directly to {job.company}&apos;s talent acquisition team.
            </p>

            {applySubmitted ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Application Submitted!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Your details have been forwarded to the recruiter.</p>
              </div>
            ) : (
              <form onSubmit={handleQuickApply} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={applyForm.name}
                    onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={applyForm.email}
                    onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Resume / Portfolio Link</label>
                  <input
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/jane or Drive link"
                    value={applyForm.resume}
                    onChange={(e) => setApplyForm({ ...applyForm, resume: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Brief Note / Cover Letter</label>
                  <textarea
                    rows={3}
                    placeholder="Why are you a great match for this role?"
                    value={applyForm.note}
                    onChange={(e) => setApplyForm({ ...applyForm, note: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setApplyModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default JobDetails;