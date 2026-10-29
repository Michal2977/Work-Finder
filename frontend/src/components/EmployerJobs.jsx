import { ClipboardList, Pencil, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {Link, useNavigate, useParams } from "react-router-dom";



function EmployerJobs(){

    const [user,setUser] = useState(null);
    const [jobs,setJobs] = useState([]);
    const [amountsOfApplications,setAmountsOfApplications ] = useState({});
    const [countQuickApplications,setCountQuickApplications] = useState({});
    const navigate = useNavigate();
    


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

         <div className="favorite-container">
             <div className="favorite-introduction">       
            <h1>Manage Your Job Listings</h1>
              </div> 
        {jobs.map(job => {
    
          return(
            
            <div className="favorite-card" key={job.id} onClick={() => navigate(`/jobs/${job.id}`) }   style={{cursor : "pointer"}}  >
                 {job.picture && (
                   <img src={`data:${job.pictureContentType};base64,${job.picture}`}  alt="empty"/>
                    )}

     
     <div className="amount-applications">
      {job.applicationType === "FORM" && (
       <h1>All Applications{amountsOfApplications[job.id] ?? 0}</h1>
     )}
     {job.applicationType === "QUICK" && (
      <h1> All Applications {countQuickApplications[job.id] ?? 0}</h1>
     )}       
     </div>
  
    <div className="favorite-icons">
     <Link to={`/update-job/${job.id}`} onClick={(e) => {e.stopPropagation()}}  className="fallen-update"><Pencil size={22}/></Link>
     <button  type="button"  className="favorite-delete" 
     onClick={(e) => {e.stopPropagation(); softDelete(job.id)}}><Trash2 size={22}/></button>
       <Link to={`/all-applications/${job.id}`}
        onClick={(e) => {e.stopPropagation()}} className="fallen-update"><ClipboardList size={22}/></Link>
    </div> 
        <div className="card-body">

   
        <div className="favorite-info">
        <h1 > {job.position}</h1>  
        <span >{job.salary} {job.currency}  {job.salaryPeriod}  {job.salaryType}
        </span>
        <p> {job.companyName}</p>
        <span > {job.location}</span>
        </div>
        
        <div className="favorite-details">
        <span >{job.jobCategory}</span>
        <span >{job.employmentType}</span>
       <span >{job.contractType}</span>
      <span >{job.jobStart}</span>
      <span >{job.workMode}</span>
      </div>
      <hr/>
      <div className="favorite-publication">
     <span>Expires At :{new Date(job.expiresAt).toLocaleDateString("pl-PL")}</span>
      </div>
                            
      <div className="favorite-application">
      <span >{job.applicationType === "QUICK" && "QUICK Application"}</span>
      <span >{job.applicationType === "FORM" && "Form Application"}</span>
     </div>
         </div> 
  </div>
  );
})}
</div> 
        </div>
    );
    
}

export default EmployerJobs;