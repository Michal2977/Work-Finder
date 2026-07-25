
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateJobOfferPage(){

    const [user,setUser] = useState("");
    const [message,setMessage] = useState("");
    const [data,setData] = useState({title : "",description: "",salary : "",location: "",contractType : "",workSchedule: "",employmentType: ""
        ,jobStart : "" ,workMode : "",duties : "",requirements: "",weOffer : "",jobCategory: ""});

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token){
            return;
        }

        fetch("http://localhost:8080/api/job",{
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(data => setUser(data));
    },[]);

    const createJobOffer = async() => {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8080/api/job",{

            method : "POST",
            headers : {"Content-Type" : "application/json", "Authorization" : `Bearer ${token}`},
            body : JSON.stringify(data)
        });

        const text  = await response.json();
        console.log(response.status);
console.log(text);
        if(response.ok){
            setMessage(text.message);
        }
    }


    return(
        <div>
            {message && <h1>{message}</h1>}

         <input type="text" placeholder="title" value={data.title}
         onChange={(e) => setData({...data,title : e.target.value})}/>
         <br/>

         <input type="text" placeholder="description" value={data.description}
         onChange={(e) => setData({...data,description : e.target.value})}/>
         <br/>

         <input type="text" placeholder="salary" value={data.salary}
         onChange={(e) => setData({...data,salary : e.target.value})}/>
         <br/>

         <input type="text" placeholder="location" value={data.location}
         onChange={(e) => setData({...data,location : e.target.value})}/>
         <br/>

         <input type="text" placeholder="work schedule" value={data.workSchedule}
         onChange={(e) => setData({...data,workSchedule : e.target.value})}/>
         <br/>

         <input type="text" placeholder="duties" value={data.duties}
         onChange={(e) => setData({...data,duties : e.target.value})}/>
         <br/>

         <input type="text" placeholder="requirements" value={data.requirements}
         onChange={(e) => setData({...data,requirements : e.target.value})}/>
         <br/>

         <input type="text" placeholder="weOffer" value={data.weOffer}
         onChange={(e) => setData({...data,weOffer : e.target.value})}/>
         <br/>

         <select value={data.workMode} onChange={(e) => setData({...data, workMode : e.target.value})}>
          <option value="">Choose work Mode</option>
          <option value="ONSITE">ONSITE</option>
          <option value="HYBRID">HYBRID</option>
          <option value="REMOTE">REMOTE</option>
         </select>
         <br/>

          <select value={data.jobStart} onChange={(e) => setData({...data, jobStart : e.target.value})}>
          <option value="">Choose job Start</option>
          <option value="IMMEDIATELY">IMMEDIATELY</option>
          <option value="WITHIN_WEEK">WITHIN_WEEK</option>
          <option value="WITHIN_MONTH">WITHIN_MONTH</option>
          <option value="TO_BE_AGREED">TO_BE_AGREED</option>
         </select>
         <br/>

         <select value={data.contractType} onChange={(e) => setData({...data, contractType : e.target.value})}>
          <option value="">Choose contract Type</option>
          <option value="EMPLOYMENT_CONTRACT">EMPLOYMENT_CONTRACT</option>
          <option value="B2B">B2B</option>
          <option value="MANDATE_CONTRACT">MANDATE_CONTRACT</option>
          <option value="SPECIFIC_WORK_CONTRACT">SPECIFIC_WORK_CONTRACT</option>
          <option value="INTERNSHIP">INTERNSHIP</option>
          <option value="APPRENTICESHIP">APPRENTICESHIP</option>
         </select>
         <br/>

         <select value={data.employmentType} onChange={(e) => setData({...data, employmentType : e.target.value})}>
          <option value="">Choose employment Type</option>
          <option value="FULL_TIME">FULL_TIME</option>
          <option value="PART_TIME">PART_TIME</option>
          <option value="CONTRACT">CONTRACT</option>
          <option value="TEMPORARY">TEMPORARY</option>
         </select>
         <br/>

         <select value={data.jobCategory} onChange={(e) => setData({...data, jobCategory : e.target.value})}>
          <option value="">Choose job Category</option>
          <option value="IT">IT</option>
          <option value="PHYSICAL_WORK">PHYSICAL_WORK</option>
          <option value="OFFICE_WORK">OFFICE_WORK</option>
          <option value="SALES">SALES</option>
          

          <option value="CUSTOMER_SERVICE">CUSTOMER_SERVICE</option>
          <option value="FINANCE">FINANCE</option>
          <option value="ACCOUNTING">ACCOUNTING</option>
          <option value="HR">HR</option>

          <option value="MARKETING">MARKETING</option>
          <option value="LOGISTICS">LOGISTICS</option>
          <option value="TRANSPORT">TRANSPORT</option>
          <option value="PRODUCTION">PRODUCTION</option>

          <option value="CONSTRUCTION">CONSTRUCTION</option>
          <option value="HEALTHCARE">HEALTHCARE</option>
          <option value="EDUCATION">EDUCATION</option>
          <option value="GASTRONOMY">GASTRONOMY</option>

          <option value="ENGINEERING">ENGINEERING</option>
          <option value="SECURITY">SECURITY</option>
          <option value="BEAUTY">BEAUTY</option>
          <option value="OTHER">OTHER</option>
         </select>

         <button onClick={createJobOffer}>Create Job Offer</button>
        </div>
    );
}

export default CreateJobOfferPage;

  
   