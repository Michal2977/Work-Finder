
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Turnstile,useTurnstile} from "react-turnstile";

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
        <div>
            {message && <h1>{message}</h1>}
      <input type="email" placeholder="email" value={email}
      onChange={(e) => setEmail(e.target.value)}/>

      <button onClick={resend}>Resend </button>

      <br/>
      <Turnstile sitekey="0x4AAAAAADsdFGr1bVY65jeD" onSuccess={(token) => {setTurnstileToken(token);setMessage("");}}/>
      </div>
    );
}

export default ResendEmail;