import { CalendarDays, ChevronLeft, ChevronRight, ClipboardList, Clock, FileText, Hash, MessageCircle, Tag,  UserRound } from "lucide-react";
import { useState,useEffect } from "react";
import {Link } from "react-router-dom";
import "../styles/my-reports.css";



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
            <div className="searcher">
             <form className="d-flex" role="search" onSubmit={(e) => {
            e.preventDefault(); setKeyword(keywordInput);  setPage(0);
          }}>
          <input  type="search" placeholder="Job title, company, or SENT,IN_PROGRESS,CLOSED"  value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}/>
          <button className="button" type="submit">Search</button>
          </form>
            </div>
          )}
             
            <div className="amounts">
               <div className="report-label">
                 <ClipboardList size={20}/>
                  <h1>Amounts of reports: {amountsOfReports}</h1>
                  </div>
                  
                  </div>
            {contacts.map(contact => (
              
                <div key={contact.id} className="conatiner-contact">
                  <Link to={`/reports/${contact.id}`}>

                   <div className="report-information">
                      <div className="report-label">
                    <Hash size={20}/>
                    <p>Number of Report</p>
                     </div>
                    <h1>{contact.id}</h1>
                    </div>


                    <div className="report-information">
                         <div className="report-label">
                     < FileText size={20}/> 
                    <p>Subject</p>
                      </div>
                    <h1>{contact.title}</h1>
                    </div>

                      <div className="report-information">
                        <div className="report-label">
                     <Tag size={20}/>   
                    <p>Category</p>
                     </div>
                    <h1>{contact.contactCategory}</h1>
                     </div>

                    <div className="report-information">
                        <div className="report-label">
                    <Clock size={20}/>  
                    <p>Status</p>
                       </div>
                    <h1>{contact.contactStatus}</h1>
                 
                    </div> 

                    <div className="sent-at">
                      <div className="report-label">
                      <CalendarDays size={20}/>
                    <span>{new Date(contact.sentAt).toLocaleString("pl-PL")}</span>
                    </div>
                    </div>
                    </Link>
               
                {user && admin &&  (
                  <>
                  <hr/>
                <div className="report-information" >
                    <div className="report-label">
                  <MessageCircle size={20}/>
                  <p>admin response</p>
                    </div>
                  <h1>{contact?.adminMessageCount}</h1>
                
                  </div>
                  <div className="report-information">
                      <div className="report-label">
                   <UserRound size={20}/> 
                  <p>user response </p>
                     </div>
                  <h1>{contact?.userMessageCount}</h1>
               
                 </div>
               </>
            )}
                </div>
            ))}

    {user && admin && (
          <div className="page">
              <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-primary" disabled={page === 0} onClick={() => setPage(page -1)}>
            <ChevronLeft  size={25}/></button>

          {Array.from({length : totalPages}, (_,index) => (
            <button key={index} className={`btn ${page === index ? "btn-primary" : "btn-outline-secoundary"}`} 
            onClick={() => setPage(index)}> {index + 1}</button>
          ))}

              
          <button className="btn btn-outline-primary" disabled={page >= totalPages -1} onClick={() => setPage(page + 1)}>
            <ChevronRight size={25}/>
          </button>
        </div>
          </div>
          )}
      
        </div>
    )

}   

export default MyReports;