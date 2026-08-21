import { useState ,useEffect, useRef} from "react";
import {useParams } from "react-router-dom";



function ReportDetails(){
    const [user,setUser] = useState(null);
    const [file,setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [message,setMessage] = useState("");
    const [contactMessage,sendContactMessage] = useState({message : ""});
    const [report,setReport] = useState("");
    const {id} = useParams();


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




    const admin = user?.roleDto?.some(role => role.role === "ADMIN");
    const employerOrEmploee = user?.roleDto?.some(role => role.role === "EMPLOYER" || role.role === "EMPLOYEE"); 


    return(
        <div>
           
           <h1>{report.id}</h1>
            <h1>{report.title}</h1>
            <h1>{report.contactCategory}</h1>
            <h1>{report.description}</h1>
            {report.picture && (
                <img src={`data:${report.pictureContentType};base64,${report.picture}`} width={"200"} height={"200px"}/>
            )}
            <h1>{new Date(report.sentAt).toLocaleString("pl-PL")}</h1>
             <h1>{report.contactStatus}</h1>

  
             {user && admin && (
                <div>
                    {message && <h1>{message}</h1>}
                    <form onSubmit={adminResponse}>
                  <input type="text" placeholder="message" value={contactMessage.message} required maxLength={5000} minLength={1}
                  onChange={(e) => sendContactMessage({...contactMessage,message : e.target.value})}/>
                  <br/>
                  <input type="file" accept="image/jpeg,image/png,image/webp" 
                  onChange={(e) => setFile(e.target.files[0])} ref={fileInputRef} />
                  <br/>
                  {file && (
                    <img src={URL.createObjectURL(file)} alt="previw" width={"200px"} height={"200px"} />
                  )}
                  <br/>
                  <button className="btn btn-success" type="submit">Send</button>
                  </form>
                </div>
             )} 

             <div>
        
             {report.contactMessageDto?.map(message => (
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
                <div>
                    <form onSubmit={userResponse}>
                    <input type="text" placeholder="respond" value={contactMessage.message} required minLength={1} maxLength={5000}
                    onChange={(e) => sendContactMessage({...contactMessage,message : e.target.value})}/>
                    <br/>
                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files[0])} ref={fileInputRef}/>
                    <br/>
                    {message.picture && (
                        <img  src={`data:${file.pictureContentType};base64,${message.picture}`} width={"200px"} height={"200px"} />
                    )}
                    <p>{message.respondAt}</p>
                    <button className="btn btn-success" type="submit"> Send</button>
                  </form>
                </div>
             )}
        </div>
    );

}

export default ReportDetails;

