import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/all-applications.css";
import {CalendarDays, Eye, FileText, Trash2 } from "lucide-react";

function AllApplications(){
    
    const {id} = useParams();
    const [applications,setApplications] = useState([]);
    const [message,setMessage] = useState("");
  
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){return;}

        fetch(`http://localhost:8080/api/jobs/all-applications/${id}`,{
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => { setApplications(data)});
       
    },[id])

      const viewedApplication = async(jobId,applicationId) => {
        const token = localStorage.getItem("token");
        if(!token){return;}

        const response = await fetch(`http://localhost:8080/api/jobs/viewed-candidate/${jobId}/${applicationId}`,{
            method : "PUT",
            headers : {Authorization : `Bearer ${token}`}
        })

        const text = await response.json();
        if(response.ok){
            setMessage(text.message);
        }else{
            setMessage(text.message);
        }
      }
      const rejectCandidate = async(jobId,applicationId) => {
        const token = localStorage.getItem("token");
        if(!token){return;}
        const response = await fetch(`http://localhost:8080/api/jobs/reject-candidate/${jobId}/${applicationId}`,{
            method : "PUT",
            headers : {Authorization : `Bearer ${token}`}
        })
       

        const text = await response.json();
        if(response.ok){
         setMessage(text.message);
        }else{
            setMessage(text.message);
        }
      } 

      const openCv = (base64) => {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);

        for(let i = 0; i < binary.length; i++){
            bytes[i] = binary.charCodeAt(i);
        }

        const blob = new Blob([bytes],{type : "application/pdf"});
        const url = URL.createObjectURL(blob);

        window.open(url,"_blank");
    };

    return(
        <div>
            {message && (
             <div className="notifications">
               {message && <h1>{message}</h1>}
            </div>
            )}
             <div className="quick-center">
          {applications.length === 0 && (
            <h1>No one has applied yet.</h1>
        )}
          </div>
         <div className="form-center">
            {applications.length !== 0 && (
             <h1>All form applications</h1>
            )}
             </div>
       <div className="all-container-application">
        {applications.map(application => {
        const employeeName =`${application?.userDto?.employeeDto?.firstName ?? ""}
         ${application?.userDto?.employeeDto?.lastName ?? ""}`.trim();
               const displayName = employeeName !== "" ? employeeName: application?.userDto?.displayName;
               return(
         <div key={application.id}>
            {application?.jobDto?.applicationType === "FORM" && (
              
                    
                    <div className="all-form">
                    <h1>{displayName}</h1>
                  
                    <div className="form-icons">
                     <span><CalendarDays size={22}/>{new Date(application.sentAt).toLocaleString("pl-PL")}</span>
                     </div>

                     <div className="all-status">
                    <h1>Status {application.applicationStatus}</h1>
                    </div>

                    <div className="all-icons">
                    <FileText size={22}/>    
                   <button onClick={() => {viewedApplication(application.jobDto.id,application.id);
                    openCv(application.sendCv);
                   }} >{application.sendCvName ? application.sendCvName : "Open Cv"}</button>
                   <Eye size={22}/>
                 </div>
                  
                   <div className="form-select-new">
                    {application.applicationAnswerDto?.map(answer => (
                        <div key={answer.id}>
                    {answer.applicationDto.applicationField.map((field,index) => (
                         <div key={field}>
                            {field === "EXPECTED_SALARY" && (
                      <>
                        <label>Oczekiwane zarobki</label>
                       <p>
                         {answer.answer?.[index] === "BELOW_5000" && "BELOW 5000"}
                         {answer.answer?.[index] === "FROM_5000_TO_10000" && "FROM 5000 TO 10000"}
                         {answer.answer?.[index] === "FROM_10000_TO_15000" && "FROM 10000 TO 15000"}
                         {answer.answer?.[index] === "ABOVE_15000" && "ABOVE 15000"}
                        </p>
                      </>
               )}
               {field === "EXPERIENCE" && (
                <div>
                    <label>Expierence:</label>
                    <p>
                     {answer.answer?.[index] === "NO_EXPERIENCE" && "NO EXPERIENCE" }
                     {answer.answer?.[index] === "LESS_THAN_ONE_YEAR" && "LESS THAN ONE YEAR" }
                     {answer.answer?.[index] === "ONE_TO_TWO_YEARS" && "ONE TO TWO YEARS" }
                     {answer.answer?.[index] === "THREE_TO_FIVE_YEARS" && "THREE TO FIVE YEARS" }
                     {answer.answer?.[index] === "MORE_THAN_FIVE_YEARS" && "MORE THAN FIVE YEARS" }
                     </p>
                    
                    
                </div>
               )}
               {field === "AVAILABILITY" && (
                <div>
                    <label>AVAILABILITY:</label>
                    <p>
                    {answer.answer?.[index] === "IMMEDIATELY" && "IMMEDIATELY" }
                    {answer.answer?.[index] === "WITHIN_ONE_WEEK" && "WITHIN ONE WEEK" }
                    {answer.answer?.[index] === "WITHIN_TWO_WEEKS" && "WITHIN TWO WEEKS" }
                    {answer.answer?.[index] === "WITHIN_ONE_MONTH" && "WITHIN ONE MONTH" }
                    {answer.answer?.[index] === "MORE_THAN_ONE_MONTH" && "MORE THAN ONE MONTH" }
                    </p>
                </div>             
               )}     
                   
                 </div>
          ))}
                   
         </div>       
     ))}   </div>
     
      {application.applicationAnswerDto?.map(answer => (
       <div key={answer.id} className="result">
          {answer.applicationDto.question?.map((question, index) => (
            <div key={index}>
                <label>{question}</label>
                <textarea>
                 {answer.answer?.[index + answer.applicationDto.applicationField.length]}
                 </textarea>
            </div>
        ))}
    </div>
      ))}          <div className="all-icons">
                  <button className="btn btn-danger" type="button" 
                   onClick={() => rejectCandidate(application.jobDto.id, application.id)}>Reject Candidate</button>
                   <Trash2 size={22}/>
                   </div>
          </div> 
          
    )} 
                  
            {application?.jobDto?.applicationType === "QUICK" && (
             
              
                <div className="all-quick">                  
                   <h1>From: {displayName}</h1>

                 <div className="quick-center">
                 {applications.length !== 0 && (
               <h1>All quick applications</h1>
                        )}
                    </div>
               
                <div className="all-icons">
                 <CalendarDays size={22}/>
                <span>{new Date(application.appliedAt).toLocaleString("pl-PL")}</span>
                </div>

                 <div className="all-status">
                 <h1>Status {application.applicationStatus}</h1>
                 </div>

                <div className="all-icons">
                    <FileText size={22}/>
                <button onClick={() => {viewedApplication(application.jobDto.id,application.id); openCv(application.sendCvDto);}}>  
                         {application.sendCvName ? application.sendCvName : "Open Cv"}</button>
                         <Eye size={22}/>
                  </div>

                  <div className="all-iconss">
                <button  type="button"
                  onClick={() => rejectCandidate(application.jobDto.id, application.id)}>Reject Candidate</button>
                  <Trash2 size={22}/>
                  </div>

                  </div>
              
            )}
            </div>
            

     
         );
})
 } 
 </div>
 </div>
 );
}

export default AllApplications;