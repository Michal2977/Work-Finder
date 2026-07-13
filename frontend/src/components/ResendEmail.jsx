
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResendEmail(){

    const [message,setMessage] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();

    const resend = async() => {
        const response = await fetch(`http://localhost:8080/api/auth/resend?email=${encodeURIComponent(email)}`);
        

        const text = await response.json();
        if(response.ok){
            navigate("/verify-email");
        }else{
            setMessage(text.message);
        }
    }

    return(
        <div>
            {message && <h1>{message}</h1>}
      <input type="email" placeholder="email" value={email}
      onChange={(e) => setEmail(e.target.value)}/>

      <button onClick={resend}>Resend </button>
      </div>
    );
}

export default ResendEmail;