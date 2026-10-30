import { useState ,useEffect, useRef} from "react";
import {useParams } from "react-router-dom";
import "../styles/report-details.css";
import { CalendarDays, Clock, FileText, Hash, Tag, User } from "lucide-react";


function ReportDetails(){
    const [user,setUser] = useState(null);
    const [file,setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [message,setMessage] = useState("");
    const [contactMessage,sendContactMessage] = useState({message : ""});
    const [report,setReport] = useState(null);
    const {id} = useParams();

   const admin = user?.roleDto?.some(role => role.role === "ADMIN");
    const employerOrEmploee = user?.roleDto?.some(role => role.role === "EMPLOYER" || role.role === "EMPLOYEE"); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){return;}

        fetch("http://localhost:8080/api/auth/account-information",{
         headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setUser(data));
    

      fetch(`http://localhost:8080/api/reports/${id}`,{
        headers : {Authorization : `Bearer ${token}`}
    }).then(response => response.json()).then(data => setReport(data));
},[]);
  


    const adminResponse = async(e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const formData = new FormData();

        formData.append("request",new Blob([
            JSON.stringify(contactMessage)
        ],{type : "application/json"}));

        if(file){
            formData.append("file",file);
        }

        const response = await fetch(`http://localhost:8080/api/admin-respond/${id}`,{
         method :"POST",
         headers : {Authorization : `Bearer ${token}`},
         body : formData
        });

        const text = await response.json();
        if(response.ok){
            setReport(prev => ({...prev, contactMessageDto: [...prev.contactMessageDto, text]
    }));
        sendContactMessage({message : ""});
        setFile(null);
        fileInputRef.current.value ="";
        window.location.reload();
        }else {
            setMessage(text.message);

        }
    }

    const userResponse = async(e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const formData  = new FormData();

        formData.append("request",new Blob([
            JSON.stringify(contactMessage)
        ],{type : "application/json"}));

        if(file){
            formData.append("file",file);
        }

        const response = await fetch(`http://localhost:8080/api/user-respond/${id}`,{
          method : "POST",
          headers : {Authorization : `Bearer ${token}`},
          body : formData
        });

     const text = await response.json();
    if(response.ok){
       setReport(prev => ({...prev,contactMessageDto : [...prev.contactMessageDto,text]}));
       sendContactMessage({message : ""});
        setFile(null);
        fileInputRef.current.value ="";
        
    }else{
     setMessage(text.message);
    }

    }
     const banUser = async() => {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/ban-user/${report.id}`,{
            method : "PUT",
            headers : {Authorization : `Bearer ${token}`}
        });

        const text = await response.json();
        if(response.ok){
            setMessage(text.message);
             window.location.reload();
        }
     }

     const unbanUser = async() => {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8080/api/unban-user/${report.id}`,{
            method : "PUT",
            headers : {Authorization : `Bearer ${token}`}
        });

        const text = await response.json();
        if(response.ok){
            setMessage(text.message);
            window.location.reload();
        }
     }

     const changeReportStatus = async(e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if(!token){return;}
        if(!admin){return;}
        const response = await fetch(`http://localhost:8080/api/change-status/${report.id}`,{
         method : "PUT",
         headers : {Authorization : `Bearer ${token}`,
        "Content-type" : "application/json"},
         body : JSON.stringify({contactStatus : report.contactStatus})
        });

        const text = await response.json();
        if(response.ok){
            setMessage(text.message);
        }
     }

    return(
        <div>
              {message && (
            <div className="notifications">
                <h1>{message}</h1>
            </div>
        )}
      
            <div className="details-container" >
             <div className="report-detailss">
                 <h1>Report Details</h1>
                 </div>   
           
            <div className="picture-report">
            {report?.picture && (
                <img src={`data:${report.pictureContentType};base64,${report.picture}`} />
            )}
            </div>

            <div className="report-details">
             <div className="label-details">  
             <Hash size={20}/>
             <p>Number of Report</p>
             </div> 
            <h1>{report?.id}</h1>
           </div>

            <div className="report-details">
                <div className="label-details">
                <CalendarDays size={20}/>
                </div>
               <span>{new Date(report?.sentAt).toLocaleString("pl-PL")}</span>
            </div>
            

             <div className="report-details">
                <div className="label-details">
                 <FileText size={20}/>
                 <p>Subject</p>
                </div>
                 <h1>{report?.title}</h1>
            </div>

            <div className="report-details">
                  <User size={20}/>
                  <h1>{report?.userDto?.banned ? "User is Banned " : "User has no ban"}</h1>
            </div>

            <div className="report-details">
                <div className="label-details">
                    <Tag size={20}/>
                    <p>Category</p>
                </div>
                 <h1>{report?.contactCategory}</h1>
            </div>
      
             <div className="report-details">
             <div className="label-details">
              <Clock size={20}/>  
             <p>Status</p>
             </div>
               <h1>{report?.contactStatus}</h1>
             </div>

            <div className="report-description">
             <h1>Description</h1>   
            <span>{report?.description}</span>
            </div>
    
            </div>

            <div className="conversation">
             {user && admin && (
                <div>
                <div className="admin-operation">
            <select className="form-select" value={report?.contactStatus || ""}  
            onChange={(e) => setReport({...report,contactStatus : e.target.value})}>
            <option  value="" disabled >Open this select menu</option>
            <option value="SENT">SENT</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="CLOSED">CLOSED</option>
           </select>
            <button type="button"  onClick={changeReportStatus}>Change Status</button>
          
                    <button className="ban-user" type="button" onClick={banUser}>Ban User</button>
                    <button className="unban-user" type="button" onClick={unbanUser}>unban User</button>
                </div>
                <div className="admin-converation">
                    <form onSubmit={adminResponse}>
                  <textarea type="text" placeholder="message" value={contactMessage.message} required maxLength={5000} minLength={1}
                  onChange={(e) => sendContactMessage({...contactMessage,message : e.target.value})}/>
                 
                 
                  <input type="file" accept="image/jpeg,image/png,image/webp" 
                  onChange={(e) => setFile(e.target.files[0])} ref={fileInputRef} />
                  
                  {file && (
                    <img src={URL.createObjectURL(file)} alt="previw" width={"200px"} height={"200px"} />
                  )}
                  
                  <button  type="submit">Send</button>
                  </form>
                  </div>
                </div>
             )} 

             <div className="responses">
        
             {report?.contactMessageDto?.map(message => (
             <div key={message.id}>
                <h4>{message.userDto?.roleDto?.some(role => role.role === "ADMIN")
                    ?"ADMIN Response": message.userDto?.employeeDto?.firstName ? `${message.userDto.employeeDto.firstName}
                    ${message.userDto.employeeDto.lastName ?? ""}` : message.userDto?.employerDto?.firstName ? 
                    `${message.userDto.employerDto.firstName} ${message.userDto.employerDto.lastName  ?? ""}` : 
                     message.userDto?.displayName ? message.userDto.displayName : 
                     message.userDto.email
               }</h4>
             <h3>{message.message}</h3>
             {message.picture &&(
           <img src={`data:${message.pictureContentType};base64,${message.picture}`} width={"200px"} height={"200px"} alt=" xd"/>
             )}
    
            <p>{message.respondAt}</p>
            </div>
    ))}
</div>

             {user && employerOrEmploee && (
                <div className="user-conversation">
                    <form onSubmit={userResponse}>
                    <textarea type="text" placeholder="respond" value={contactMessage.message} required minLength={1} maxLength={5000}
                    onChange={(e) => sendContactMessage({...contactMessage,message : e.target.value})}/>
                  
                
                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files[0])} ref={fileInputRef}/>
                      <button className="send-button" type="submit"> Send</button>
                
                    {message.picture && (
                        <img  src={`data:${file.pictureContentType};base64,${message.picture}`} width={"200px"} height={"200px"} />
                    )}
                   
                 
                    <p>{message.respondAt}</p>
                  
                  </form>
                </div>
             )}
       
        </div>
        </div>
    );

}

export default ReportDetails;

