import { Link } from "react-router-dom";


function Navbar({ user, Employee, Employer, Admin, logout,displayName, amountsOfReports,deletedJobs
  ,amountOfDeletedJobs
}){
    return(
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to={"/jobs"}>Navbar</Link>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       

        <li className="nav-item">
           <button onClick={logout} className="btn btn-danger">Logout</button>
        </li>

 {user && (Employee || Employer || Admin) && (
      
      <div>
          {Employee && (
                <div>
                  <h1>employee</h1>
                  <h1>{displayName}</h1>
                <h1>{user.email}</h1>
                </div>
                
            )}

             {Admin && (
             <>      
             <div>
              <h1>Number of reports: {amountsOfReports}</h1>
              <h1>Number of Deleted Jobs {amountOfDeletedJobs}</h1>
            
             </div>
                <div>
                  <Link to={"/deleted-jobs"}>Deleted Offer</Link>
                  </div>
                  </>
              )}

                  {user && (Employer || Admin) && (
                <div>
                    <Link to={"/expired-jobs"}>Expired Jobs</Link>
                    <Link to={"/create-job"}>Create a Job Offer</Link>
                    <h1>{user?.employerDto?.firstName || ""}</h1>
                     <h1>{user?.employerDto?.lastName || ""}</h1>
                </div>
            )}

        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown
          </a>

          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item"  to="/my-reports">
              My Reports
              </Link>
            </li>
            <li>
              <Link className="dropdown-item"   to="/contact">
               Contact with Us
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item"  to="/account-information">
                  Account
              </Link>
            </li>
          </ul>
        </li>
        </div>
          )}
      </ul>
    </div>
  </div>
</nav>
    )
}

export default Navbar;
