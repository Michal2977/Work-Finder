
import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";

function Login(){

    const [message,setMessage] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(){
        const resposne = await fetch("http://localhost:8080/api/auth/login",{
         
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({email,password})
        });

       
        if(resposne.ok){
             const data = await resposne.json();
            localStorage.setItem("token",data.token);
            navigate("/jobs");
        }else{
             const text = await resposne.json();
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
            <br/>
             <Link to={"/employer-registration"}>Employer</Link>
             <br/>
             <Link to={"/employee-registration"}>Employee</Link>
        </div>
    );
}

export default Login;