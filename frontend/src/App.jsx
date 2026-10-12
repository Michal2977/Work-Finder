import { BrowserRouter,Routes,Route, useNavigate } from "react-router-dom";
import EmployeeRegistration from "./components/EmployeeRegistration";
import EmployerRegistration from "./components/EmployerRegistration";
import Login from "./components/Login";
import Jobs from "./components/Jobs";
import VerifyEmail from "./components/VerifyEmail";
import VerifyFailed from "./components/VerifyFailed";
import ResendEmail from "./components/ResendEmail";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import ResetPasswordSend from "./components/ResetPasswordSend";
import OAuth2Success from "./components/OAuth2Success";
import AccountInformation from "./components/AccountInformation";
import CreateJobOfferPage from "./components/CreateJobOffer";
import JobDetails from "./components/JobDetails";
import UpdateJob from "./components/UpdateJob";
import ExpiredJobs from "./components/ExpiredJobs";
import DeletedJobs from "./components/DeletedJobs";
import Contact from "./components/Contact";
import MyReports from "./components/MyReports";
import ReportDetails from "./components/ReportDetails";
import SavedJobs from "./components/SavedJobs";
import AddCv from "./components/AddCv";
import EmployerJobs from "./components/EmployerJobs";
import FormApplication from "./components/FormApplication";
import ApplicationSubmitted from "./components/ApplicationSubmitted";
import FindEmployeeAplications from "./components/FindEmployeeApplications";
import AllApplications from "./components/AllApplications";
import Navbar from "./fragments/Navbar";
import { useEffect, useState } from "react";


function App(){
  return(
  <BrowserRouter>
    <AppContent/>
  </BrowserRouter>

  );
}

   function AppContent(){

     const [user,setUser] = useState(null);
     const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const Admin = user?.roleDto?.some(role => role.role === "ADMIN");
    const Employee = user?.roleDto?.some(role => role.role === "EMPLOYEE");
    const Employer = user?.roleDto?.some(role => role.role === "EMPLOYER");

    const employeeName = `${user?.employeeDto?.firstName ?? ""} ${user?.employeeDto?.lastName ?? ""}`.trim();
    const displayName = employeeName !== "" ? employeeName : user?.displayName || "My Account";

        const [amountsOfReports,setamountOfReports] = useState(0);
        const [amountOfDeletedJobs,setAmountsOfDeletedJobs] = useState(0);
        const [amountsOfFavoriteJobs,setAmountsOfFavoriteJobs] = useState(0);
    
        const [amountOfAllExpiresJob,setAmountsOfAllExpiresJob] = useState(0);
        const [amountOfEmployerExpiresJob,setAmountsOfEmployerExpiresJobs] = useState(0);
        const [jobsEmployerOwner,setJobsEmployerOwner] = useState(0);


        const fetchUser = async() => {
  
          const token = localStorage.getItem("token");
          if(!token){return;}

        const response =  await fetch("http://localhost:8080/api/auth/account-information",{
        headers : {Authorization : `Bearer ${token}`}
       
      });
      if(response.ok){
        if(!token){setUser(null); return;}
        const data = await response.json();
        setUser(data);
      }
    };
     useEffect(() => {
        fetchUser();
      },[]);

        useEffect(() => {
 
    const token = localStorage.getItem("token");
    if(!token){return;}
    if(!Employer && !user){return;}

      fetch("http://localhost:8080/api/amounts-of-employer-expires-job",{
      headers : {Authorization : `Bearer ${token}`}
    }).then(response => response.json()).then(data => setAmountsOfEmployerExpiresJobs(data));

    fetch("http://localhost:8080/api/amounts-of-employer-jobs",{
      headers : {Authorization : `Bearer ${token}`}
    }).then(response => response.json()).then(data => setJobsEmployerOwner(data));
   },[Employer,user])
      
    

    const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
        navigate("/login" , {state : {message : "You have been successfully logged out."}});
   }
   
   useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token &&  !user  ){return;}

     fetch("http://localhost:8080/api/amount-of-favorite-jobs",{
      headers : {Authorization : `Bearer ${token}`}
    }).then(response => response.json()).then(data => setAmountsOfFavoriteJobs(data));
   },[user]);

     useEffect(() => {
   const token = localStorage.getItem("token");
   if(!Admin){return;}
    fetch("http://localhost:8080/api/amounts-of-reports",{
          headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setamountOfReports(data));

        fetch("http://localhost:8080/api/amounts-of-all-expires-job",{
          headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setAmountsOfAllExpiresJob(data));

            fetch("http://localhost:8080/api/amount-of-deleted-jobs",{
      headers : {Authorization : `Bearer ${token}`}
    }).then(response => response.json()).then(data => setAmountsOfDeletedJobs(data));

   },[Admin]);
   
  return(
 
    <>
          <Navbar user={user} Employee={Employee} Employer={Employer} Admin={Admin} logout={logout} displayName={displayName}
         amountsOfReports={amountsOfReports}    amountOfDeletedJobs={amountOfDeletedJobs} amountsOfFavoriteJobs={amountsOfFavoriteJobs}
         amountOfAllExpiresJob={amountOfAllExpiresJob} amountOfEmployerExpiresJob={amountOfEmployerExpiresJob} 
         jobsEmployerOwner={jobsEmployerOwner}/>
    <Routes>
      <Route path="/employee-registration" element={<EmployeeRegistration/>}/>
      <Route path="/employer-registration" element={<EmployerRegistration/>}/>
      <Route path="/login" element={<Login fetchUser={fetchUser}/>}/>
      <Route path="/jobs" element={<Jobs/>}/>

      <Route path="/verify-email" element={<VerifyEmail/>}/>
      <Route path="/verify-failed" element={<VerifyFailed/>}/>
      <Route path="/resend-email" element={<ResendEmail/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password-send" element={<ResetPasswordSend/>}/>
      <Route path="/oauth2/success" element={<OAuth2Success/>}/>
      <Route path="/account-information" element={<AccountInformation/>}/>
      <Route path="create-job" element={<CreateJobOfferPage/>}/>
      <Route path="/jobs/:id" element={<JobDetails/>}/>
      <Route path="/update-job/:id" element={<UpdateJob/>}/>
      <Route path="/expired-jobs" element={<ExpiredJobs/>}/>
      <Route path="/deleted-jobs" element={<DeletedJobs/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/my-reports" element={<MyReports/>}/>
      <Route path="/reports/:id" element={<ReportDetails/>}/>
      <Route path="/saved-jobs" element={<SavedJobs/>}/>
      <Route path="/add-cv" element={<AddCv/>}/>
       <Route path="/employer-jobs" element={<EmployerJobs/>}/>
      <Route path="/form-application/:id" element={<FormApplication/>}/> 
      <Route path="/application-submitted" element={<ApplicationSubmitted/>}/>
      <Route path="/employee-applications" element={<FindEmployeeAplications/>}/>
      <Route path="/all-applications/:id" element={<AllApplications/>}/>
      
    </Routes>
    </>
  );
}


export default App;