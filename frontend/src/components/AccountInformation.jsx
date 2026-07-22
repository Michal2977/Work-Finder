
import { useState,useEffect } from "react";
import {useNavigate } from "react-router-dom";

function AccountInformation(){

    const navigate = useNavigate();
    const [user,setUser] = useState(null);
    const [message,setMessage] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");
        if(!token){return;}

        fetch("http://localhost:8080/api/auth/account-information",{
              headers : {Authorization : `Bearer ${token}`}
            }).then(response => response.json()).then(data => setUser(data));
    },[]);

    const employee = user?.roleDto?.some(role => role.role === "EMPLOYEE");
    const employer = user?.roleDto?.some(role => role.role === "EMPLOYER");

    const changeEmployeeData = async() => {
      const token = localStorage.getItem("token");
      const employeeUpdate = await fetch("http://localhost:8080/api/auth/account-information/employee",{
        method :"PUT",
        headers : {"Content-Type" : "application/json",
          Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({
          firstName : user.employeeDto.firstName,
          lastName : user.employeeDto.lastName,
          phoneNumber: user.employeeDto.phoneNumber
          ,email : user.email
          ,password : user.password
        })
      });

      const text = await employeeUpdate.json();
      if(employeeUpdate.ok){
        setMessage(text.message);
      }else{
        setMessage(text.message);
      }
    }


    return(
        <div>
          {message && <h1>{message}</h1>}
        {user && employee && (
             <div>
            <input type="email" placeholder="email" value={user?.email || ""}
            onChange={(e) => setUser({...user,email : e.target.value})}/>

          <input type="password" placeholder="password" value={user?.password || ""}
          onChange={(e) => setUser({...user,password : e.target.value})}/>

          <input type="text" placeholder="firstName" value={user?.employeeDto?.firstName || ""}
          onChange={(e) => setUser({...user,employeeDto : {...user.employeeDto,firstName : e.target.value}})}/>
          
          <input type="text" placeholder="lastName" value={user?.employeeDto?.lastName || ""}
          onChange={(e) => setUser({...user,employeeDto : {...user.employeeDto,lastName : e.target.value}})}/>

          <input type="text" placeholder="phone number" value={user?.employeeDto?.phoneNumber || ""}
          onChange={(e) =>setUser({...user,employeeDto : {...user.employeeDto,phoneNumber : e.target.value}})}/>

          <button onClick={changeEmployeeData}>Update </button>
            </div>
        )}
      </div>
    );
}

export default AccountInformation;