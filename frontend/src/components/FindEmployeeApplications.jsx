import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function FindEmployeeAplications(){

    const [applicationSubmission,setApplicationSubmissions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){return;}
     
    fetch("http://localhost:8080/api/jobs/find-employee-applications",{
        headers : {Authorization : `Bearer ${token}`}
    }).then(response => response.json()).then(data => setApplicationSubmissions(data));
    },[]);

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
        <div className="favorite-container">
      <div className="favorite-introduction">       
        <h1>Track Your Job Applications</h1>
       </div>   
        {applicationSubmission.map(application => {
    return(     
                <div className="favorite-card"  key={application.jobDto.id} onClick={() => navigate(`/jobs/${application.jobDto.id}`) } style={{cursor : "pointer"}} >
                   {application.jobDto.picture && (
                   <img src={`data:${application.jobDto.pictureContentType};base64,${application.jobDto.picture}`} alt="empty"/>
                    )}
                   
  <div className="card-body">
    

    <div className="amount-applications">
        <h1>Status &nbsp; {application.applicationStatus}</h1>  
     </div>

     <div className="favorite-info">
    <h1 > {application.jobDto.position}</h1>
    <span >{application.jobDto.salary} {application.jobDto.currency}
         {application.jobDto.salaryPeriod} {application.jobDto.salaryType}</span>
         <span>{application.jobDto.comapnyName}</span>
       <p >{application.jobDto.location}</p>
       </div>

       <div className="favorite-details">
       <span >{application.jobDto.jobCategory}</span>
       <span >{application.jobDto.employmentType}</span>
        <span >{application.jobDto.contractType}</span>
        <span >{application.jobDto.jobStart}</span>
        <span >{application.jobDto.workMode}</span>
         </div>
        <hr/>
      <div className="favorite-publication">
     <span>Expires At :{new Date(application.jobDto.expiresAt).toLocaleDateString("pl-PL")}</span>
      </div>
        
     
         <div className="favorite-application">
      <span className="card-text">{application.jobDto.applicationType === "QUICK" && "QUICK Application"}</span>
      <span className="card-text">{application.jobDto.applicationType === "FORM" && "Form Application"}</span>
      </div>
         </div> 
  </div>
  
  );
  
})}
  </div>
    );
    
}

export default FindEmployeeAplications;