import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateJobOfferPage(){

    const [user,setUser] = useState("");
    const [message,setMessage] = useState("");
    const [file,setFile] = useState(null);
    const [data,setData] = useState({title : "",description: "",salary : "",location: "",contractType : [],workSchedule: "",employmentType: ""
        ,jobStart : "" ,workMode : [],duties : "",requirements: "",weOffer : "",jobCategory: "",salaryPeriod : "", salaryType : ""});

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

        const formData = new FormData();

        formData.append("request",new Blob([
            JSON.stringify(data)
        ],{type : "application/json"}));
        
        if(file){
            formData.append("file",file);
        }

// formData.append(
//     "request",
//     new Blob(
//         [JSON.stringify(data)],
//         { type: "application/json" }
//     )
// );
        const response = await fetch("http://localhost:8080/api/job",{
            method : "POST",
            headers : {Authorization : `Bearer ${token}`},
            body : formData
        
        });
  
       const text = await response.json();
        if(response.ok){
            setMessage(text.message);
        }else{
            setMessage(text.message)
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

         <select value={data.salaryType} onChange={(e) => setData({...data, salaryType : e.target.value})}>
          <option value="">Choose Salary Type</option>
          <option value="GROSS">GROSS</option>
          <option value="NET">NET</option>
         </select>

         <br/>

         <select value={data.salaryPeriod} onChange={(e) => setData({...data, salaryPeriod : e.target.value})}>
          <option value="">Choose Salary Period </option>
          <option value="HOUR">HOUR</option>
          <option value="DAY">DAY</option>
          <option value="WEEK">WEEK</option>
          <option value="MONTH">MONTH</option>
          <option value="YEAR">YEAR</option>
         </select>
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

         <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="onsite" checked={data.workMode.includes("ONSITE")} 
       onChange={(e) => {
            if (e.target.checked) { 
                setData({ ...data, workMode: [...data.workMode, "ONSITE"]  });
            } else {
                setData({ ...data, workMode: data.workMode.filter(mode => mode !== "ONSITE")
                });
            }
        }}/>
        <label className="form-check-label" htmlFor="onsite">
           ONSITE
        </label>
        </div>
        <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="HYBRID" checked={data.workMode.includes("HYBRID")}
         onChange={(e) => {
            if(e.target.checked){
                setData({...data,workMode: [...data.workMode, "HYBRID"]});
            }else{
                setData({...data,workMode: data.workMode.filter(mode => mode !== "HYBRID")});
            }
         }}/>
        <label className="form-check-label" htmlFor="HYBRID">
            HYBRID
        </label>
        </div>

        <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="REMOTE" checked={data.workMode.includes("REMOTE")}
         onChange={(e) => {
            if(e.target.checked){
                setData({...data,workMode : [...data.workMode,"REMOTE"]});
            }else{
                setData({...data,workMode : data.workMode.filter(mode => mode !== "REMOTE")});
            }
         }}/>
        <label className="form-check-label" htmlFor="REMOTE">
            REMOTE
        </label>
        </div>

         <br/>
          <select value={data.jobStart} onChange={(e) => setData({...data, jobStart : e.target.value})}>
          <option value="">Choose job Start</option>
          <option value="IMMEDIATELY">IMMEDIATELY</option>
          <option value="WITHIN_WEEK">WITHIN_WEEK</option>
          <option value="WITHIN_MONTH">WITHIN_MONTH</option>
          <option value="TO_BE_AGREED">TO_BE_AGREED</option>
         </select>
         <br/>

 <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="EMPLOYMENT_CONTRACT" checked={data.contractType.includes("EMPLOYMENT_CONTRACT")}
         onChange={(e) => {
            if(e.target.checked){
                setData({...data,contractType : [...data.contractType,"EMPLOYMENT_CONTRACT"]});
            }else{
                setData({...data,contractType : data.contractType.filter(mode => mode !== "EMPLOYMENT_CONTRACT")});
            }
         }}/>
        <label className="form-check-label" htmlFor="EMPLOYMENT_CONTRACT">
            EMPLOYMENT_CONTRACT
        </label>
        </div> 

         <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="B2B" checked={data.contractType.includes("B2B")}
         onChange={(e) => {
            if(e.target.checked){
                setData({...data,contractType : [...data.contractType,"B2B"]});
            }else{
                setData({...data,contractType : data.contractType.filter(mode => mode !== "B2B")});
            }
         }}/>
        <label className="form-check-label" htmlFor="B2B">
            B2B
        </label>
        </div> 

         <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="MANDATE_CONTRACTB2B" checked={data.contractType.includes("MANDATE_CONTRACTB2B")}
         onChange={(e) => {
            if(e.target.checked){
                setData({...data,contractType : [...data.contractType,"MANDATE_CONTRACT"]});
            }else{
                setData({...data,contractType : data.contractType.filter(mode => mode !== "MANDATE_CONTRACT")});
            }
         }}/>
        <label className="form-check-label" htmlFor="MANDATE_CONTRACT">
            MANDATE_CONTRACTB2B
        </label>
        </div> 

              <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="SPECIFIC_WORK_CONTRACT" checked={data.contractType.includes("SPECIFIC_WORK_CONTRACT")}
         onChange={(e) => {
            if(e.target.checked){
                setData({...data,contractType : [...data.contractType,"SPECIFIC_WORK_CONTRACT"]});
            }else{
                setData({...data,contractType : data.contractType.filter(mode => mode !== "SPECIFIC_WORK_CONTRACT")});
            }
         }}/>
        <label className="form-check-label" htmlFor="SPECIFIC_WORK_CONTRACT">
            SPECIFIC_WORK_CONTRACT
        </label>
        </div> 

           <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="INTERNSHIP" checked={data.contractType.includes("INTERNSHIP")}
         onChange={(e) => {
            if(e.target.checked){
                setData({...data,contractType : [...data.contractType,"INTERNSHIP"]});
            }else{
                setData({...data,contractType : data.contractType.filter(mode => mode !== "INTERNSHIP")});
            }
         }}/>
        <label className="form-check-label" htmlFor="INTERNSHIP">
            INTERNSHIP
        </label>
        </div> 

             <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="APPRENTICESHIP" checked={data.contractType.includes("APPRENTICESHIP")}
         onChange={(e) => {
            if(e.target.checked){
                setData({...data,contractType : [...data.contractType,"APPRENTICESHIP"]});
            }else{
                setData({...data,contractType : data.contractType.filter(mode => mode !== "APPRENTICESHIP")});
            }
         }}/>
        <label className="form-check-label" htmlFor="APPRENTICESHIP">
            APPRENTICESHIP
        </label>
        </div> 

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

         <br/>
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files[0])}/>

         <br/>

       

         <button onClick={createJobOffer} className="btn btn-success" >Create Job Offer</button>
        </div>
    );
} 

export default CreateJobOfferPage;

  
   