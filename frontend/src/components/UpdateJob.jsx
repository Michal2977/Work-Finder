
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"
function UpdateJob(){

    const [user,setUser]  = useState(null);
    const navigate = useNavigate();
    const [file,setFile] = useState(null);
    const [message,setMessage] = useState("");
    const [job,setJob] = useState({position : "",description: "" ,salary : "",location: ""
        ,contractType : [],workSchedule:"",employmentType: ""
        ,jobStart : "" ,workMode : [],duties : "",requirements: "",
        weOffer : "",jobCategory: "",salaryPeriod : "", salaryType : ""
    ,companyName : "",shiftSystem : "",workingHours :"",nightShift: null,aboutCompany : "",
    salarySystem : "",benefit : [],phoneNumber : ""});
    const {id} = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8080/api/auth/account-information", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => setUser(data));
}, []);

    useEffect(() => {

        const token = localStorage.getItem("token");
        if(!token){return;}

              fetch(`http://localhost:8080/api/update-job/${id}`,{
                headers : {Authorization : `Bearer ${token}`}
              }).then(response => response.json()).then(data => setJob(data))
    },[id]);

    const updateJobOffer = async(e) => {
         e.preventDefault();

        const token = localStorage.getItem("token");
        if(!token){return;}

        const request = {...job,
            description: job.description || null,
    workSchedule: job.workSchedule || null,
    duties: job.duties || null,
    requirements: job.requirements || null,
    weOffer: job.weOffer || null,
    shiftSystem: job.shiftSystem || null,
    workingHours: job.workingHours || null,
    aboutCompany: job.aboutCompany || null,
    salarySystem: job.salarySystem || null,
    phoneNumber: job.phoneNumber || null
        };
        
        const formData = new FormData();
        formData.append("request",new Blob([
          JSON.stringify(request)
        ],{type : "application/json"}));
        
        if(file) {
            formData.append("file",file);
        }
        const response  = await fetch(`http://localhost:8080/api/update-job/${id}`,{
         method : "PUT",
         headers : {Authorization : `Bearer ${token}`},
         body : formData
        });

        const text  =  await response.json();
    
        if(response.ok){
            setJob(text.jobDto);
            setMessage(text.message);
        }else{
            setMessage(text.message);
        }
    }



    return(
        <form onSubmit={updateJobOffer}>
   <div>
       {message && <h1>{message}</h1>}
       <h1>{user?.email}</h1>
       <br/>
       <input type="text" placeholder="position" value={job.position || ""} required
       onChange={(e) => setJob({ ...job,position : e.target.value})} minLength={3} maxLength={50}/>
       <br/>
       <input type="text" placeholder="comapny Name " value={job.companyName || ""} minLength={2} maxLength={100}
       onChange={(e) => setJob({...job,companyName : e.target.value})}/>
       <br/>
       <select value={job.jobCategory} onChange={(e) => setJob({...job, jobCategory : e.target.value})} required>
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
         <input type="text" placeholder="description" value={job.description || ""} minLength={10} maxLength={5000}
         onChange={(e) => setJob({...job,description : e.target.value})}/>
         <br/>
         <input type="number" placeholder="salary" value={job.salary} min={"0"} max={"99999999.99"} step={"0.01"}
         onChange={(e) => setJob({...job,salary : e.target.value})}/>
         <br/>
         <select value={job.salaryType} onChange={(e) => setJob({...job, salaryType : e.target.value})} required>
          <option value="">Choose Salary Type</option>
          <option value="GROSS">GROSS</option>
          <option value="NET">NET</option>
         </select>
         <br/>

         <select value={job.salaryPeriod} onChange={(e) => setJob({...job, salaryPeriod : e.target.value})} required>
          <option value="">Choose Salary Period </option>
          <option value="HOUR">HOUR</option>
          <option value="DAY">DAY</option>
          <option value="WEEK">WEEK</option>
          <option value="MONTH">MONTH</option>
          <option value="YEAR">YEAR</option>
         </select>
         <br/>
         <input type="text" placeholder="salary System" value={job.salarySystem} minLength={5} maxLength={100}
         onChange={(e) => setJob({...job,salarySystem : e.target.value })}/>
         <br/>

         <input type="text" placeholder="location" value={job.location} minLength={2} maxLength={40} required
         onChange={(e) => setJob({...job,location : e.target.value})}/>
         <br/>

          <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="onsite" checked={job.workMode.includes("ONSITE")} 
       onChange={(e) => {
            if (e.target.checked) { 
                setJob({ ...job, workMode: [...job.workMode, "ONSITE"]  });
            } else {
                setJob({ ...job, workMode: job.workMode.filter(mode => mode !== "ONSITE")
                });
            }
        }}/>
        <label className="form-check-label" htmlFor="onsite">
           ONSITE
        </label>
        </div>
        <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="HYBRID" checked={job.workMode.includes("HYBRID")}
         onChange={(e) => {
            if(e.target.checked){
                setJob({...job,workMode: [...job.workMode, "HYBRID"]});
            }else{
                setJob({...job,workMode: job.workMode.filter(mode => mode !== "HYBRID")});
            }
         }}/>
        <label className="form-check-label" htmlFor="HYBRID">
            HYBRID
        </label>
        </div>

        <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="REMOTE" checked={job.workMode.includes("REMOTE")}
         onChange={(e) => {
            if(e.target.checked){
                setJob({...job,workMode : [...job.workMode,"REMOTE"]});
            }else{
                setJob({...job,workMode : job.workMode.filter(mode => mode !== "REMOTE")});
            }
         }}/>
        <label className="form-check-label" htmlFor="REMOTE">
            REMOTE
        </label>
        </div>
        <br/>
        <select value={job.employmentType} onChange={(e) => setJob({...job, employmentType : e.target.value})} required>
          <option value="">Choose employment Type</option>
          <option value="FULL_TIME">FULL_TIME</option>
          <option value="PART_TIME">PART_TIME</option>
          <option value="CONTRACT">CONTRACT</option>
          <option value="TEMPORARY">TEMPORARY</option>
         </select>

          <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="EMPLOYMENT_CONTRACT" checked={job.contractType.includes("EMPLOYMENT_CONTRACT")}
         onChange={(e) => {
            if(e.target.checked){
                setJob({...job,contractType : [...job.contractType,"EMPLOYMENT_CONTRACT"]});
            }else{
                setJob({...job,contractType : job.contractType.filter(mode => mode !== "EMPLOYMENT_CONTRACT")});
            }
         }}/>
        <label className="form-check-label" htmlFor="EMPLOYMENT_CONTRACT">
            EMPLOYMENT_CONTRACT
        </label>
        </div> 

         <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="B2B" checked={job.contractType.includes("B2B")}
         onChange={(e) => {
            if(e.target.checked){
                setJob({...job,contractType : [...job.contractType,"B2B"]});
            }else{
                setJob({...job,contractType : job.contractType.filter(mode => mode !== "B2B")});
            }
         }}/>
        <label className="form-check-label" htmlFor="B2B">
            B2B
        </label>
        </div> 

         <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="MANDATE_CONTRACTB2B" checked={job.contractType.includes("MANDATE_CONTRACT")}
         onChange={(e) => {
            if(e.target.checked){
                setJob({...job,contractType : [...job.contractType,"MANDATE_CONTRACT"]});
            }else{
                setJob({...job,contractType : job.contractType.filter(mode => mode !== "MANDATE_CONTRACT")});
            }
         }}/>
        <label className="form-check-label" htmlFor="MANDATE_CONTRACT">
            MANDATE_CONTRACT
        </label>
        </div> 

              <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="SPECIFIC_WORK_CONTRACT" checked={job.contractType.includes("SPECIFIC_WORK_CONTRACT")}
         onChange={(e) => {
            if(e.target.checked){
                setJob({...job,contractType : [...job.contractType,"SPECIFIC_WORK_CONTRACT"]});
            }else{
                setJob({...job,contractType : job.contractType.filter(mode => mode !== "SPECIFIC_WORK_CONTRACT")});
            }
         }}/>
        <label className="form-check-label" htmlFor="SPECIFIC_WORK_CONTRACT">
            SPECIFIC_WORK_CONTRACT
        </label>
        </div> 

           <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="INTERNSHIP" checked={job.contractType.includes("INTERNSHIP")}
         onChange={(e) => {
            if(e.target.checked){
                setJob({...job,contractType : [...job.contractType,"INTERNSHIP"]});
            }else{
                setJob({...job,contractType : job.contractType.filter(mode => mode !== "INTERNSHIP")});
            }
         }}/>
        <label className="form-check-label" htmlFor="INTERNSHIP">
            INTERNSHIP
        </label>
        </div> 

             <div className="form-check">
         <input className="form-check-input" type="checkbox"  id="APPRENTICESHIP" checked={job.contractType.includes("APPRENTICESHIP")}
         onChange={(e) => {
            if(e.target.checked){
                setJob({...job,contractType : [...job.contractType,"APPRENTICESHIP"]});
            }else{
                setJob({...job,contractType : job.contractType.filter(mode => mode !== "APPRENTICESHIP")});
            }
         }}/>
        <label className="form-check-label" htmlFor="APPRENTICESHIP">
            APPRENTICESHIP
        </label>
        </div> 

        <br/>
        <input type="text" placeholder="work schedule" value={job.workSchedule || ""} minLength={5} maxLength={40}
         onChange={(e) => setJob({...job,workSchedule : e.target.value})}/>
         <br/>
         <input type="text" placeholder="working Hours " value={job.workingHours || ""} minLength={5} maxLength={40}
         onChange={(e) => setJob({...job,workingHours : e.target.value})}/>
         <br/>
         <input type="text" placeholder="shiftSystem" value={job.shiftSystem || ""} minLength={3} maxLength={50}
         onChange={(e) => setJob({...job,shiftSystem : e.target.value})}/>
         <br/>
         <p>mozliwosc pracy w godinach nocnych ? </p>
         <div className="form-check">
         <input className="form-check-input" type="radio" id="nightShiftYes" name="nightShift" checked={job.nightShift === true}
         onChange={() => setJob({...job,nightShift : true})}/>
        <label className="form-check-label" htmlFor="nightShiftYes">
          Yes
         </label> 
         </div>
         <div className="form-check">
         <input className="form-check-input" type="radio" name="nightShift" id="nightShiftNo" checked={job.nightShift === false}
         onChange={() => setJob({...job,nightShift : false})}/>
         <label className="form-check-label" htmlFor="nightShiftNo">
         No
        </label>
        </div>

         <br/>
         <select value={job.jobStart} onChange={(e) => setJob({...job, jobStart : e.target.value})}>
          <option value="">Choose job Start</option>
          <option value="IMMEDIATELY">IMMEDIATELY</option>
          <option value="WITHIN_WEEK">WITHIN_WEEK</option>
          <option value="WITHIN_MONTH">WITHIN_MONTH</option>
          <option value="TO_BE_AGREED">TO_BE_AGREED</option>
         </select>
         <br/>
         <input
    type="text"
    placeholder="duties"
    value={job.duties || ""}
    minLength={10}
    maxLength={5000}
    onChange={(e) => setJob({...job, duties: e.target.value})}
/>

<input
    type="text"
    placeholder="requirements"
    value={job.requirements || ""}
    minLength={10}
    maxLength={5000}
    onChange={(e) => setJob({...job, requirements: e.target.value})}
/>
<br/>

<input
    type="text"
    placeholder="we Offer"
    value={job.weOffer || ""}
    minLength={10}
    maxLength={5000}
    onChange={(e) => setJob({...job, weOffer: e.target.value})}
/>
<br/>

<div className="form-check">
    <input
        className="form-check-input"
        type="checkbox"
        id="PRIVATE_MEDICAL_CARE"
        checked={(job.benefit || []).includes("PRIVATE_MEDICAL_CARE")}
        onChange={(e) => {
            if (e.target.checked) {
                setJob({
                    ...job,
                    benefit: [...(job.benefit || []), "PRIVATE_MEDICAL_CARE"]
                });
            } else {
                setJob({
                    ...job,
                    benefit: (job.benefit || []).filter(
                        mode => mode !== "PRIVATE_MEDICAL_CARE"
                    )
                });
            }
        }}
    />
    <label className="form-check-label" htmlFor="PRIVATE_MEDICAL_CARE">
        PRIVATE_MEDICAL_CARE
    </label>
</div>
<br/>

<div className="form-check">
    <input
        className="form-check-input"
        type="checkbox"
        id="MULTISPORT"
        checked={(job.benefit || []).includes("MULTISPORT")}
        onChange={(e) => {
            if (e.target.checked) {
                setJob({
                    ...job,
                    benefit: [...(job.benefit || []), "MULTISPORT"]
                });
            } else {
                setJob({
                    ...job,
                    benefit: (job.benefit || []).filter(
                        mode => mode !== "MULTISPORT"
                    )
                });
            }
        }}
    />
    <label className="form-check-label" htmlFor="MULTISPORT">
        MULTISPORT
    </label>
</div>
<br/>

<div className="form-check">
    <input
        className="form-check-input"
        type="checkbox"
        id="LIFE_INSURANCE"
        checked={(job.benefit || []).includes("LIFE_INSURANCE")}
        onChange={(e) => {
            if (e.target.checked) {
                setJob({
                    ...job,
                    benefit: [...(job.benefit || []), "LIFE_INSURANCE"]
                });
            } else {
                setJob({
                    ...job,
                    benefit: (job.benefit || []).filter(
                        mode => mode !== "LIFE_INSURANCE"
                    )
                });
            }
        }}
    />
    <label className="form-check-label" htmlFor="LIFE_INSURANCE">
        LIFE_INSURANCE
    </label>
</div>
<br/>

<div className="form-check">
    <input
        className="form-check-input"
        type="checkbox"
        id="REMOTE_WORK"
        checked={(job.benefit || []).includes("REMOTE_WORK")}
        onChange={(e) => {
            if (e.target.checked) {
                setJob({
                    ...job,
                    benefit: [...(job.benefit || []), "REMOTE_WORK"]
                });
            } else {
                setJob({
                    ...job,
                    benefit: (job.benefit || []).filter(
                        mode => mode !== "REMOTE_WORK"
                    )
                });
            }
        }}
    />
    <label className="form-check-label" htmlFor="REMOTE_WORK">
        REMOTE_WORK
    </label>
</div>
<br/>

<div className="form-check">
    <input
        className="form-check-input"
        type="checkbox"
        id="FLEXIBLE_HOURS"
        checked={(job.benefit || []).includes("FLEXIBLE_HOURS")}
        onChange={(e) => {
            if (e.target.checked) {
                setJob({
                    ...job,
                    benefit: [...(job.benefit || []), "FLEXIBLE_HOURS"]
                });
            } else {
                setJob({
                    ...job,
                    benefit: (job.benefit || []).filter(
                        mode => mode !== "FLEXIBLE_HOURS"
                    )
                });
            }
        }}
    />
    <label className="form-check-label" htmlFor="FLEXIBLE_HOURS">
        FLEXIBLE_HOURS
    </label>
</div>
<br/>

<div className="form-check">
    <input
        className="form-check-input"
        type="checkbox"
        id="TRAINING"
        checked={(job.benefit || []).includes("TRAINING")}
        onChange={(e) => {
            if (e.target.checked) {
                setJob({
                    ...job,
                    benefit: [...(job.benefit || []), "TRAINING"]
                });
            } else {
                setJob({
                    ...job,
                    benefit: (job.benefit || []).filter(
                        mode => mode !== "TRAINING"
                    )
                });
            }
        }}
    />
    <label className="form-check-label" htmlFor="TRAINING">
        TRAINING
    </label>
</div>
<br/>

<div className="form-check">
    <input
        className="form-check-input"
        type="checkbox"
        id="COMPANY_CAR"
        checked={(job.benefit || []).includes("COMPANY_CAR")}
        onChange={(e) => {
            if (e.target.checked) {
                setJob({
                    ...job,
                    benefit: [...(job.benefit || []), "COMPANY_CAR"]
                });
            } else {
                setJob({
                    ...job,
                    benefit: (job.benefit || []).filter(
                        mode => mode !== "COMPANY_CAR"
                    )
                });
            }
        }}
    />
    <label className="form-check-label" htmlFor="COMPANY_CAR">
        COMPANY_CAR
    </label>
</div>
<br/>

<div className="form-check">
    <input
        className="form-check-input"
        type="checkbox"
        id="MEAL_CARD"
        checked={(job.benefit || []).includes("MEAL_CARD")}
        onChange={(e) => {
            if (e.target.checked) {
                setJob({
                    ...job,
                    benefit: [...(job.benefit || []), "MEAL_CARD"]
                });
            } else {
                setJob({
                    ...job,
                    benefit: (job.benefit || []).filter(
                        mode => mode !== "MEAL_CARD"
                    )
                });
            }
        }}
    />
    <label className="form-check-label" htmlFor="MEAL_CARD">
        MEAL_CARD
    </label>
</div>
<br/>

<div className="form-check">
    <input
        className="form-check-input"
        type="checkbox"
        id="FRUIT"
        checked={(job.benefit || []).includes("FRUIT")}
        onChange={(e) => {
            if (e.target.checked) {
                setJob({
                    ...job,
                    benefit: [...(job.benefit || []), "FRUIT"]
                });
            } else {
                setJob({
                    ...job,
                    benefit: (job.benefit || []).filter(
                        mode => mode !== "FRUIT"
                    )
                });
            }
        }}
    />
    <label className="form-check-label" htmlFor="FRUIT">
        FRUIT
    </label>
</div>
<br/>

<div className="form-check">
    <input
        className="form-check-input"
        type="checkbox"
        id="EMPLOYEE_DISCOUNTS"
        checked={(job.benefit || []).includes("EMPLOYEE_DISCOUNTS")}
        onChange={(e) => {
            if (e.target.checked) {
                setJob({
                    ...job,
                    benefit: [...(job.benefit || []), "EMPLOYEE_DISCOUNTS"]
                });
            } else {
                setJob({
                    ...job,
                    benefit: (job.benefit || []).filter(
                        mode => mode !== "EMPLOYEE_DISCOUNTS"
                    )
                });
            }
        }}
    />
    <label className="form-check-label" htmlFor="EMPLOYEE_DISCOUNTS">
        EMPLOYEE_DISCOUNTS
    </label>
</div>
<br/>

<input
    type="text"
    placeholder="about Company"
    value={job.aboutCompany || ""}
    minLength={20}
    maxLength={4000}
    onChange={(e) => setJob({...job, aboutCompany: e.target.value})}
/>
<br/>

<PhoneInput
    defaultCountry="PL"
    value={job.phoneNumber || ""}
    onChange={(value) =>
        setJob({...job, phoneNumber: value ?? null})
    }
/>
<br/>
 <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files[0])}/>
  {job.picture && (
   <img src={`data:${job.pictureContentType};base64,${job.picture}`}  width={"150px"} height={"150px"} alt="empty"/>
  )}

  <button type="submit" className="btn btn-success">Update Job Offer</button>

   </div>
   </form>
    );
}

export default UpdateJob;