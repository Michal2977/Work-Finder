
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Turnstile,useTurnstile} from "react-turnstile"
import "../styles/forgot-password.css";
import { Mail } from "lucide-react";

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
            {message && (
             <div className="notifications">
               {message && <h1>{message}</h1>}
            </div>
            )}
            
            <div className="send">
                
             <h1>Forgot your password?</h1>
             <span>Enter your email address below to receive a password reset link</span>   
            
            <div className="icon">
            <Mail size={20}/>
            <input type="email" placeholder="email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            </div>

        

            <button onClick={ForgotPassword} className="button">Send</button>
   <Turnstile sitekey="0x4AAAAAADsdFGr1bVY65jeD" onSuccess={(token) => {setTurnstileToken(token);setMessage("");}}/>
             <span>Already have an account? <Link to={"/login"}>Back to Login</Link></span>
       
        

                </div>
        </div>
    );

}

export default ForgotPassword;