import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import jobData from "./JobDummyData";
import { useState, useEffect } from "react";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

function App() {
  const [jobs,setJobs] = useState([]);  
  const [customSearch, setCustomSearch] = useState(false);

  const fetchJobs = async () => {
    setCustomSearch(false);
    const tempJobs = []
    const jobRef = query(collection(db, "jobs"));
    const q = query(jobRef, orderBy("postedOn", "desc"));
    const req = await getDocs(q);

    req.forEach((job) => {
      // console.log(doc.id, " => ", doc.data());
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate()
      })
  });
  setJobs(tempJobs);
}

const fetchJobsCustom = async (jobCriteria) => {
  setCustomSearch(true);
    const tempJobs = []
    const jobRef = query(collection(db, "jobs"));
    const q = query(jobRef, where("type", "==", jobCriteria.type),where("title", "==", jobCriteria.title),where("location", "==", jobCriteria.location),where("experience", "==", jobCriteria.experience), orderBy("postedOn", "desc"));
    const req = await getDocs(q);

    req.forEach((job) => {
      // console.log(doc.id, " => ", doc.data());
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate()
      })
  });
  setJobs(tempJobs);
}

useEffect(() => {
  fetchJobs();
}, [])

  return (
    <div>
      <Navbar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom} />
      {customSearch && (
        <div className='flex justify-end px-14 mb-4'>
  <button onClick={fetchJobs}>
    <p className="bg-blue-500 px-10 py-2 rounded-md text-white font-bold">
      Clear Filters
    </p>
  </button>
</div>
      )}
      {jobs?.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  )
}

export default App
