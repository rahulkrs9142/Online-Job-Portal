import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Building2, 
  ArrowRight, 
  Bookmark, 
  CheckCircle2, 
  Banknote,
  ExternalLink 
} from "lucide-react";
import { useState } from "react";

function JobCard(props) {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);

  const daysText =
    props.postedDaysAgo === 0
      ? "Today"
      : props.postedDaysAgo === 1
      ? "1 day ago"
      : `${props.postedDaysAgo}d ago`;

  // Generate pleasant avatar background color based on company name
  const getAvatarBg = (name) => {
    const colors = [
      "from-blue-600 to-indigo-600",
      "from-emerald-600 to-teal-600",
      "from-purple-600 to-indigo-600",
      "from-rose-500 to-pink-600",
      "from-amber-500 to-orange-600",
      "from-cyan-600 to-blue-600",
    ];
    let sum = 0;
    for (let i = 0; i < (name || "").length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const companyInitials = (props.company || "C")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleCardClick = () => {
    navigate("/job-details", { state: props });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/70 p-5 sm:p-6 shadow-xs dark:shadow-none hover:shadow-lg dark:hover:shadow-blue-900/10 hover:-translate-y-0.5 transition-all duration-200 group relative">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        
        {/* Left Side: Avatar + Details */}
        <div className="flex items-start gap-4 sm:gap-5 flex-1">
          {/* Company Monogram Avatar */}
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-tr ${getAvatarBg(
              props.company
            )} flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-sm shrink-0`}
          >
            {companyInitials}
          </div>

          <div className="flex-1 min-w-0">
            {/* Top Bar: Company & Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                {props.company || "Enterprise Partner"}
              </span>
              <span className="inline-flex items-center text-blue-600 dark:text-blue-400" title="Verified Employer">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>

              {props.postedDaysAgo <= 2 && (
                <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  New
                </span>
              )}
            </div>

            {/* Job Title */}
            <h3 
              onClick={handleCardClick}
              className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-1"
            >
              {props.title}
            </h3>

            {/* Meta Attributes */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 mt-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                {props.location || "Remote"}
              </span>

              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                {props.type || "Full-time"}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                {props.experience || "Not specified"}
              </span>

              {props.salary && (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
                  <Banknote className="w-3.5 h-3.5" />
                  {props.salary}
                </span>
              )}
            </div>

            {/* Skills Badges */}
            {props.skills && props.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {props.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Action Area & Timestamp */}
        <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{daysText}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBookmarked(!bookmarked)}
              title={bookmarked ? "Remove Bookmark" : "Save Job"}
              className={`p-2.5 rounded-xl border transition-colors ${
                bookmarked
                  ? "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-blue-600 dark:fill-blue-400" : ""}`} />
            </button>

            <button
              type="button"
              onClick={handleCardClick}
              className="bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-600 dark:hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white dark:hover:text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-800 hover:border-blue-600 dark:hover:border-blue-600 transition-all flex items-center gap-1.5 shadow-2xs group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default JobCard;