
import { BrowserRouter,Routes,Route } from "react-router-dom";
import EmployeeRegsitration from "./components/EmployeeRegistration";
import EmployerRegsitration from "./components/EmployerRegistration";
import Login from "./components/Login";
import Jobs from "./components/jobs";
import VerifyEmail from "./components/Verify-Email";
import VerifyFiled from "./components/Verify-Failed.jsx";
import Resend from "./components/Resend.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

function App(){
  return(
   <BrowserRouter>
   <Routes>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/EmployeeRegistration" element={<EmployeeRegsitration/>}/>
    <Route path="/EmployerRegistration" element={<EmployerRegsitration/>}/>
     <Route path="/jobs" element={<Jobs/>}/>
    <Route path="/Verify-Email" element={<VerifyEmail/>}/>
    <Route path="/Verify-Failed" element={<VerifyFiled/>}/>
     <Route path="/Resend" element={<Resend/>}/>
       <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
       <Route path="/ResetPassword" element={<ResetPassword/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;