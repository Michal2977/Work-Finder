
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword(){


    const [message,setMessage] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();


    const ForgotPassword = async()=> {
        const send = await fetch(`http://localhost:8080/api/auth/forgot-password?email=${encodeURIComponent(email)}`);

        const text = await send.json();
        if(send.ok){
            navigate("/reset-password-send");
        }else{
            setMessage(text.message);
        }
    }

    return(
        <div>
            {message && <h1>{message}</h1>}

            <input type="email" placeholder="email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>

            <button onClick={ForgotPassword}>Send</button>
        </div>
    );

}

export default ForgotPassword;