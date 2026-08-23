import { useState,useEffect } from "react";
import { Link } from "react-router-dom";



function MyReports(){

    const [user,setUser] = useState();
    const [contacts,setContacts] = useState([]);
    const [amountsOfReports,setamountOfReports] = useState(0);


  const admin = user?.roleDto?.some(role => role.role === "ADMIN");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){return;}

        fetch("http://localhost:8080/api/auth/account-information",{
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setUser(data));

          fetch("http://localhost:8080/api/my-reports",{
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setContacts(data));

        if(!admin){return;}

       fetch("http://localhost:8080/api/amounts-of-reports",{
          headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setamountOfReports(data)) ;
    },[admin]);

  

    return(
        <div>
            {contacts.map(contact => (
                <div key={contact.id}>
                     {user && admin && (
                <h1>number of reports {contact?.numberOfReports}</h1>
            )}
            {user && admin &&  (
                <div>
                  <h1>Number of reports: {amountsOfReports}</h1>
                 <h1>admin response {contact?.adminMessageCount}</h1>
                <h1>user response {contact?.userMessageCount}</h1>
                </div>
            )}
         
                    <h1>{contact.id}</h1>
                    <h1>{contact.title}</h1>
                    <h1>{contact.contactCategory}</h1>
                    <h1>{contact.contactStatus}</h1>
                    <h1>{new Date(contact.sentAt).toLocaleString("pl-PL")}</h1>
                    <Link to={`/reports/${contact.id}`}>Details</Link>
                
                  
                
                </div>
            ))}
        </div>
    )

}   

export default MyReports;