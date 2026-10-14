
import { Mail,Lock } from "lucide-react";
import { useState} from "react"
import {Link, useNavigate } from "react-router-dom";
import {Turnstile,useTurnstile} from "react-turnstile";
import "../styles/employee-registration.css";



function EmployeeRegistration(){

    const [data,setData] = useState({email : "",password: ""});
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const [turnstileToken,setTurnstileToken] = useState("");
    const turnstile = useTurnstile();

    const registration = async() => {
        if(!turnstileToken){
            setMessage("Complete the Turnstile verification.");
            return;
        }
        const response = await fetch("http://localhost:8080/api/auth/employee-registration",{

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
            {message && (
                <div className="notifications">
                <h1>{message}</h1>
                </div>
            )}
           
            <div className="employee-registration">
                 
            <div className="welcome">
            <h1>Employee Registration</h1>
            <span>Find your next job and connect with the right employers</span>
            </div>

             <div className="icon">
             <Mail size={20}/>   
            <input type="email" placeholder="email" value={data.email} required
            onChange={(e) => setData({...data,email : e.target.value})} minLength={5} maxLength={254}/>
               </div> 
                <div className="icon">

              <Lock size={20}/> 
            <input type="password" placeholder="password" value={data.password} minLength={8} maxLength={64} required
            onChange={(e) => setData({...data,password : e.target.value})}/>
              </div> 
           
             <Turnstile sitekey="0x4AAAAAADsdFGr1bVY65jeD" onSuccess={(token) => {setTurnstileToken(token);setMessage("");}}/>

            <button className="button" onClick={registration}>Sign Up</button>
            
             <div className="exist">
            <span>Already have account?  <Link to={"/login"}>Log In</Link> </span>
            </div>
           </div>
        </div>
    );

}

export default EmployeeRegistration;