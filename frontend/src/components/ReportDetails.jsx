import { useState ,useEffect} from "react";
import { data, useParams } from "react-router-dom";



function ReportDetails(){
    const [user,setUser] = useState(null);
    const [report,setReport] = useState("");
    const {id} = useParams();


    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){return;}

        fetch("http://localhost:8080/api/auth/account-information",{
         headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setUser(data));
    

      fetch(`http://localhost:8080/api/reports/${id}`,{
        headers : {Authorization : `Bearer ${token}`}
    }).then(response => response.json()).then(data => setReport(data));
},[]);

    const admin = user?.roleDto?.some(role => role.role === "ADMIN");
    const employerOrEmploee = user?.roleDto?.some(role => role.role === "EMPLOYER" || role.role === "EMPLOYEE"); 


    return(
        <div>
           <h1>{report.id}</h1>
            <h1>{report.title}</h1>
            <h1>{report.contactCategory}</h1>
            <h1>{report.description}</h1>
            {report.picture && (
                <img src={`data:${report.pictureContentType};base64,${report.picture}`} width={"200"} height={"200px"}/>
            )}
            <h1>{new Date(report.createAt).toLocaleString("pl-PL")}</h1>
             <h1>{report.contactStatus}</h1>

             {user && admin && (
                <div>

                </div>
             )}

             {user && employerOrEmploee && (
                <div>
                    
                </div>
             )}
        </div>
    );

}

export default ReportDetails;

