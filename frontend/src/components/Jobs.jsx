
import {useEffect ,useState} from "react";
import { data, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../fragments/Navbar";

function Jobs(){

    const [user,setUser] = useState(null);

    const [page,setPage] = useState(0);
    const [size ,setSize] = useState(3);
    const [totalPages,setTotalPages] = useState(0);

    const [keyword,setKeyword] = useState("");
    const [locations,setLocations] = useState("");
    const [sort,setSort] = useState("createAt");

    const [locationInput,setLocationInput] = useState("");
    const [keywordInput,setKeywordInput] = useState("");

    const [message,setMessage] = useState("");
    const [contact,setContact] = useState([]);
    const [amountsOfReports,setamountOfReports] = useState(0);
    const [deletedJobs,setDeletedJobs] = useState([]);
    const [jobs,setJobs] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const getTimeLeft = (expiresAt) => {
     const now = new Date();
     const expiration = new Date(expiresAt);

     const diff = expiration - now;
     
     if(diff <= 0 ){
           return "The listing has expired";
     }

     const minutes = Math.floor(diff / (1000 * 60));
     const days = Math.floor(minutes /(60 *24));

     if(days >= 1){
        return `Left: ${days}days`;
     }

     const hours = Math.floor(minutes / 60);

     if(hours >= 1){
          return `Left: ${hours}hours`;
     }

     return `Left: ${minutes}minutes`;

    }

    const Admin = user?.roleDto?.some(role => role.role === "ADMIN");
    const Employee = user?.roleDto?.some(role => role.role === "EMPLOYEE");
    const employeeName = `${user?.employeeDto?.firstName ?? ""} ${user?.employeeDto?.lastName ?? ""}`.trim();
    const displayName = employeeName !== "" ? employeeName : user?.displayName;
    const Employer = user?.roleDto?.some(role => role.role === "EMPLOYER");

      useEffect(() => {
        fetch(`http://localhost:8080/api/jobs?page=${page}&size=${size}` 
      + `&location=${encodeURIComponent(locations)}`
       + `&keyword=${encodeURIComponent(keyword)}`
      + `&sort=${sort}`).then(response => response.json())
        .then(data => {
          setJobs(data.content);
          setTotalPages(data.totalPages);
        });
    },[page,size,locations,keyword,sort]);


    useEffect(() => {
     if(location.state?.message){
        setMessage(location.state.message);
     }
    },[location.state]);
    useEffect(() => {
  
      const token = localStorage.getItem("token");
      if(!token){
        return;
      }
      fetch("http://localhost:8080/api/jobs",{
       headers : {"Authorization" : `Bearer ${token}`}
      }).then(response => response.json()).then(data => setUser(data))
    },[]);
    useEffect(() => {
    const token = localStorage.getItem("token");
      if(!token){return;}
         if(!Admin){return;}
          fetch("http://localhost:8080/api/deleted-jobs",{
        headers : {Authorization : `Bearer ${token}`}
      }).then(response => response.json()).then(data => setDeletedJobs(data));
    },[Admin])

  

   const logout = () => {
    localStorage.removeItem("token");
    navigate("/login" , {state : {message : "You have been successfully logged out."}});
   }

   const softDelete = async(id) => {
    const token = localStorage.getItem("token");
    const response  =  await fetch(`http://localhost:8080/api/soft-delete/${id}`,{
        method : "DELETE",
        headers : {Authorization : `Bearer ${token}`}
    });
    if(response.ok){
     window.location.reload();
    }};
     
 
      useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) {return;}
        fetch("http://localhost:8080/api/my-reports",{
          headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setContact(data));

      },[]);
   useEffect(() => {
   const token = localStorage.getItem("token");
   if(!Admin){return;}
    fetch("http://localhost:8080/api/amounts-of-reports",{
          headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setamountOfReports(data));
   },[Admin]);



    return(

        <div>

       

         <Navbar user={user} Employee={Employee} Employer={Employer} Admin={Admin} logout={logout} displayName={displayName}
         amountsOfReports={amountsOfReports} deletedJobs={deletedJobs}/>

            <form className="d-flex" role="search" onSubmit={(e) => {
            e.preventDefault(); setKeyword(keywordInput); setLocations(locationInput); setPage(0);
          }}>
          <input className="form-control me-2" type="search" placeholder="Job title, company, or keyword"  value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}/>
          <input className="form-control me-2" type="search" placeholder="location" value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}/>
          <button className="btn btn-success" type="submit">Search</button>
          </form>

         {message && <h1>{message}</h1>}
             {jobs.map(job => {
            const employerOwner = user?.employerDto?.id === job?.employerDto?.id;
    return(     
                <div className="card" width={"18rem"}  key={job.id}>
                   {job.picture && (
                   <img src={`data:${job.pictureContentType};base64,${job.picture}`}  width={"200px"} height={"200px;"} alt="empty"/>
                    )}
                   
  <div className="card-body">
    <Link to={`/jobs/${job.id}`}>Details</Link>
    {user && (Admin || employerOwner) && (
    <div>
     <Link to={`/update-job/${job.id}`}>Update Job Offer</Link>
     <button  type="button" onClick={() => softDelete(job.id)}className="btn btn-danger">Delete Job</button>
    </div>     
    )}
   
     <p>Expiration : {" "}</p>  
     {new Date(job.expiresAt).toLocaleDateString("pl-PL")}
     <p>{getTimeLeft(job.expiresAt)}</p>
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
  
         </div> 
  </div>
  );
})}
<div>
  <button disabled={page === 0}
   onClick={() => setPage(page -1)}>Previous
   </button>

   <span>{page +1} / {totalPages}</span>

   <button disabled={page >= totalPages - 1}
  
   onClick={() => setPage(page +1)}>Next
   </button>

</div>
        </div>
    );
}
export default Jobs;
