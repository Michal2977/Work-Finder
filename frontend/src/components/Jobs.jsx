
import {useEffect ,useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../fragments/Navbar";
import Filters from "../fragments/Filters";
import "../styles/searcher.css";
import "../styles/job-card.css";
import { ChevronLeft, ChevronRight, Pencil, Star, Trash2 } from "lucide-react";

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
    const [workMode,setWorkMode] = useState([]);
    const [contractType,setContractType] = useState([]);
    const [employmentType,setEmploymentType] = useState([]);
    const [jobCategory,setJobCategory] = useState([]);
    const [salaryPeriod,setSalaryPeriod] = useState([]);

    const [salary,setSalary] = useState("");
    const [selectedSalaryPeriod,setSelectedSalaryPeriod] = useState("");
    const [salaryType,setSalaryType] = useState("");
  

    const [jobCategoryCounts,setJobCategoryCounts] = useState([]);
    const [jobWorkModeCount,setJobWorkModeCount] = useState([]);
    const [countJobContactType,setCountJobContactType] = useState([]);
    const [countJobEmploymentType,setCountJobEmploymentType] = useState([]);
    const [countJobSalaryPeriod,setJobSalaryPeriod] = useState([]);
    const [countJobSalary,setCountJobSalary] = useState("");
    const [currency,setCurrency] = useState("");

    const [publicationDate,setPublicationDate] = useState([]);
    const [publicationDateCounts,setPublicationDateCounts] = useState([]);

    const [message,setMessage] = useState("");
    const [contact,setContact] = useState([]);
    const [amountsOfReports,setamountOfReports] = useState(0);
    const [amountOfDeletedJobs,setAmountsOfDeletedJobs] = useState(0);
    const [amountsOfFavoriteJobs,setAmountsOfFavoriteJobs] = useState(0);

    const [amountOfAllExpiresJob,setAmountsOfAllExpiresJob] = useState(0);
    const [amountOfEmployerExpiresJob,setAmountsOfEmployerExpiresJobs] = useState(0);
    const [jobsEmployerOwner,setJobsEmployerOwner] = useState(0);

    const [isSaved,setIsSaved] = useState(new Set());

   

    const [jobs,setJobs] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    

    const Admin = user?.roleDto?.some(role => role.role === "ADMIN");
    const Employee = user?.roleDto?.some(role => role.role === "EMPLOYEE");
    const Employer = user?.roleDto?.some(role => role.role === "EMPLOYER");

    const employeeName = `${user?.employeeDto?.firstName ?? ""} ${user?.employeeDto?.lastName ?? ""}`.trim();
    const displayName = employeeName !== "" ? employeeName : user?.displayName || "My Account";

      useEffect(() => {
        fetch(`http://localhost:8080/api/jobs?page=${page}&size=${size}` 
      + `&location=${encodeURIComponent(locations)}`
       + `&keyword=${encodeURIComponent(keyword)}`
       + workMode.map(mode => `&workMode=${encodeURIComponent(mode)}`).join("")
       + contractType.map(contract => `&contractType=${encodeURIComponent(contract)}`).join("")
       + employmentType.map(employment => `&employmentType=${encodeURIComponent(employment)}`).join("")
       + jobCategory.map(category => `&jobCategory=${encodeURIComponent(category)}`).join("")
       + salaryPeriod.map(period => `&salaryPeriod=${encodeURIComponent(period)}`).join("")
      + publicationDate.map(time => `&publicationDate=${encodeURIComponent(time)}`).join("")
      + `&selectedSalaryPeriod=${encodeURIComponent(selectedSalaryPeriod)}`
      + `&salaryType=${encodeURIComponent(salaryType)}`
      + `&salary=${encodeURIComponent(salary)}`
      + `&currency=${encodeURIComponent(currency)}`
      + `&sort=${sort}`).then(response => response.json())
        .then(data => {
        
          setJobs(data.jobs.content);
          setTotalPages(data.jobs.totalPages)
          setJobCategoryCounts(data.jobCategoryCounts)
          setJobWorkModeCount(data.jobWorkModeCount)
          setCountJobContactType(data.countJobContactType)
          setCountJobEmploymentType(data.countJobEmploymentType)
          setJobSalaryPeriod(data.countJobSalaryPeriod)
          setPublicationDateCounts(data.publicationDate)
          setCountJobSalary(data.countJobSalary);
          
        });
    },[page,size,locations,keyword,workMode,contractType,employmentType,jobCategory,salaryPeriod,publicationDate,
      selectedSalaryPeriod,salaryType,salary,currency,sort]);


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

      fetch("http://localhost:8080/api/auth/account-information",{
        headers : {Authorization : `Bearer ${token}`}
      }).then(response => response.json()).then(data => setUser(data))
    },[]);

     const saveJobOffer = async(id) => {
      const token = localStorage.getItem("token");
      if(!token){return;}

      const response = await fetch(`http://localhost:8080/api/save-job/${id}`,{
        method : "POST",
        headers : {Authorization : `Bearer ${token}`}
      });

      const text = await response.json();
      if(response.ok){
        setAmountsOfFavoriteJobs(prev => prev + 1);
       setMessage(text.message);
    setTimeout(() => {
        setMessage("");
    }, 2000);
      }else{
        setMessage(text.message);
      }
     };

  

   const logout = () => {
    localStorage.removeItem("token");
    navigate("/login" , {state : {message : "You have been successfully logged out."}});
   }

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

        fetch("http://localhost:8080/api/amounts-of-all-expires-job",{
          headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setAmountsOfAllExpiresJob(data));

   },[Admin]);

   useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){return;}
    if(!Admin){return;}

    fetch("http://localhost:8080/api/amount-of-deleted-jobs",{
      headers : {Authorization : `Bearer ${token}`}
    }).then(response => response.json()).then(data => setAmountsOfDeletedJobs(data));
   },[Admin]);


   
   useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){return;}

     fetch("http://localhost:8080/api/amount-of-favorite-jobs",{
      headers : {Authorization : `Bearer ${token}`}
    }).then(response => response.json()).then(data => setAmountsOfFavoriteJobs(data));
   },[]);

   useEffect(() => {
 
    const token = localStorage.getItem("token");
    if(!token){return;}
    if(!Employer){return;}

      fetch("http://localhost:8080/api/amounts-of-employer-expires-job",{
      headers : {Authorization : `Bearer ${token}`}
    }).then(response => response.json()).then(data => setAmountsOfEmployerExpiresJobs(data));

    fetch("http://localhost:8080/api/amounts-of-employer-jobs",{
      headers : {Authorization : `Bearer ${token}`}
    }).then(response => response.json()).then(data => setJobsEmployerOwner(data));
   },[Employer])


    return(

        <div>
    

         <Navbar user={user} Employee={Employee} Employer={Employer} Admin={Admin} logout={logout} displayName={displayName}
         amountsOfReports={amountsOfReports}    amountOfDeletedJobs={amountOfDeletedJobs} amountsOfFavoriteJobs={amountsOfFavoriteJobs}
         amountOfAllExpiresJob={amountOfAllExpiresJob} amountOfEmployerExpiresJob={amountOfEmployerExpiresJob} 
         jobsEmployerOwner={jobsEmployerOwner}/>
         
         <Filters workMode={workMode} setWorkMode={setWorkMode} contractType={contractType} setContractType={setContractType} employmentType={employmentType} setEmploymentType={setEmploymentType} jobCategory={jobCategory} setJobCategory={setJobCategory}
         salaryPeriod={salaryPeriod} setSalaryPeriod={setSalaryPeriod} setPage={setPage} jobCategoryCounts={jobCategoryCounts}
         jobWorkModeCount={jobWorkModeCount} countJobContactType={countJobContactType} countJobEmploymentType={countJobEmploymentType}
         countJobSalaryPeriod={countJobSalaryPeriod} publicationDate={publicationDate} setPublicationDate={setPublicationDate}
          publicationDateCounts={publicationDateCounts} salary={salary} setSalary={setSalary} salaryType={salaryType} 
          setSalaryType={setSalaryType} selectedSalaryPeriod={selectedSalaryPeriod} setSelectedSalaryPeriod={setSelectedSalaryPeriod}
          countJobSalary={countJobSalary} currency={currency} setCurrency={setCurrency}/>
 
           <div className="searcher">
            <form  role="search" onSubmit={(e) => {
            e.preventDefault(); setKeyword(keywordInput); setLocations(locationInput); setPage(0);
          }}>
          <input  type="search" placeholder="Job title, company, or keyword"  value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}/>
          <input  type="search" placeholder="location" value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}/>
          <button  type="submit">Search</button>
          </form>
         </div>

       
          {message && (
          <div className="notifications">
            <h1>{message}</h1>
         </div>
          )}     

            <div className="card-container">
             {jobs.map(job => {
            const employerOwner = user?.employerDto?.id === job?.employerDto?.id;
            
    return(     
      

           
                <div className="card"   key={job.id} onClick={() => navigate(`/jobs/${job.id}`)}
                style={{cursor : "pointer"}}>
                   {job.picture && (
                   <img src={`data:${job.pictureContentType};base64,${job.picture}`}  alt="No Image"/>
                    )}
                   
  <div className="card-body">

     {user && (Admin || employerOwner) && (
    <div className="operations">
     <Link to={`/update-job/${job.id}`} onClick={(e) => {e.stopPropagation()}}><Pencil size={22}/></Link>
     <button  type="button" 
      onClick={(e) => {e.stopPropagation();softDelete(job.id)}}className="delete"><Trash2 size={22}/></button>
    </div>     
    )}
     <button type="button" className="save" onClick={(e) => {e.stopPropagation();saveJobOffer(job?.id);
      setIsSaved(prev => {
        const update = new Set(prev);
        update.has(job.id) ? update.delete(job.id) : update.add(job.id);
        return update;
      });
      setTimeout(() => {
        setMessage("");
      },2000);
     }}><Star size={22}  fill={isSaved.has(job.id) ? "yellow" : "none"} color={isSaved.has(job.id) ? "#EAB308" : "currentColor"}/></button>

     
     <div className="job-info">
    <span  className="position"> {job.position}</span>
    <span >{job.salary} {job.salaryPeriod} {job.salaryType}</span>
    <span className="company">{job?.companyName}</span>
       <span className="location">{job.location}</span>
       </div>
       <div className="job-details">
       <span >{job.jobCategory}</span>
       <span >{job.employmentType}</span>
        <span >{job.contractType}</span>
        <span >{job.jobStart}</span>
        <span >{job.workMode}</span>
        </div>
        <hr/>
 
     <div className="publication">
     <span>Publication :{new Date(job.createAt).toLocaleDateString("pl-PL")}</span>
     </div>
     <div className="application">
      <span >{job.applicationType === "QUICK" && "QUICK Application"}</span>
      <span >{job.applicationType === "FORM" && "Form Application"}</span>
      </div>
         </div> 
  </div>
  );
})}
<div className="page">
<div className="d-flex align-items-center gap-2">
  <button  disabled={page === 0}
   onClick={() => setPage(page -1)}><ChevronLeft  size={25}/>
   </button>

    {Array.from({length : totalPages},(_, index) => (
      <button key={index} className={`btn ${page === index ? "btn-primary" : "btn-outline-secoundary"}`} onClick={() =>setPage(index)}>
        {index + 1}
      </button>
    ))}
   
   <button  disabled={page >= totalPages - 1}

   onClick={() => setPage(page +1)}><ChevronRight size={25}/></button>

</div>
</div>
</div>



        </div>
    );
}
export default Jobs;

