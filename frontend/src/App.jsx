import { BrowserRouter,Routes,Route } from "react-router-dom";
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

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/employee-registration" element={<EmployeeRegistration/>}/>
      <Route path="/employer-registration" element={<EmployerRegistration/>}/>
      <Route path="/login" element={<Login/>}/>
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
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;