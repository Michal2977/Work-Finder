
import { useEffect,useState } from "react";
import { data } from "react-router-dom";

function Jobs(){

    const [user,setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token){
            return;
        }
        fetch("http://localhost:8080/api/jobs",{
         headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setUser(data));
    },[]);

    const Employee = user?.roleDto?.some(role => role.role === "EMPLOYEE");
    const Employer = user?.roleDto?.some(role => role.role === "EMPLOYER");

    return(
        <div>
            <h1>Welcome Jobs Page</h1>
                      
            {user && Employee && (
                <div>
                    <h1>{user.email}</h1>
                </div>
            )}
            {user && Employer && (
                <h1>{user.employerDto.firstName}</h1>
            )}          
          
        </div>
    );
    
}

export default Jobs;