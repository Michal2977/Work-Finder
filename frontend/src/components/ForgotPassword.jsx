
import { useState } from "react";

function ForgotPassword(){
   
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");

    const send = async() => {
        const response = await fetch(`http://localhost:8080/api/auth/forgot-password?email=${encodeURIComponent(email)}`);

        const text = await response.json();
        if(response.ok){
            setMessage(text.message);
        }else{
            setMessage(text.message);
        }

    }
   
   
   
   
    return(
        <div>
            {message && <h1>{message}</h1>}
            <input type="email" placeholder="email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>

            <button onClick={send}>Send </button>
        </div>
    );
}
export default ForgotPassword;