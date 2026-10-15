
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Turnstile,useTurnstile} from "react-turnstile";
import "../styles/resend-email.css";
import { Mail } from "lucide-react";

function ResendEmail(){

    const [message,setMessage] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    const [turnstileToken,setTurnstileToken] = useState("");
    const turnstile  = useTurnstile();

    const resend = async() => {
        if(!turnstileToken){
            setMessage("Complete the Turnstile verification.");
            return;
        }
        const response = await fetch(`http://localhost:8080/api/auth/resend?email=${encodeURIComponent(email)}`,{
            method : "POST",
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify({turnstileToken})
        });
        

        const text = await response.json();

        if(response.ok){
            navigate("/verify-email");
        }else{
            setMessage(text.message);
            setTurnstileToken("");
            turnstile.reset();
        }
    }

    return(
        <div >
            {message && (
                <div className="notifications">
                <h1>{message}</h1>
                </div>
            )}
           <div className="resend">

         <h1>Resend Verification Email</h1>
        <span>Enter your email address to receive a new verification link</span>
       <div className="icon">
       <Mail size={20}/>    
      <input type="email" placeholder="email" value={email}
      onChange={(e) => setEmail(e.target.value)}/>
      </div> 


   <Turnstile sitekey="0x4AAAAAADsdFGr1bVY65jeD" onSuccess={(token) => {setTurnstileToken(token);setMessage("");}}/>
      <button onClick={resend} className="button">Resend </button>
      <span>Already have an account? <Link to={"/login"}>Back to Login</Link></span>
         
            </div>

      </div>
    );
}

export default ResendEmail;