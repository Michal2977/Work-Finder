import { BrowserRouter,Routes,Route } from "react-router-dom";
import EmployeeRegistration from "./components/EmployeeRegistration";
import EmployerRegistration from "./components/EmployerRegistration";
import Login from "./components/Login";
import Jobs from "./components/Jobs";
import VerifyEmail from "./components/VerifyEmail";
import VerifyFailed from "./components/VerifyFiled";
import ResendEmail from "./components/ResendEmail";

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
    </Routes>
    </BrowserRouter>
  );
}

export default App;