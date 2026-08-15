import { useState,useEffect } from "react";
import { data } from "react-router-dom";

function DeletedJobs(){

    const [user,setUser] = useState(null);
    const [jobs,setJobs] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            return;
        }
        fetch("http://localhost:8080/api/jobs", {
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setUser(data));

        fetch("http://localhost:8080/api/deleted-jobs", {
            headers : {Authorization : `Bearer ${token}`},
        }).then(response => response.json()).then(data => setJobs(data));

    },[]);

    const revocerOffer = async(id) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/recover-job/${id}`,{
        method : "PUT",
        headers : {Authorization : `Bearer ${token}`}
          });
          if(response.ok){
            window.location.reload();
          }
    }


  return(
        <div>
        {jobs.map(job => (
         <div className="card" width={"18rem"} key={job.id}> 
         {job.picture && (
            <img src={`data:${job.pictureCotentType};base64,${job.picture}`} width={"200px"} height={"200px"} alt="no image"/>
         )}
           <h5 className="card-title"> {job.position}</h5>
             <h5 className="card-title">{job.deletedAt && new Date(job.deletedAt).toLocaleString("pl-PL")}</h5>
            <p className="card-text">{job.salary}</p>
             <p className="card-text">{job.salaryPeriod}</p>
               <p className="card-text">{job.salaryType}</p>
               <p className="card-text">{job.location}</p>
              <p className="card-text">{job.jobCategory}</p>
              <p className="card-text">{job.employmentType}</p>
               <p className="card-text">{job.contractType}</p>
                 <p className="card-text">{job.jobStart}</p>
               <p className="card-text">{job.workMode}</p>
                 <button type="submit" className="btn btn-success" onClick={() => revocerOffer(job.id)}>Recover Job Offer</button>
         </div>
        ))}
        </div>
    )


}

export default DeletedJobs;