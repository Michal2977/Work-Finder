
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login(){

    const navigate = useNavigate();
    const [email,setEmail]  = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");

    async function handleLogin(){
        const response = await fetch("http://localhost:8080/api/auth/login",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({email,password})
        });

        if(response.ok){
         const data = await response.json();
         localStorage.setItem("token",data.token);
         navigate("/jobs");
        }else{
            const text  = await response.json();
            setMessage(text.message);
        }
    }

    return(
        <div>
            {message && <h1>{message}</h1>}
            
            <input type="email" placeholder="email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>

            <input type="password" placeholder="password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>

            <button onClick={handleLogin}>Sign In</button>
        </div>
    );
}

export default Login;

