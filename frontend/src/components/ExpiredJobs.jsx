import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useState ,useEffect} from "react";
import {  Link, useNavigate } from "react-router-dom";

function ExpiredJobs(){

    const [user,setUser] = useState(null);
    const [jobs,setJobs] = useState([]);
    const navigate = useNavigate();

    const [keyword,setKeyword] = useState("");
    const [sort,setSort] = useState("expiresAtDesc");
    const [page,setPage] = useState(0);
    const [size,setSize] = useState(10);
    const [totalPages,setTotalPages] = useState(0);
    const [keywordInput,setKeywordInput] = useState("");
    

    const getTimeLeft = (expiresAt) => {
      const now = new Date();
      const expiration = new Date(expiresAt);

      const diff = expiration - now;

      if(diff <= 0 ){
         return "The listing has expired";
      }

      const minutes = Math.floor(diff / (1000 * 60));
      const days = Math.floor(minutes / (60 * 24));

      if(days >= 1) {
          return `Left: ${days}days`;
      }
       
      const hours = Math.floor(minutes / 60);
      if(hours >= 1){
          return `Left: ${hours}hours`;
      }
       return `Left: ${minutes}minutes`;
    }


    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){return;}
        
        fetch(`http://localhost:8080/api/expired-jobs?page=${page}&size=${size}` + 
            `&keyword=${encodeURIComponent(keyword)}` + 
            `&sort=${sort}`,{
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => { setJobs(data.content);
        setTotalPages(data.totalPages)});

        fetch("http://localhost:8080/api/auth/account-information",{
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setUser(data));
    },[page,size,keyword,sort]);


     const softDelete = async(id) => {
    const token = localStorage.getItem("token");
    if(!token) {return;}
    const response  =  await fetch(`http://localhost:8080/api/soft-delete/${id}`,{
        method : "DELETE",
        headers : {Authorization : `Bearer ${token}`}
    });
    if(response.ok){
     window.location.reload();
    }};

    const toggleSort = () => {
        if(sort === "expiresAt"){
            setSort("expiresAtAsc");
        }else{
            setSort(sort === "expiresAtAsc" ? "expiresAtDesc" : "expiresAtAsc" );
        }
    }
    return(
    <div>
       
            <div className="searcher">
           <form className="d-flex" role="search" onSubmit={(e) => {
            e.preventDefault(); setKeyword(keywordInput);  setPage(0);
          }}>
          <input  type="search" placeholder="Job title, company, or keyword"  value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}/>
          <button  type="submit">Search</button>
          </form>
            <button className="sorting" onClick={toggleSort}>{sort === "expiresAtAsc" ? "Oldest" : "Newest"}</button>
          </div>
      
       
         <div className="fallen-container">
              <h1 className="all-deleted">All Expires Job Offers</h1>
        {jobs.map(job => (
            <div className="card"  key={job.id} onClick={() => navigate(`/jobs/${job.id}`)} style={{cursor : "pointer"}}>
                {job.picture &&  (
                <img src={`data:${job.pictureContentType};base64,${job.picture}`} alt="no image"/>
                )}
                   <div className="fallen-operations">
                 <button type="submit" className="fallen-delete" onClick={(e) => {e.stopPropagation();softDelete(job.id)}}><Trash2 size={22}/></button>
               <Link to={`/update-job/${job.id}`} className="fallen-update" onClick={(e) => (e.stopPropagation())}><Pencil size={22}/></Link>
            </div>
              

                <div className="fallen-info">
                 <h1 > {job.position}</h1>
                <p >{job.salary} {job.currency} {job.salaryPeriod} {job.salaryType}</p>
               <p >{job?.companyName}</p>
                <span >{job.location}</span>
                </div>
             <div className="fallen-details">
              <span >{job.jobCategory}</span>
              <span>{job.employmentType}</span>
               <span>{job.contractType}</span>
                <span >{job.jobStart}</span>
               <span >{job.workMode}</span>
              </div>
               <hr/>
            <div className="fallen-date">
              <div className="deleted-date">
                 <span >Create At {job.createAt && new Date(job.createAt).toLocaleString("pl-PL")}</span>
              </div>
               <div className="expires-date">
               <span> {getTimeLeft(job.expiresAt)}</span>
               </div>
               </div>             
               
            </div>
        ))}

            <div className="page">
          <button className="btn btn-outline-primary" disabled={page === 0} onClick={() => setPage(page -1)}><ChevronLeft size={25}/></button>

          {Array.from({length : totalPages}, (_,index) => (
            <button key={index} className={`btn ${page === index ? "btn-primary" : "btn-outline-secoundary"}`} 
            onClick={() => setPage(index)}> {index + 1}</button>
          ))}

              
          <button className="btn btn-outline-primary" disabled={page >= totalPages -1} onClick={() => setPage(page + 1)}><ChevronRight size={25}/></button>
        </div>
    </div>
    </div>
    );
    
}

export default ExpiredJobs;