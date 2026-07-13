
import { useState } from "react"
import {Link, useNavigate } from "react-router-dom";


function EmployeeRegistration(){

    const [data,setData] = useState({email : "",password: ""});
    const [message,setMessage] = useState("");
    const navigate = useNavigate();

    const registration = async() => {
        const response = await fetch("http://localhost:8080/api/auth/employee-registration",{

            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(data)
        });

        const text = await response.json();
        if(response.ok){
            if(text.status === "SUCCESS"){
             navigate("/verify-email");
            }
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

            <button onClick={registration}>Sign Up</button>

            <br/>
            <Link to={"/login"}>Sing In</Link>
        </div>
    );

}

export default EmployeeRegistration;