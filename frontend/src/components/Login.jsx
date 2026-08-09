
import { useState,useEffect } from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";

function Login(){

    const [message,setMessage] = useState("");

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
      if(location.state?.message){
        setMessage(location.state.message);
      }
    },[location.state]);

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

    function loginWithGoogle(){
        window.location.href= "http://localhost:8080/oauth2/authorization/google"
    }

    function loginWithFacebook(){
        window.location.href= "http://localhost:8080/oauth2/authorization/facebook"
    }

    return(
        <div>
            {message && <h1>{message}</h1>}

            <input type="email" placeholder="email" value={email} required
            onChange={(e) => setEmail(e.target.value)}/>

            <input type="password" placeholder="password" value={password} required
            onChange={(e) => setPassword(e.target.value)}/> 

            <button onClick={handleLogin}>Sign In</button>
            <br/>
             <Link to={"/employer-registration"}>Employer</Link>
             <br/>
             <Link to={"/employee-registration"}>Employee</Link>
             <br/>
             <Link to={"/resend-email"}>Resend Email Activation</Link>
             <br/>
             <Link to={"/forgot-password"}>Forgot Password</Link>
             <br/>
             <button onClick={loginWithGoogle}>Login With Google</button>
             <br/>
             <button onClick={loginWithFacebook}>Login With Facebook</button>
        </div>
    );
}

export default Login;