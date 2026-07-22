import {useEffect ,useState} from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Jobs(){

    const [user,setUser] = useState(null);
    const [message,setMessage] = useState("");

    const location = useLocation();

    useEffect(() => {
     if(location.state?.message){
        setMessage(location.state.message);
     }
    },[location.state]);
    useEffect(() => {
  
      const token = localStorage.getItem("token");

      if(!token){
        return;
      }
      fetch("http://localhost:8080/api/jobs",{
       headers : {"Authorization" : `Bearer ${token}`}
      }).then(response => response.json()).then(data => setUser(data));
    },[]);

    const Employee = user?.roleDto?.some(role => role.role === "EMPLOYEE");
    const employeeName = `${user?.employeeDto?.firstName ?? ""} ${user?.employeeDto?.lastName ?? ""}`.trim();
    const displayName = employeeName !== "" ? employeeName : user?.displayName;

    const Employer = user?.roleDto?.some(role => role.role === "EMPLOYER");

 

   
    return(
        <div>
            {message && <h1>{message}</h1>}
            <h1>Welcome Jobs Page</h1>
          
             {user && (Employee || Employer) && (
                <div>
                    <Link to={"/account-information"}>Account</Link>
                </div>
             )}
            {user && Employee && (
                <div>
                  <h1>employee</h1>
                  <h1>{displayName}</h1>
                <h1>{user.email}</h1>
                </div>
                
            )}

            {user && Employer && (
                <div>
                    <h1>Employer</h1>
                    <h1>{user.employerDto.firstName}</h1>
                     <h1>{user.employerDto.lastName}</h1>
                </div>
            )}
        </div>
    );
}
export default Jobs;


