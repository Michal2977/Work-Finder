import { useState ,useEffect} from "react";
import { data, Link } from "react-router-dom";



function ExpiredJobs(){

    const [user,setUser] = useState(null);
    const [jobs,setJobs] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        
        fetch("http://localhost:8080/api/expired-jobs",{
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setJobs(data));

        fetch("http://localhost:8080/api/jobs",{
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setUser(data));
    },[]);

    return(
    <div>
        {jobs.map(job => (
            <div className="card" width={"18rem"} key={job.id}>
                {job.picture &&  (
                <img src={`data:${job.pictureContentType};base64,${job.picture}`} width={"200px"} height={"200px"} alt="no image"/>
                )}

                <div className="card-body">
                     <h1>The offer has expired</h1>
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
    </div>
    );
    
}

export default ExpiredJobs;