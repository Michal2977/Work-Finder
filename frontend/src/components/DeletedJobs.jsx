import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function DeletedJobs(){

    const [user,setUser] = useState(null);
    const [jobs,setJobs] = useState([]);


    const [page,setPage] = useState(0);
    const [size,setSize] = useState(10);
    const [keyword,setKeyword] = useState("");
    const [sort,setSort] = useState("createAtAsc");
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
        if(!token){ return;}

        fetch("http://localhost:8080/api/jobs", {
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setUser(data));

        fetch(`http://localhost:8080/api/deleted-jobs?page=${page}&size=${size}` + 
            `&keyword=${encodeURIComponent(keyword)}`+ 
            `&sort=${sort}` ,{
            headers : {Authorization : `Bearer ${token}`},
        }).then(response => response.json()).then(data => {
            setJobs(data.content);
            setTotalPages(data.totalPages);
        });

    },[page,size,keyword,sort]);
 
    const revocerOffer = async (id) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/recover-job/${id}`,{
        method : "PUT",
        headers : {Authorization : `Bearer ${token}`}
          });
          if(response.ok){
            window.location.reload();
          }
    }
   const toggleSort = () => {
        if(sort === "createAt"){
            setSort("createAtAsc");
        }else{
            setSort(sort === "createAtAsc" ? "createAtDesc" : "createAtAsc" );
        }
    }

  return(
        <div>

         <form className="d-flex" role="search" onSubmit={(e) => {
         e.preventDefault(); setKeyword(keywordInput);  setPage(0);
          }}>
          <input className="form-control me-2" type="search" placeholder="Job title, company, or keyword"  value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}/>
          <button className="btn btn-success" type="submit">Search</button>
          </form>
        <button className="btn btn-outline-primary" onClick={toggleSort}>{sort === "createAtAsc" ? "Oldest" : "Newest"}</button>
        {jobs.map(job => (
         <div className="card" width={"18rem"} key={job.id}> 
         {job.picture && (
            <img src={`data:${job.pictureCotentType};base64,${job.picture}`} width={"200px"} height={"200px"} alt="no image"/>
         )}
           <p>Expiration : {" "}</p>
           {new Date(job.expiresAt).toLocaleDateString("pl-PL")}
           <p>{getTimeLeft(job.expiresAt)}</p>
           <h5 className="card-title"> {job.position}</h5>
             <h5 className="card-title">{job.deletedAt && new Date(job.deletedAt).toLocaleString("pl-PL")}</h5>
            <p className="card-text">{job.salary}</p>
             <p className="card-text">{job.salaryPeriod}</p>
               <p className="card-text">{job.salaryType}</p>
               <p className="card-text">{job.location}</p>
              <p className="card-text">{job.jobCategory}</p>
              <p className="card-text">{job.employmentType}</p>
               <p className="card-text">{job.contractType}</p>
                 <p className="card-text">{job.jobStart}</p>
               <p className="card-text">{job.workMode}</p>
                  <Link to={`/jobs/${job.id}`}>Details</Link>
                 <button type="submit" className="btn btn-success" onClick={() => revocerOffer(job.id)}>Recover Job Offer</button>
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
    )


}

export default DeletedJobs;