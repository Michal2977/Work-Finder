

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {useNavigate} from "react-router-dom"

function ResetPassword(){

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
 

    const resetPassword = async() => {
        const change = await fetch(`http://localhost:8080/api/auth/reset-password?token=${encodeURIComponent(token)}&password=${encodeURIComponent(password)}`,{
            method :"POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({token,password})
        });
         
        const text  = await change.json();
        if(change.ok){
            setMessage(text.message);
            setTimeout(() => {
                navigate("/Login")
            },2000);

        }else{
            setMessage(text.message);
        }

    }
     

    return(
        <div>
         {message && <h1>{message}</h1>}
         <input type="password" placeholder="new Password" value={password}
         onChange={(e) => setPassword(e.target.value)}/>
         <button onClick={resetPassword}>Change Password</button>
        </div>
    );
}

export default ResetPassword;