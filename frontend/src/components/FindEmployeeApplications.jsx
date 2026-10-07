import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FindEmployeeAplications(){

    const [applicationSubmission,setApplicationSubmissions] = useState([]);

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
        applicationSubmission.map(application => {
    return(     
                <div className="card" width={"18rem"}  key={application.jobDto.id}>
                   {application.jobDto.picture && (
                   <img src={`data:${application.jobDto.pictureContentType};base64,${application.jobDto.picture}`}  width={"200px"} height={"200px"} alt="empty"/>
                    )}
                   
  <div className="card-body">
    <Link to={`/jobs/${application?.jobDto?.id}`}>Details</Link>
     <p>Expiration : {" "}</p>  
     {new Date(application.jobDto.expiresAt).toLocaleDateString("pl-PL")}
     <p>{getTimeLeft(application.jobDto.expiresAt)}</p>
    <h5 className="card-title"> {application.jobDto.position}</h5>
    <p className="card-text">{application.jobDto.salary}</p>
     <p className="card-text">{application.jobDto.salaryPeriod}</p>
      <p className="card-text">{application.jobDto.salaryType}</p>
       <p className="card-text">{application.jobDto.location}</p>
       <p className="card-text">{application.jobDto.jobCategory}</p>
       <p className="card-text">{application.jobDto.employmentType}</p>
        <p className="card-text">{application.jobDto.contractType}</p>
        <p className="card-text">{application.jobDto.jobStart}</p>
        <p className="card-text">{application.jobDto.workMode}</p>
         <p className="card-text">{application.applicationStatus}</p>
      <h2 className="card-text">{application.jobDto.applicationType === "QUICK" && "QUICK Application"}</h2>
      <h2 className="card-text">{application.jobDto.applicationType === "FORM" && "Form Application"}</h2>
         </div> 
  </div>
  );
})
  
    );
}

export default FindEmployeeAplications;