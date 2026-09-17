import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function JobDetails(){

    const {id} = useParams();
    const [job,setJob] = useState("");
    const [user,setUser] = useState(null);
    const [selectedCv,setSeletedCv] = useState(localStorage.getItem("selectedCv") || "");


    const employee = user?.roleDto?.some(role => role.role === "EMPLOYEE");
    const admin = user?.roleDto?.some(role => role.role === "ADMIN");
    

    useEffect(() => {
    fetch(`http://localhost:8080/api/jobs/${id}`).then(response => response.json()).then(data => setJob(data))
    },[id]);
    
    useEffect(() => {
      const token = localStorage.getItem("token");
      if(!token){return;}
       fetch("http://localhost:8080/api/auth/account-information",{
        headers : {Authorization : `Bearer ${token}`}
      }).then(response => response.json()).then(data => setUser(data))
    },[]);


   const selectedCvObject = user?.employeeDto?.employeeCvDto?.find(
    cv => cv.id === Number(selectedCv)
   );

 


      const openCv = (base64) => {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);

        for(let i =0; i < bytes.length; i++){
          bytes[i] = binary.charCodeAt(i);
        }

        const blob = new Blob([bytes],{ type : "application/pdf"});
        const url = URL.createObjectURL(blob);

        window.open(url,"_blank");
      };
 

    const handleCvChange = (e) => {
      const cvId = e.target.value;
      setSeletedCv(cvId);
      localStorage.setItem("selectedCv",cvId)
    }

    return(
     <div>                  
       {job.picture && (
       <img src={`data:${job.pictureContentType};base64,${job.picture}`} width={"200"} height={"200px"}/>
       )}

       {user && employee && (
        <div>
         
          
          <select  value={selectedCv} onChange={handleCvChange}>
            <option value="">Select You'r Resume</option>

             {user?.employeeDto?.employeeCvDto?.map(cv => {
              return(
              <option key={cv.id} value={cv.id}>
                {cv.cvFileName || `CV ${cv.id}`}
              </option>
          )})}
          </select>
          {selectedCvObject && (
            <button onClick={() => openCv(selectedCvObject.cvFile)}>
              {selectedCvObject.cvFileName ? `Preview ${selectedCvObject.cvFileName}` : "Preview Cv"}
               
            </button>
          )}
        </div>
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
