import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/all-applications.css";

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
            
          {applications.length === 0 && (
            <h1>No one has applied yet.</h1>
        )}

        {applications.map(application => {
        const employeeName =`${application?.userDto?.employeeDto?.firstName ?? ""}
         ${application?.userDto?.employeeDto?.lastName ?? ""}`.trim();
               const displayName = employeeName !== "" ? employeeName: application?.userDto?.displayName;
               return(
         <div key={application.id}>
            {application?.jobDto?.applicationType === "FORM" && (
                <div>
                    <h1>{displayName}</h1>
                    <h1>{application.userDto.email}</h1>
            
                   <button onClick={() => {viewedApplication(application.jobDto.id,application.id);
                    openCv(application.sendCv);
                   }} >{application.sendCvName ? application.sendCvName : "Open Cv"}</button>
                    <h1>{new Date(application.sentAt).toLocaleString("pl-PL")}</h1>
                    <h1>{application.applicationStatus}</h1>

                    {application.applicationAnswerDto?.map(answer => (
                        <div key={answer.id}>
                    {answer.applicationDto.applicationField.map((field,index) => (
                         <div key={field}>
                            {field === "EXPECTED_SALARY" && (
                      <>
                        <h3>Oczekiwane zarobki</h3>
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
                    <h3>Expierence:</h3>
                    <p>
                     {answer.answer?.[index] === "NO_EXPERIENCE" && "NO EXPERIENCE" }
                     {answer.answer?.[index] === "LESS_THAN_ONE_YEAR" && "LESS THAN ONE YEAR" }
                     {answer.answer?.[index] === "ONE_TO_TWO_YEARS" && "ONE TO TWO YEARS" }
                     {answer.answer?.[index] === "THREE_TO_FIVE_YEARS" && "THREE TO FIVE YEARS" }
                     {answer.answer?.[index] === "MORE_THAN_FIVE_YEARS" && "MORE THAN FIVE YEARS" }
                     </p>
                    <br/>
                    
                </div>
               )}
               {field === "AVAILABILITY" && (
                <div>
                    <h3>AVAILABILITY:</h3>
                    {answer.answer?.[index] === "IMMEDIATELY" && "IMMEDIATELY" }
                    {answer.answer?.[index] === "WITHIN_ONE_WEEK" && "WITHIN ONE WEEK" }
                    {answer.answer?.[index] === "WITHIN_TWO_WEEKS" && "WITHIN TWO WEEKS" }
                    {answer.answer?.[index] === "WITHIN_ONE_MONTH" && "WITHIN ONE MONTH" }
                    {answer.answer?.[index] === "MORE_THAN_ONE_MONTH" && "MORE THAN ONE MONTH" }
                </div>
               )}         
                 </div>
          ))}         
         </div>       
     ))}   
      {application.applicationAnswerDto?.map(answer => (
       <div key={answer.id}>
          {answer.applicationDto.question?.map((question, index) => (
            <div key={index}>
                <h3>{question}</h3>
                 {answer.answer?.[index + answer.applicationDto.applicationField.length]}
            </div>
        ))}
    </div>
      ))}
                  <button className="btn btn-danger" type="button" 
                   onClick={() => rejectCandidate(application.jobDto.id, application.id)}>Reject Candidate</button>
          </div> 
    )} 
        
            {application?.jobDto?.applicationType === "QUICK" && (
             
                <div>
                     <h1>{displayName}</h1>
                <h1>{new Date(application.appliedAt).toLocaleString("pl-PL")}</h1>
                 <h1>{application.applicationStatus}</h1>

                <button onClick={() => {viewedApplication(application.jobDto.id,application.id); openCv(application.sendCvDto);}}> {application.sendCvName ? application.sendCvName : "Open Cv"}</button>
                
                <button className="btn btn-danger" type="button"
                  onClick={() => rejectCandidate(application.jobDto.id, application.id)}>Reject Candidate</button>
                </div>
            )}

        </div>
         );
})
 } </div>
 );
}

export default AllApplications;