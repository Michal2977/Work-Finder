import {useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/job-detalis.css";

function JobDetails(){

    const {id} = useParams();
    const [job,setJob] = useState("");
    const [message,setMessage] = useState("");
    const [user,setUser] = useState(null);
    const fileInputRef = useRef(null);
    const [selectedCv,setSeletedCv] = useState(localStorage.getItem("selectedCv") || "");
    const [selectedComputerFile,setSelectedComputerFile] = useState(null);


    const employee = user?.roleDto?.some(role => role.role === "EMPLOYEE");
    const admin = user?.roleDto?.some(role => role.role === "ADMIN");
    

    useEffect(() => {
      const token = localStorage.getItem("token");
      

     fetch(`http://localhost:8080/api/jobs/${id}`,{
      headers : token ? {Authorization : `Bearer ${token}`} : {}
     }) .then(response => response.json()).then(data => setJob(data))
  
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


   const qucikApplication = async(id,cv) => {
     const token  = localStorage.getItem("token");
     if(!token){return;}
       
    const  formData = new FormData();

     const request = {
        sendCvName: selectedComputerFile
            ? selectedComputerFile.name
            : cv.cvFileName
    };

      formData.append("request",new Blob([
      JSON.stringify(request)
     ],{type : "application/json"}));

     const file = selectedComputerFile || (() => {

     const binary = atob(cv.cvFile);
     const bytes = new Uint8Array(binary.length);

     for(let i =0; i < bytes.length; i++){
      bytes[i] = binary.charCodeAt(i);
     }
       return new File(
            [bytes],
            cv.cvFileName,
            { type: "application/pdf" }
        );
    })();
   formData.append("file", file);
     
     const response = await fetch(`http://localhost:8080/api/jobs/quick-application/${id}`,{
      method : "POST",
      headers : {Authorization : `Bearer ${token}`},
      body : formData
     });

     const text = await response.json();
     if(response.ok){
      setMessage(text.message);
      setTimeout(() => {
       setMessage("");
      },2000)
   
     }else{
      setMessage(text.message);
      setTimeout(() => {
      setMessage("");
      },2000);
     }
   }
   
   
 


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
        {message && (
            <div className="notifications">
                <h1>{message}</h1>
            </div>
        )}

        <div className="job-detalis-first">           
       {job.picture && (
       <img src={`data:${job.pictureContentType};base64,${job.picture}`} width={"200"} height={"200px"}/>
       )}

        <h1>{job.position}</h1>
        <span>{getTimeLeft(job.expiresAt)}</span>
        <p>{job.companyName}</p>

       <p>{job.salary}</p>
       <p>{job.salaryType}</p>
       <p>{job.salaryPeriod}</p>

        <p>{job.contractType}</p>
        <p>{job.employmentType}</p>
        <p>{job.jobCategory}</p>
        <p>{job.location}</p>
        <p>{job.workMode}</p>
        <p>{job.jobStart}</p>
                    
</div> 
       {user && employee && job.applicationType === "FORM" && (
        <div>
          
          {job.alreadyApplied ? (
            <button className="btn btn-success" disabled > Already applied</button>
          ) : (<Link to={`/form-application/${id}`}><button className="btn btn-success">Apply</button></Link>)}
         
        </div>
       )}

      {user && employee && job.applicationType === "QUICK" && (
    <div>

        <select
            value={selectedCv}
            onChange={(e) => {
                handleCvChange(e);
                setSelectedComputerFile(null);
            }}
        >
            <option value="">Select Your Resume</option>

            {user?.employeeDto?.employeeCvDto?.map(cv => (
                <option key={cv.id} value={cv.id}>
                    {cv.cvFileName || `CV ${cv.id}`}
                </option>
            ))}
        </select>

        <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => {
                setSelectedComputerFile(e.target.files[0]);
                setSelectedCv("");
            }}
        />

        {selectedCvObject && (
            <div>
                <button onClick={() => openCv(selectedCvObject.cvFile)}>
                    {selectedCvObject.cvFileName
                        ? `Preview ${selectedCvObject.cvFileName}`
                        : "Preview CV"}
                </button>

                <button
                    className="btn btn-success"
                    disabled={job.alreadyApplied}
                    onClick={() => qucikApplication(id, selectedCvObject)}
                >
                    {job.alreadyApplied ? "Already applied" : "Apply"}
                </button>
            </div>
        )}

        {selectedComputerFile && (
            <div>
                <p>{selectedComputerFile.name}</p>

                <button
                    className="btn btn-success"
                    disabled={job.alreadyApplied}
                    onClick={() => qucikApplication(id, null)}
                >
                    {job.alreadyApplied ? "Already applied" : "Apply"}
                </button>
            </div>
        )}

    </div>
)}


   

              
                 <p>{job.shiftSystem}</p>
                  <p>{job.workSchedule}</p>
                        <p>{job.workingHours}</p>
                       <p>{job.nightShift}</p>
                       <p>{job.salaryPeriod}</p>
                         <p>{job.salarySystem}</p>

               
                <p>{job?.description}</p>
              
              {/* po prawej */}
                     <p>{job.phoneNumber}</p>
               
                    
                  
                     <p>{job.duties}</p>
                    
                      <p>{job.requirements}</p>
                     
                      <p>{job.weOffer}</p>
                     
                      <p>{job.benefit}</p>
                    
                    <p>{job.aboutCompany}</p>



    </div>
    );
}

export default JobDetails;
