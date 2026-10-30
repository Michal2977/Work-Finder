
import { useState,useEffect, useRef } from "react";
import {useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../styles/account-information.css";
import { Mail ,Lock, User, Building2, FileText} from "lucide-react";

function AccountInformation(){

    const navigate = useNavigate();
    const fileInputRef = useRef(null);
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

    const admin = user?.roleDto?.some(role => role.role === "ADMIN");
    const employee = user?.roleDto?.some(role => role.role === "EMPLOYEE");
    const employer = user?.roleDto?.some(role => role.role === "EMPLOYER");

    const changeAdminData = async() => {
       
      const token = localStorage.getItem("token");

      const response  =  await fetch("http://localhost:8080/api/auth/account-information/admin",{
        method : "PUT",
        headers : {Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"},
        body : JSON.stringify({
          password : user.password,
          email : user.email
        }) 
      });
    }
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
        setFile(null);
        fileInputRef.current.value ="";
        window.location.reload();
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
        setFile(null);
        fileInputRef.current.value ="";
        window.location.reload();
      }else{
        setMessage(text.message);
      }
    }

    return(
        <div>
           {message && (
                <div className="notifications">
                <h1>{message}</h1>
                </div>
            )}

        {user && admin && (
          <div className="main-containers">

              <div className="welcome">
              <h1>Manage Your Account</h1>
              <p>Update your personal information and account details to keep your profile accurate and up to date</p>
            </div>

            <div className="icons">
              <Mail size={20}/>
            <input type="email" placeholder="email" value={user?.email || ""} minLength={5} maxLength={254}
            onChange={(e) => setUser({...user,email : e.target.value})}/>
            </div>
              <div className="icons">
              <Lock size={20}/>
            <input type="password" placeholder="password" value={user?.password || ""}
            onChange={(e) => setUser({...user,password : e.target.value})}/>
            </div>
            <button className="button" onClick={changeAdminData}>Update </button>
          </div>
        )}  
        {user && employee && (
          
             <div className="main-containers">
                    <div className="welcome">
              <h1>Manage Your Account</h1>
              <p>Update your personal information and account details to keep your profile accurate and up to date</p>
            </div>

              <PhoneInput defaultCountry="PL" value={user?.employeeDto?.phoneNumber || ""} placeholder="Enter your phone number"
           onChange={(e) => setUser({...user,employeeDto : {...user.employeeDto,phoneNumber : e ?? ""}})}/>

                  <div className="icons">
           <Mail size={20}/>
            <input type="email" placeholder="email" value={user?.email || ""} minLength={5} maxLength={254}
            onChange={(e) => setUser({...user,email : e.target.value})}/>
             </div>

          <div className="icons">
             <Lock size={20}/>
          <input type="password" placeholder="password" value={user?.password || ""} minLength={8} maxLength={64}
          onChange={(e) => setUser({...user,password : e.target.value})}/>
         </div>

          <div className="icons">
            <User size={20}/>
          <input type="text" placeholder="firstName" value={user?.employeeDto?.firstName || ""} minLength={2} maxLength={40}
          onChange={(e) => setUser({...user,employeeDto : {...user.employeeDto,firstName : e.target.value}})}/>
          </div> 
          
           <div className="icons">
            <User size={20}/>
          <input type="text" placeholder="lastName" value={user?.employeeDto?.lastName || ""} minLength={2} maxLength={40}
          onChange={(e) => setUser({...user,employeeDto : {...user.employeeDto,lastName : e.target.value}})}/>
           </div> 
          
         
        
           <div className="picture">
            {user?.picture && (
              <img src={`data:${user.pictureContentType};base64,${user.picture}`}  width={"200px"} height={"200px"} alt="no profile"/>
            )}

          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setFile(e.target.files[0])} ref={fileInputRef}/>
          {file && (
            <img src={URL.createObjectURL(file)} width={"200px"} height={"200px"}/>
          )}
          </div>
          <button className="button" onClick={changeEmployeeData}>Update </button>
            </div>
        )}

        {user && employer && (
          <div className="main-containers">
            <div className="welcome">
              <h1>Manage Your Account</h1>
              <p>Update your personal information and account details to keep your profile accurate and up to date</p>
            </div>
              <PhoneInput defaultCountry="PL" value={user?.employerDto?.phoneNumber || ""}
          onChange={(e) =>setUser({...user,employerDto: {...user.employerDto,phoneNumber: e ?? ""}
        })}/>
           
           <div className="icons">
           <Mail size={20}/>
           <input type="email" placeholder="email" value={user?.email || ""} minLength={5} maxLength={254}
           onChange={(e) => setUser({...user,email : e.target.value})}/>
            </div> 

              <div className="icons">
           <Lock size={20}/>
           <input type="password" placeholder="password" value={user?.password || ""} minLength={8} maxLength={64}
           onChange={(e) => setUser({...user,password : e.target.value})}/>
         </div> 

          <div className="icons">
           <User size={20}/>
           <input type="text" placeholder="first Name" value={user?.employerDto?.firstName || ""}  minLength={2} maxLength={40}
           onChange={(e) => setUser({...user,employerDto : {...user.employerDto,firstName : e.target.value}})}/>
           </div> 

           <div className="icons">
           <User size={20}/>
           <input type="text" placeholder="last Name" value={user?.employerDto?.lastName || ""}  minLength={2} maxLength={40}
           onChange={(e) => setUser({...user,employerDto : {...user.employerDto,lastName : e.target.value}})}/>
           </div> 
        
     
              <div className="icons">
            <Building2 size={20}/>
           <input type="text" placeholder="company Name" value={user?.employerDto?.companyName || ""}  minLength={1} maxLength={100}
           onChange={(e) => setUser({...user,employerDto : {...user.employerDto,companyName : e.target.value}})}/>
             </div> 

                <div className="icons">
           <FileText size={20}/>
           <input type="text" placeholder="nip" value={user?.employerDto?.nip || ""}  minLength={10} maxLength={10}
           onChange={(e) => setUser({...user,employerDto : {...user.employerDto,nip : e.target.value}})}/>
            </div>  
            <div className="picture">
            {user?.picture && (
              <img src={`data:${user.pictureContentType};base64,${user.picture}`}  width={"200px"} height={"200px"} alt="no profile"/>
            )}
          
           <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files[0])} ref={fileInputRef}/>
           {file && (
            <img src={URL.createObjectURL(file)} width={"200px"} height={"200px"}/>
           )}
          </div>
           <button className="button" onClick={changeEmployerData}>Update Data</button>
          </div>
        )}
      </div>
    );
}

export default AccountInformation;