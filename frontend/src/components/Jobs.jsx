
import {useEffect ,useState} from "react";
import { data, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Jobs(){

    const [user,setUser] = useState(null);
    const [message,setMessage] = useState("");
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
 

      useEffect(() => {
        fetch("http://localhost:8080/api/jobs").then(response => response.json()).then(data => setJobs(data))
    },[]);
 
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
      }).then(response => response.json()).then(data => setUser(data));
    },[]);

    const Employee = user?.roleDto?.some(role => role.role === "EMPLOYEE");
    const employeeName = `${user?.employeeDto?.firstName ?? ""} ${user?.employeeDto?.lastName ?? ""}`.trim();
    const displayName = employeeName !== "" ? employeeName : user?.displayName;

    const Admin = user?.roleDto?.some(role => role.role === "ADMIN");

    const Employer = user?.roleDto?.some(role => role.role === "EMPLOYER");

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
     

    return(
        <div>
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
     <button  type="button" onClick={() => softDelete(job.id)}className="btn btn-danger">Deelete Job</button>
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
           
             {user && (Employee || Employer || Admin) && (
                <div>
                    <button onClick={logout} className="btn btn-danger">Logout</button>
                    <Link to={"/contact"}>Contact with Us</Link>
                    <Link to={"/account-information"}>Account</Link>
                </div>
             )}
            {user && Employee && (
                <div>
                  <h1>employee</h1>
                  <h1>{displayName}</h1>
                <h1>{user.email}</h1>
                </div>
                
            )}

              {Admin && (
                <div>
                  <Link to={"/deleted-jobs"}>Deleted Offer</Link>
                  </div>
              )}
            {user && (Employer || Admin) && (
                <div>
                    <h1>Employer</h1>
                    <Link to={"/expired-jobs"}>Expired Jobs</Link>
                    <Link to={"/create-job"}>Create a Job Offer</Link>
                    <h1>{user?.employerDto?.firstName || ""}</h1>
                     <h1>{user?.employerDto?.lastName || ""}</h1>
                </div>
            )}
        </div>
    );
}
export default Jobs;


