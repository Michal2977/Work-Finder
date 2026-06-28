
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Turnstile} from "react-turnstile"
function EmployerRegsitration(){


      const  navigate  = useNavigate();
      const [turnstileToken,setTurnstileToken] = useState("");
      const [data,setData] = useState({firstName:"",lastName : "", phoneNumber:"",nip:"",email:"",password:""});
        const [message,setMessage] = useState("");
    const register = async() => {

      

        const response = await fetch("http://localhost:8080/api/auth/employerRegistration",{
            method : "POST",
            headers : {"Content-type" : "application/json"},
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

            <input type="text" placeholder="first Name" value={data.firstName}
            onChange={(e) => setData({...data,firstName : e.target.value})}/>

            <input type="text" placeholder="last Name" value={data.lastName}
            onChange={(e) => setData({...data,lastName : e.target.value})}/>

            <input type="text" placeholder="phoneNuber" value={data.phoneNumber}
            onChange={(e) => setData({...data,phoneNumber : e.target.value})}/>

            <input type="text" placeholder="nip" value={data.nip}
            onChange={(e) => setData({...data,nip : e.target.value})}/>

            <input type="email" placeholder="email" value={data.email}
            onChange={(e) => setData({...data,email : e.target.value})}/>
            
            <input type="password" placeholder="password" value={data.password}
            onChange={(e) => setData({...data,password : e.target.value})}/>

            <button onClick={register}>Sign Up</button>

            <Turnstile sitekey="0x4AAAAAADsdFGr1bVY65jeD" onSuccess={(token) => setTurnstileToken(token)}/>
                 
        </div>
    );
}

export default EmployerRegsitration;