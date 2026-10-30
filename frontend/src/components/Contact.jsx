import { useState ,useEffect, useRef} from "react";
import  {Turnstile, useTurnstile } from "react-turnstile";

function Contact(){
    const [user,setUser] = useState(null);
    const [file,setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [message,setMessage] = useState("");
    const [turnstileToken,setTurnstileToken] = useState("");
    const turnstile = useTurnstile();
    const [contact,setContact] = useState({title : "",description : "",contactCategory : ""});


    useEffect(() => {
     const token  = localStorage.getItem("token");
     if(!token){return;}

     fetch("http://localhost:8080/api/auth/account-information",{
        headers : {Authorization : `Bearer ${token}`},
     }).then(response => response.json()).then(data => setUser(data));
    },[]);

    const sendContactMessage = async(e) => {

        if(!turnstileToken){
            setMessage("Complete the Turnstile verification.");
            return;
        }
        e.preventDefault();

       const token  = localStorage.getItem("token");
        const formData = new FormData();

        formData.append("request",new Blob([
            JSON.stringify({...contact})
        ],{type : "application/json"}));

        formData.append("turnstileRequest",new Blob([
            JSON.stringify({turnstileToken})
        ],{type : "application/json"}));
       
        if(file){
           formData.append("file",file);
        }

        const response = await fetch("http://localhost:8080/api/contact",{
            method : "POST",
            headers : {Authorization : `Bearer ${token}`},
            body : formData
        });

        const text = await response.json();
         
        if(response.ok){
            setMessage(text.message);
            setContact({ title: "", description: "" ,contactCategory : ""});
            setFile(null);
            fileInputRef.current.value = "";
        }else{
            setMessage(text.message);
            setTurnstileToken("");
            turnstile.reset();
        }
    } 
   
    return(
        <div>
            {message && (
                <div className="notifications">
                    <h1>{message}</h1>
                </div>
            )}
          
        
            <form onSubmit={sendContactMessage}>
             <div className="main-container">
                <div className="welcome">
                <h1>Contact Our Support Team</h1>
                <p>Have a question or need help? Send us a message and our team will get back to you as soon as possible</p>
                </div>
            <select className="form-select" value={contact.contactCategory}  required
            onChange={(e) => setContact({...contact,contactCategory : e.target.value})}>
            <option  value="" disabled >Open this select menu</option>
            <option value="TECHNICAL_ISSUE">TECHNICAL_ISSUE</option>
            <option value="ACCOUNT_ISSUE">ACCOUNT_ISSUE</option>
            <option value="JOB_OFFER_ISSUE">JOB_OFFER_ISSUE</option>
            <option value="REPORT_VIOLATION">REPORT_VIOLATION</option>
            <option value="OTHER">OTHER</option>
           </select>
  
            <input type="text" placeholder="subject" value={contact.title} required minLength={3} maxLength={50}
            onChange={(e) => setContact({...contact,title : e.target.value})}/>
          
             <input type="text" placeholder="description" value={contact.description} required minLength={10} maxLength={5000}
            onChange={(e) => setContact({...contact,description : e.target.value})}/>
         
           <div className="picture">
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files[0])} ref={fileInputRef}/>
         
            {file && (
                <img src={URL.createObjectURL(file)} alt="preview" width={"200px"} height={"200px"}/>
            )}
        </div>
         <Turnstile sitekey="0x4AAAAAADsdFGr1bVY65jeD" onSuccess={(token) => {setTurnstileToken(token);setMessage("");}}/>

            <button className="button"  type="submit">Send</button>
              
                </div>   
            </form>
        </div>
    )
}

export default Contact;
