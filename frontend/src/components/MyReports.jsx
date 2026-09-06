import { useState,useEffect } from "react";
import {Link } from "react-router-dom";



function MyReports(){

    const [user,setUser] = useState();
    const [contacts,setContacts] = useState([]);
    const [amountsOfReports,setamountOfReports] = useState(0);

    const [keyword,setKeyword] = useState("");
    const [keywordInput,setKeywordInput] = useState("");
    const [sort,setSort] = useState("sentAt");
    const [page,setPage] = useState(0);
    const [size,setSize] = useState(10);
    const [totalPages,setTotalPages] = useState(0);


  const admin = user?.roleDto?.some(role => role.role === "ADMIN");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){return;}

        fetch("http://localhost:8080/api/auth/account-information",{
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setUser(data));

          fetch(`http://localhost:8080/api/my-reports?page=${page}&size=${size}`+ 
            `&keyword=${encodeURIComponent(keyword)}` + `&sort=${sort}`,{
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data =>{ setContacts(data.content);setTotalPages(data.totalPages)});

        if(!admin){return;}

       fetch("http://localhost:8080/api/amounts-of-reports",{
          headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setamountOfReports(data)) ;
    },[admin,page,size,keyword,sort]);

  

    return(
        <div>

           
          {user && admin && (
            <div>
             <form className="d-flex" role="search" onSubmit={(e) => {
            e.preventDefault(); setKeyword(keywordInput);  setPage(0);
          }}>
          <input className="form-control me-2" type="search" placeholder="Job title, company, or SENT,IN_PROGRESS,CLOSED"  value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}/>
          <button className="btn btn-success" type="submit">Search</button>
          </form>
            </div>
          )}
             
        
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

    {user && admin && (
          <div>
              <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-primary" disabled={page === 0} onClick={() => setPage(page -1)}>Previous</button>

          {Array.from({length : totalPages}, (_,index) => (
            <button key={index} className={`btn ${page === index ? "btn-primary" : "btn-outline-secoundary"}`} 
            onClick={() => setPage(index)}> {index + 1}</button>
          ))}

              
          <button className="btn btn-outline-primary" disabled={page >= totalPages -1} onClick={() => setPage(page + 1)}>Next</button>
        </div>
          </div>
          )}
      
        </div>
    )

}   

export default MyReports;