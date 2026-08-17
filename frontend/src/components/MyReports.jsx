import { useState,useEffect } from "react";



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
                    {contact.picture && (
                        <img src={`data:${contact.pictureContactType};base64,${contact.picture}`} width={"200px"} height={"200px"}
                         alt="no image" />
                    )}
                    <h1>{contact.id}</h1>
                    <h1>{contact.title}</h1>
                    <h1>{contact.description}</h1>
                </div>
            ))}
        </div>
    )

}

export default MyReports;