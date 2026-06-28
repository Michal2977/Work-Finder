
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import {Turnstile} from "react-turnstile"

function EmployeeRegsitration(){
   
    const [data,setData] = useState({email:"",password : ""});
    const [message,setMessage] = useState("");
    const [turnstileToken,setTurnstileToken] = useState("");
    const navigate = useNavigate();

    const register = async() =>{
        const response = await fetch("http://localhost:8080/api/auth/employeeRegistration", {
        method :"POST",
        headers : {"Content-Type"  : "application/json"},
        body : JSON.stringify({...data,turnstileToken:turnstileToken}) 
        });

        const text = await response.json();

        if(response.ok){
         navigate("/Verify-Email");
        }else{
            setMessage(text.message);
        }
 }

    return(
        <div>
            {message && <h1>{message}</h1>}
            <input type="email" placeholder="email" value={data.email}
            onChange={(e) => setData({...data,email : e.target.value})}/>

            <input type="password" placeholder="password" value={data.password}
            onChange={(e) => setData({...data,password : e.target.value})}/>

            <button onClick={register}>Sign Up</button>


            <Turnstile sitekey="0x4AAAAAADsdFGr1bVY65jeD" onSuccess={(token) => setTurnstileToken(token)}/>

        
        </div>
    );
}

export default EmployeeRegsitration;