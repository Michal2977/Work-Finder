import { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom";



function EmployerJobs(){

    const [user,setUser] = useState(null);
    const [jobs,setJobs] = useState([]);
    const [amountsOfApplications,setAmountsOfApplications ] = useState({});
    const [countQuickApplications,setCountQuickApplications] = useState({});
    


    const getApplicationsAmount = (jobId) => {
      const token = localStorage.getItem("token");
      if(!token){return;}

      fetch(`http://localhost:8080/api/jobs/amounts-of-applications/${jobId}`,{
        headers : {Authorization : `Bearer ${token}`}
      }).then(response => response.json()).then(data => {setAmountsOfApplications(prev => ({...prev,[jobId] : data}));
    });
  }
  const getCountQuickApplications = (jobId) => {
      const token = localStorage.getItem("token");
      if(!token){return;}

      fetch(`http://localhost:8080/api/jobs/count-quick-applications/${jobId}`,{
        headers : {Authorization : `Bearer ${token}`}
      }).then(response => response.json()).then(data => {setCountQuickApplications(prev => ({...prev,[jobId] : data}));
    });
  }

    useEffect(() => {
      const token = localStorage.getItem("token");
      if(!token){return;}

      fetch("http://localhost:8080/api/auth/account-information",{
        headers : {Authorization : `Bearer ${token}`}
      }).then(response => response.json()).then(data => setUser(data));

      fetch("http://localhost:8080/api/my-jobs-offers",{
        headers : {Authorization : `Bearer ${token}`}
      }).then(response => response.json()).then(data => {
    setJobs(data);

    data.forEach(job => {
        getApplicationsAmount(job.id); getCountQuickApplications(job.id);
    });
});

    },[]);

      const softDelete = async(id) => {
    const token = localStorage.getItem("token");
    if(!token) {return;}
    const response  =  await fetch(`http://localhost:8080/api/soft-delete/${id}`,{
        method : "DELETE",
        headers : {Authorization : `Bearer ${token}`}
    });
    if(response.ok){
     window.location.reload();
    }};

    const getTimeLeft = (expiresAt) => {
     const now = new Date();
     const expiration = new Date(expiresAt);

     const diff = expiration - now;
     
     if(diff <= 0 ){
           return "The listing has expired";
     }

     const minutes = Math.floor(diff / (1000 * 60));
     const days = Math.floor(minutes /(60 *24));

     if(days >= 1){
        return `Left: ${days}days`;
     }

     const hours = Math.floor(minutes / 60);

     if(hours >= 1){
          return `Left: ${hours}hours`;
     }

     return `Left: ${minutes}minutes`;

    }

    
    return(
        <div>
        {jobs.map(job => {
    
          return(
            <div className="card" width={"18rem"} key={job.id}  >
                 {job.picture && (
                   <img src={`data:${job.pictureContentType};base64,${job.picture}`}  width={"200px"} height={"200px"} alt="empty"/>
                    )}
                    <div className="card-body">
    <Link to={`/jobs/${job.id}`}>Details</Link>
     <Link to={`/all-applications/${job.id}`}>All Applications </Link>
     {job.applicationType === "FORM" && (
       <h1>{amountsOfApplications[job.id] ?? 0}</h1>
     )}
     {job.applicationType === "QUICK" && (
      <h1>{countQuickApplications[job.id] ?? 0}</h1>
     )}
   
   
    <div>
     <Link to={`/update-job/${job.id}`}>Update Job Offer</Link>
     <button  type="button" onClick={() => softDelete(job.id)}className="btn btn-danger">Delete Job</button>
    </div>     
   
     <p>Expiration : {" "}</p>  
     {new Date(job.expiresAt).toLocaleDateString("pl-PL")}
     <button type="button" className="btn btn-success" onClick={() => saveJobOffer(job?.id)}>Save Job Offer</button>
     <p>{getTimeLeft(job.expiresAt)}</p>
    
      <h5 className="card-title"> {job.id}</h5>
    <h5 className="card-title"> {job.position}</h5>
    <p className="card-text">{job.salary}</p>
     <p className="card-text">{job.salaryPeriod}</p>
      <p className="card-text">{job.salaryType}</p>
       <p className="card-text">{job.location}</p>
       <p className="card-text">{job.jobCategory}</p>
       <p className="card-text">{job.employmentType}</p>
        <p className="card-text">{job.contractType}</p>
        <p className="card-text">{job.jobStart}</p>
        <p className="card-text">{job.workMode}</p>
      <h2 className="card-text">{job.applicationType === "QUICK" && "QUICK Application"}</h2>
         </div> 
  </div>
  );
})}
        </div>
    );
    
}

export default EmployerJobs;