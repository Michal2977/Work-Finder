import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function ResetPassword(){

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const [message,setMessage] = useState("");
    const [password,setPassword] = useState("");
    

    const ResetPassword = async() => {
        const response = await fetch(`http://localhost:8080/api/auth/reset-password?token=${encodeURIComponent(token)}&password=${encodeURIComponent(password)}`,{
        method : "POST"
        });

        const text = await response.json();
        if(response.ok){
            setMessage(text.message);
            setTimeout(() => {
              navigate("/login")
            },2000);
        }else{
            setMessage(text.message);
        }
    }

    return(
        <div>
            {message && <h1>{message}</h1>}

            <input type="password" placeholder="password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>

            <button onClick={ResetPassword}>Reset Password</button>
        </div>
    );

}

export default ResetPassword;