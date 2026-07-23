
import { useState,useEffect } from "react";
import {useNavigate } from "react-router-dom";

function AccountInformation(){

    const navigate = useNavigate();
    const [user,setUser] = useState(null);
    const [message,setMessage] = useState("");
    const [file,setFile] = useState(null);
   

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
      const formData = new FormData();

      formData.append("request",new Blob([
         JSON.stringify({
          firstName : user.employeeDto.firstName,
          lastName : user.employeeDto.lastName,
          phoneNumber: user.employeeDto.phoneNumber
          ,email : user.email
          ,password : user.password
        })
      ]
    ,{type : "application/json"})
        
      );
      if(file){
        formData.append("file",file);
      }
      const employeeUpdate = await fetch("http://localhost:8080/api/auth/account-information/employee",{
        method :"PUT",
        headers : { Authorization : `Bearer ${token}`},
        body : formData
      });

      const text = await employeeUpdate.json();
      if(employeeUpdate.ok){
        setMessage(text.message);
      }else{
        setMessage(text.message);
      }
    }
    const changeEmployerData = async() => {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("request",new Blob([
        JSON.stringify({
         firstName : user.employerDto.firstName,
          lastName : user.employerDto.lastName,
          phoneNumber : user.employerDto.phoneNumber,
          nip : user.employerDto.nip,
          companyName : user.employerDto.companyName,
          email : user.email,
          password : user.password
        })
      ],{type : "application/json"}));
     if(file){
        formData.append("file",file);
      }
      const updateEmployer = await fetch("http://localhost:8080/api/auth/account-information/employer",{
        method : "PUT",
        headers : {Authorization : `Bearer ${token}` },
        body : formData
      });

      const text = await updateEmployer.json();
      if(updateEmployer.ok){
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

          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setFile(e.target.files[0])} />

          <button onClick={changeEmployeeData}>Update </button>
            </div>
        )}

        {user && employer && (
          <div>
           <input type="email" placeholder="email" value={user?.email || ""}
           onChange={(e) => setUser({...user,email : e.target.value})}/>

           <input type="password" placeholder="password" value={user?.password || ""}
           onChange={(e) => setUser({...user,password : e.target.value})}/>

           <input type="text" placeholder="first Name" value={user?.employerDto?.firstName || ""}
           onChange={(e) => setUser({...user,employerDto : {...user.employerDto,firstName : e.target.value}})}/>

           <input type="text" placeholder="last Name" value={user?.employerDto?.lastName || ""}
           onChange={(e) => setUser({...user,employerDto : {...user.employerDto,lastName : e.target.value}})}/>

           <input type="text" placeholder="phoneNumber" value={user?.employerDto?.phoneNumber || ""}
           onChange={(e) => setUser({...user,employerDto : {...user.employerDto,phoneNumber : e.target.value}})}/>

           <input type="text" placeholder="company Name" value={user?.employerDto?.companyName || ""}
           onChange={(e) => setUser({...user,employerDto : {...user.employerDto,companyName : e.target.value}})}/>

           <input type="text" placeholder="nip" value={user?.employerDto?.nip || ""}
           onChange={(e) => setUser({...user,employerDto : {...user.employerDto,nip : e.target.value}})}/>

           <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files[0])}/>

           <button onClick={changeEmployerData}>Update Data</button>
          </div>
        )}
      </div>
    );
}

export default AccountInformation;