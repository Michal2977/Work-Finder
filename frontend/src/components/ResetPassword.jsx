import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "../styles/reset-password.css";
import { Lock } from "lucide-react";

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
           <div className="reset">
               {message && (
                <div className="notifications">
                <h1>{message}</h1>
                </div>
            )}
         
        
             <h1>Reset Password</h1>
             <span>Enter your new password below to secure your account</span>

             <div className="icon">
             <Lock size={20}/>   
            <input type="password" placeholder="new password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button onClick={ResetPassword} className="button">Reset Password</button>

           <span>Remember your password? <Link to="/login">Back to Login</Link></span>
        </div>
    
    );

}

export default ResetPassword;
