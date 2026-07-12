import { BrowserRouter,Routes,Route } from "react-router-dom";
import EmployeeRegistration from "./components/EmployeeRegistration";
import EmployerRegistration from "./components/EmployerRegistration";
import Login from "./components/Login";
import Jobs from "./components/Jobs";

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/employee-registration" element={<EmployeeRegistration/>}/>
      <Route path="/employer-registration" element={<EmployerRegistration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/jobs" element={<Jobs/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;