import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobDisplay from '../components/Items/JobDisplay'


const Dashboard = () => {
  const [jobs, setJobs] = useState([]);


  async function loadJobs() {
    axios.get("http://localhost:10000/api/v1/jobs").then(async(jobs) => {
      setJobs(jobs.data)
    })
  }

  useEffect(() => {
    loadJobs()
    setInterval(loadJobs, 1500)
  }, [])



  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: '50%',
      }}
    >
      <h1>Dashboard</h1>
      {jobs?.map(job => {
        return <JobDisplay key={job.id} job={job}></JobDisplay>
      })}
    </div>
  );
};

export default Dashboard;