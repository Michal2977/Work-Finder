import { useState ,useEffect} from "react";
import {  Link } from "react-router-dom";



function ExpiredJobs(){

    const [user,setUser] = useState(null);
    const [jobs,setJobs] = useState([]);

    const [keyword,setKeyword] = useState("");
    const [sort,setSort] = useState("expiresAtDesc");
    const [page,setPage] = useState(0);
    const [size,setSize] = useState(10);
    const [totalPages,setTotalPages] = useState(0);
    const [keywordInput,setKeywordInput] = useState("");
    

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


    const toggleSort = () => {
        if(sort === "expiresAt"){
            setSort("expiresAtAsc");
        }else{
            setSort(sort === "expiresAtAsc" ? "expiresAtDesc" : "expiresAtAsc" );
        }
    }



    return(
    <div>
        {user && (
            <div>
            {user?.email}
            </div>
        )}
           <form className="d-flex" role="search" onSubmit={(e) => {
            e.preventDefault(); setKeyword(keywordInput);  setPage(0);
          }}>
          <input className="form-control me-2" type="search" placeholder="Job title, company, or keyword"  value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}/>
          <button className="btn btn-success" type="submit">Search</button>
          </form>
        <button className="btn btn-outline-primary" onClick={toggleSort}>{sort === "expiresAtAsc" ? "Oldest" : "Newest"}</button>

        {jobs.map(job => (
            <div className="card" width={"18rem"} key={job.id}>
                {job.picture &&  (
                <img src={`data:${job.pictureContentType};base64,${job.picture}`} width={"200px"} height={"200px"} alt="no image"/>
                )}

                <div className="card-body">
                     <h1>The offer has expired</h1>
                        <h5 className="card-title"> {job.id}</h5>
                    <h5 className="card-title"> {job.position}</h5>
                    <p className="card-text">{job.salary}</p>
                    <p className="card-text">{job.salaryPeriod}</p>
                    <p className="card-text">{job.salaryType}</p>
                     <p className="card-text">{job.location}</p>
                     <p className="card-text">{job.jobCategory}</p>
                     <p className="card-text">{job.employmentType}</p>
                     <p className="card-text">{job.contractType}</p>
                     <p className="card-text">{job.jobStart}</p>
                     <p className="card-text">{job.workMode}</p>
                     <Link to={`/jobs/${job.id}`}>offer Details</Link>
                     <Link to={`/update-job/${job.id}`}>Update Job Offer</Link>
                </div>
            </div>
        ))}

        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-primary" disabled={page === 0} onClick={() => setPage(page -1)}>Previous</button>

          {Array.from({length : totalPages}, (_,index) => (
            <button key={index} className={`btn ${page === index ? "btn-primary" : "btn-outline-secoundary"}`} 
            onClick={() => setPage(index)}> {index + 1}</button>
          ))}

              
          <button className="btn btn-outline-primary" disabled={page >= totalPages -1} onClick={() => setPage(page + 1)}>Next</button>
        </div>

   

 
    </div>
    );
    
}

export default ExpiredJobs;