
import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import {Turnstile,useTurnstile} from "react-turnstile"
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../styles/employer-registration.css";
import { Mail, Phone,Lock, Building2, UserRound } from "lucide-react";

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
        }console.log(JSON.stringify(data, null, 2));
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
        {message && (
          <div className="notifications">
            <h1>{message}</h1>
         </div>
          )} 

           <div className="registration-container">

            <div className="welcome">
            <h1>Employer Registration</h1>
            <span>Find the right candidates for your company</span>
            </div>


            <div className="icon">
            <Mail size={20}/>
            <input type="email" placeholder="email" value={data.email} minLength={5} maxLength={254} required
            onChange={(e) => setData({...data,email : e.target.value})}/>
           </div>
            <div className="icon">
           <Lock size={20}/>
            <input type="password" placeholder="password" value={data.password} minLength={8} maxLength={64} required
            onChange={(e) => setData({...data,password : e.target.value})}/>
            </div>
             <div className="icon">
            <UserRound size={20}/>
            <input type="text" placeholder="firstName" value={data.firstName} minLength={2} maxLength={40} required
            onChange={(e) => setData({...data,firstName : e.target.value})}/>
            </div>
              <div className="icon">
            <UserRound size={20}/>
            <input type="text" placeholder="lastName" value={data.lastName} minLength={2} maxLength={40} required
            onChange={(e) => setData({...data,lastName : e.target.value})}/>
            </div>
               <div className="icon">
             <Phone size={20}/>
            <PhoneInput defaultCountry="PL" className="phone" international value= {data.phoneNumber} onChange={(phone) => setData({...data,phoneNumber : phone})}/>
                </div>

            <div className="icon">
            <Building2 size={20}/>
            <input type="text" placeholder="nip" value={data.nip} minLength={10} maxLength={10}
            onChange={(e) => setData({...data,nip : e.target.value})} required/>
            </div>

          
         <Turnstile  sitekey="0x4AAAAAADsdFGr1bVY65jeD" 
         onSuccess={(token) => {setTurnstileToken(token);setMessage("");}}/>
            
            <button className="button" onClick={registration}>Sign Up</button>

           <div className="exist">
           <span>Already have account?  <Link to={"/login"}>Log In</Link> </span>
           </div>
       </div>
        </div>
    );
}
export default EmployerRegistration;