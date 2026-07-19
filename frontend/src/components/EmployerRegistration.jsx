
import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import {Turnstile,useTurnstile} from "react-turnstile"

function EmployerRegistration(){

    const [data,setData] = useState({firstName : "",lastName: "" ,phoneNumber : "", nip : "", email : "", password: ""});
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const [turnstileToken,setTurnstileToken] = useState("");
    const turnstile = useTurnstile();

    const registration = async() => {
        if(!turnstileToken){
            setMessage("Complete the Turnstile verification.");
             return;
        }
        const response = await fetch("http://localhost:8080/api/auth/employer-registration",{

            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({...data,turnstileToken})
        });

        const text = await response.json();
        if(response.ok){
            if(text.status === "SUCCESS"){
                navigate("/verify-email");
            }else if(text.status === "LINKED"){
                setMessage(text.message);
                setTimeout(() => {
                     navigate("/login");
                },2000);
              
            }
        }else{
            setMessage(text.message);
            setTurnstileToken("");
            turnstile.reset();
        }
    }

    return(
        <div>
            {message && <h1>{message}</h1>}

            <input type="email" placeholder="email" value={data.email}
            onChange={(e) => setData({...data,email : e.target.value})}/>

            <input type="password" placeholder="password" value={data.password}
            onChange={(e) => setData({...data,password : e.target.value})}/>
            
            <input type="text" placeholder="firstName" value={data.firstName}
            onChange={(e) => setData({...data,firstName : e.target.value})}/>

            <input type="text" placeholder="lastName" value={data.lastName}
            onChange={(e) => setData({...data,lastName : e.target.value})}/>

            <input type="text" placeholder="phoneNumber" value={data.phoneNumber}
            onChange={(e) => setData({...data,phoneNumber : e.target.value})}/>

            <input type="text" placeholder="nip" value={data.nip}
            onChange={(e) => setData({...data,nip : e.target.value})}/>

            <button onClick={registration}>Sign Up</button>

            <br/>
             <Link to={"/login"}>Sing In</Link>
             <br/>
             <Turnstile sitekey="0x4AAAAAADsdFGr1bVY65jeD" onSuccess={(token) => {setTurnstileToken(token);setMessage("");}}/>

        </div>
    );
}
export default EmployerRegistration;