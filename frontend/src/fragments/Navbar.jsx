import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";
import "../styles/navbar.css";

function Navbar({ user, Employee, Employer, Admin, logout,displayName, amountsOfReports,deletedJobs
  ,amountOfDeletedJobs,amountsOfFavoriteJobs,amountOfAllExpiresJob,amountOfEmployerExpiresJob,jobsEmployerOwner
}){
    return(
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    
    <div className="name">
      <Link to={"/jobs"}>
          <BriefcaseBusiness className="logo"/>
         <span className="work">Work</span><span className="finder">Finder</span>
      </Link>
    </div>
      <div className="select">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {!user && (
              <span>My Account</span>
            )}
           {user && (Employee || Employer || Admin) && (           
             <span>{displayName}</span>      
           )}         
          </a>
          <ul className="dropdown-menu">
             {user && (Employee || Employer || Admin) && (
              <div>
            <li>
              {user && Admin && (
             <Link className="dropdown-item"  to="/my-reports"> My Reports ({amountsOfReports})  </Link>
              )}
            </li>
            
             <li>
              {user && (Employee || Employer) && (
               <Link className="dropdown-item"   to="/my-reports">
               My Reports
              </Link>
              )}
            
            </li>
            <li>
              <Link className="dropdown-item"   to="/contact">
               Contact with Us
              </Link>
            </li>
            <li>
          
            </li>
            <li>
              <Link className="dropdown-item"  to="/account-information">
                  Account
              </Link>
            </li>
                <hr className="dropdown-divider" />
          <li className="nav-item">
           <button onClick={logout} ><span>Logout</span></button>
          </li>
               </div>
             )}
             {!user && (
              <div>
                    <li>
              <Link className="dropdown-item"  to="/login">
                  Login
              </Link>
            </li>
             <li>
              <Link className="dropdown-item"  to="/employee-registration">
                  Register As Employee
              </Link>
            </li>
             <li>
              <Link className="dropdown-item"  to="/employer-registration">
                  Register As Employer
              </Link>
            </li>
              </div>
             )}
          </ul>
        </li>
        </div>
      <ul className="navbar-nav nav-links">
        {user && (Employee || Employer || Admin) && (
          <>
          <li className="nav-item">
            <Link to={"/saved-jobs"}>Saved Jobs: {amountsOfFavoriteJobs}</Link>
          </li>
          {user && Employee && (
          <>
          <li className="nav-item">
            <Link to={"/employee-applications"}>My Applications</Link>
          </li>
            <li className="nav-item">
            <Link to={"/add-cv"}>Add Resume</Link>
            </li>
        
            </>
          )}
          {user && Employer && (
            <>
             <li className="nav-item">
            <Link to={"/create-job"}>Create a Job Offer</Link>
             </li>
              <li className="nav-item">
            <Link to={"/expired-jobs"}>Expired Jobs: {amountOfEmployerExpiresJob}</Link>
             </li>
              <li className="nav-item">
            <Link to={"/employer-jobs"}>My Jobs Offer: {jobsEmployerOwner}</Link>
             </li>
            </>
           
          )}
          {user && Admin && (
            <>
             <li className="nav-item">
            <Link to={"/create-job"}>Create a Job Offer</Link>
             </li>
              <li className="nav-item">
            <Link to={"/expired-jobs"}>Expired Jobs: {amountOfAllExpiresJob}</Link>
             </li>
            <li className="nav-item">
            <Link to={"/deleted-jobs"}>Deleted Jobs: {amountOfDeletedJobs}</Link>
             </li>
            </>
          )}       
          </>
        )}
 
      </ul>
      </div>
   
 
</nav>
    )
}

export default Navbar;
