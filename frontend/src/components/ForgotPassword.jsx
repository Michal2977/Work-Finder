
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Turnstile,useTurnstile} from "react-turnstile"

function ForgotPassword(){


    const [message,setMessage] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    const [turnstileToken,setTurnstileToken] = useState("");
    const turnstile = useTurnstile();


    const ForgotPassword = async()=> {
        if(!turnstileToken){
           setMessage("Complete the Turnstile verification.");
            return;
        }
        const send = await fetch(`http://localhost:8080/api/auth/forgot-password?email=${encodeURIComponent(email)}`,{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({turnstileToken})
        });

        const text = await send.json();
        if(send.ok){
            navigate("/reset-password-send");
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

            <button onClick={ForgotPassword}>Send</button>
            <br/>
            <Turnstile sitekey="0x4AAAAAADsdFGr1bVY65jeD" onSuccess={(token) => {setTurnstileToken(token);setMessage("");}}/>
        </div>
    );

}

export default ForgotPassword;