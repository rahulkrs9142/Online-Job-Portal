import React from "react"
import { useState } from "react";
function SearchBar(props) {
    const [jobCriteria, setJobCriteria] = useState({
        title: "",
        type: "",
        location: "",
        experience: ""
    });

    const handleChange = (e) => {
        setJobCriteria((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    // console.log(jobCriteria);

    const searchJobs = async() => {
        await props.fetchJobsCustom(jobCriteria);
    }


    return (
        <div className='flex gap-4 my-10 justify-center px-10'>
            <select onChange={handleChange} name="title" value={jobCriteria.title}  className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
                <option value="" disabled hidden>Job Role</option>
                <option value="ios Developer">iOS Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Android Developer">Android Developer</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Product Manager">Product Manager</option>
            </select>

            <select onChange={handleChange} name="type" value={jobCriteria.type} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
                <option value="" disabled hidden>Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
            </select>

            <select onChange={handleChange} name="location" value={jobCriteria.location} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
                <option value="" disabled hidden>Location</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="In-Office">In-Office</option>
            </select>

            <select onChange={handleChange} name="experience" value={jobCriteria.experience} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
                <option value="" disabled hidden>Experience Level</option>
                <option value="Fresher">Fresher</option>
                <option value="Junior Level">Junior Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
            </select>
            <button onClick={searchJobs} className='w-64 bg-blue-500 text-white font-bold py-3 rounded-md'>Search</button>
        </div>
    )
}       
export default SearchBar