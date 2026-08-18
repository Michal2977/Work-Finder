import { useState,useEffect } from "react";
import { Link } from "react-router-dom";



function MyReports(){

    const [user,setUser] = useState();
    const [contacts,setContacts] = useState([]);



    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){return;}

        fetch("http://localhost:8080/api/auth/account-information",{
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setUser(data));

          fetch("http://localhost:8080/api/my-reports",{
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setContacts(data))
    },[]);

    

    return(
        <div>
            {contacts.map(contact => (
                <div key={contact.id}>
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