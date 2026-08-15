import { useEffect, useState } from "react";
import { data, useParams, useSearchParams } from "react-router-dom";

function JobDetails(){

    const {id} = useParams();
    const [job,setJob] = useState("");


    useEffect(() => {
    fetch(`http://localhost:8080/api/jobs/${id}`).then(response => response.json()).then(data => setJob(data))
    },[id]);

    return(
     <div>                  
       {job.picture && (
       <img src={`data:${job.pictureContentType};base64,${job.picture}`} width={"200"} height={"200px"}/>
       )}
       

    <p>{job.position}</p>
     <p>{job.salary}</p>
      <p>{job.companyName}</p>
      <p>{job.salaryType}</p>
       <p>{job.salaryPeriod}</p>
        <p>{job.contractType}</p>
         <p>{job.phoneNumber}</p>
        <hr/>
        <p>{job.description}</p>
        <hr/>

         <p>{job.location}</p>
          <p>{job.contractType}</p>
          <p>{job.employmentType}</p>
               <p>{job.jobCategory}</p>
                <p>{job.workMode}</p>
                <p>{job.jobStart}</p>
                <hr/>
                 <p>{job.shiftSystem}</p>
                   <p>{job.workSchedule}</p>
                     <p>{job.workingHours}</p>
                       <p>{job.nightShift}</p>
                       <p>{job.salaryPeriod}</p>
                         <p>{job.salarySystem}</p>
                    <hr/>
                     <p>{job.duties}</p>
                     <hr/>
                      <p>{job.requirements}</p>
                      <hr/>
                      <p>{job.weOffer}</p>
                      <hr/>
                      <p>{job.benefit}</p>
                      <hr/>
                         <p>{job.aboutCompany}</p>



    </div>
    );
}

export default JobDetails;
