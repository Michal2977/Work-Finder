
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";

function CreateJobOfferPage(){

    const [user,setUser] = useState("");
    const [message,setMessage] = useState("");
    const [file,setFile] = useState(null);
    const [data,setData] = useState({position : "",description: "" ,salary : "",location: ""
        ,contractType : [],workSchedule:"",employmentType: ""
        ,jobStart : "" ,workMode : [],duties : "",requirements: "",
        weOffer : "",jobCategory: "",salaryPeriod : "", salaryType : ""
    ,companyName : "",shiftSystem : "",workingHours :"",nightShift: null,aboutCompany : "",
    salarySystem : "",benefit : [],phoneNumber : "",expiresAt : 7});
    
    

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token){
            return;
        }

        fetch("http://localhost:8080/api/create-job",{
            headers : {Authorization : `Bearer ${token}`}
        }).then(response => response.json()).then(user => {setUser(user)
            setData(prev => ({...prev,companyName : user.employerDto?.companyName || "",
                phoneNumber : user?.employerDto?.phoneNumber || ""
            }))
        });
    },[]);


    

    const createJobOffer = async(e) => {
        e.preventDefault();
      
        const token = localStorage.getItem("token");


        const request = {
    ...data,
    description: data.description || null,
    workSchedule: data.workSchedule || null,
    duties: data.duties || null,
    requirements: data.requirements || null,
    weOffer: data.weOffer || null,
    shiftSystem: data.shiftSystem || null,
    workingHours: data.workingHours || null,
    aboutCompany: data.aboutCompany || null,
    salarySystem: data.salarySystem || null,
    phoneNumber: data.phoneNumber || null,
};

        const formData = new FormData();

        formData.append("request",new Blob([
            JSON.stringify(request)
        ],{type : "application/json"}));
        
        if(file){
            formData.append("file",file);
        }

        const response = await fetch("http://localhost:8080/api/create-job",{
            method : "POST",
            headers : {Authorization : `Bearer ${token}`},
            body : formData
        
        });
       
       const text = await response.json();
    
        if(response.ok){
            setMessage(text.message);
            window.scrollTo({top : 0, behavior : "smooth"});
        }else{
            setMessage(text.message)
        }
    }


    return(
        <form onSubmit={createJobOffer}>
        <div>
            {message && <h1>{message}</h1>}

         <input type="text" placeholder="position" value={data.position} required minLength={3} maxLength={50}
         onChange={(e) => setData({...data,position : e.target.value})}/>
         <br/>

         <input type="text" placeholder="company Name" value={data.companyName} required minLength={2} maxLength={100}
         onChange={(e) => setData({...data,companyName : e.target.value })}/>
         <br/>

        <label htmlFor="expirationDays">Expiration:</label>
      <select className="form-select" id="expirationDays" name="expirationDays" value={data.expiresAt}
      onChange={(e) =>setData({ ...data, expiresAt: Number(e.target.value)})}>
    <option value="">Select expiration time</option>
    <option value={7}>7 days</option>
    <option value={14}>14 days</option>
    <option value={30}>30 days</option>
    <option value={60}>60 days</option>
    </select>

         
         <br/>

         <select value={data.jobCategory} onChange={(e) => setData({...data, jobCategory : e.target.value})} required>
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

         <input type="text" placeholder="description" value={data.description} minLength={10} maxLength={5000}
         onChange={(e) => setData({...data,description : e.target.value})}/>
         <br/>

         <input type="number" placeholder="salary" value={data.salary} min={"0"} max={"99999999.99"} step={"0.01"}
         onChange={(e) => setData({...data,salary : e.target.value})}/>
         <br/>

         <select value={data.salaryType} onChange={(e) => setData({...data, salaryType : e.target.value})} required>
          <option value="">Choose Salary Type</option>
          <option value="GROSS">GROSS</option>
          <option value="NET">NET</option>
         </select>

         <select value={data.salaryPeriod} onChange={(e) => setData({...data, salaryPeriod : e.target.value})} required>
          <option value="">Choose Salary Period </option>
          <option value="HOUR">HOUR</option>
          <option value="DAY">DAY</option>
          <option value="WEEK">WEEK</option>
          <option value="MONTH">MONTH</option>
          <option value="YEAR">YEAR</option>
         </select>
         <br/>


         <input type="text" placeholder="salary System" value={data.salarySystem} minLength={5} maxLength={100}
         onChange={(e) => setData({...data,salarySystem : e.target.value })}/>
         <br/>

         <input type="text" placeholder="location" value={data.location} minLength={2} maxLength={40} required
         onChange={(e) => setData({...data,location : e.target.value})}/>
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

        <select value={data.employmentType} onChange={(e) => setData({...data, employmentType : e.target.value})} required>
          <option value="">Choose employment Type</option>
          <option value="FULL_TIME">FULL_TIME</option>
          <option value="PART_TIME">PART_TIME</option>
          <option value="CONTRACT">CONTRACT</option>
          <option value="TEMPORARY">TEMPORARY</option>
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
         <input className="form-check-input" type="checkbox"  id="MANDATE_CONTRACTB2B" checked={data.contractType.includes("MANDATE_CONTRACT")}
         onChange={(e) => {
            if(e.target.checked){
                setData({...data,contractType : [...data.contractType,"MANDATE_CONTRACT"]});
            }else{
                setData({...data,contractType : data.contractType.filter(mode => mode !== "MANDATE_CONTRACT")});
            }
         }}/>
        <label className="form-check-label" htmlFor="MANDATE_CONTRACT">
            MANDATE_CONTRACT
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

        <br/>

        <input type="text" placeholder="work schedule" value={data.workSchedule} minLength={5} maxLength={40}
         onChange={(e) => setData({...data,workSchedule : e.target.value})}/>
         <br/>

        
         <input type="text" placeholder="working Hours " value={data.workingHours} minLength={5} maxLength={40}
         onChange={(e) => setData({...data,workingHours : e.target.value})}/>
         <br/>


           <input type="text" placeholder="shiftSystem" value={data.shiftSystem} minLength={3} maxLength={50}
         onChange={(e) => setData({...data,shiftSystem : e.target.value})}/>
         <br/>

          <p>mozliwosc pracy w godinach nocnych ? </p>
         <div className="form-check">
         <input className="form-check-input" type="radio" id="nightShiftYes" name="nightShift" checked={data.nightShift === true}
         onChange={() => setData({...data,nightShift : true})}/>
        <label className="form-check-label" htmlFor="nightShiftYes">
          Yes
         </label> 
         </div>
         <div className="form-check">
         <input className="form-check-input" type="radio" name="nightShift" id="nightShiftNo" checked={data.nightShift === false}
         onChange={() => setData({...data,nightShift : false})}/>
         <label className="form-check-label" htmlFor="nightShiftNo">
         No
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

         <input type="text" placeholder="duties" value={data.duties} minLength={10} maxLength={5000}
         onChange={(e) => setData({...data,duties : e.target.value})}/>
         <br/>

         <input type="text" placeholder="requirements" value={data.requirements} minLength={10} maxLength={5000}
         onChange={(e) => setData({...data,requirements : e.target.value})}/>
         <br/>

          <input type="text" placeholder="we Offer" value={data.weOffer} minLength={10} maxLength={5000}
         onChange={(e) => setData({...data,weOffer : e.target.value})}/>
         <br/>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="PRIVATE_MEDICAL_CARE" checked={data.benefit.includes("PRIVATE_MEDICAL_CARE")}
            onChange={(e) => {
                if(e.target.checked){
                    setData({...data,benefit : [...data.benefit,"PRIVATE_MEDICAL_CARE"]});
                }else{
                    setData({...data,benefit : data.benefit.filter(mode => mode !== "PRIVATE_MEDICAL_CARE")});
                }
           
            }}/>
                 <label className="form-check-label" htmlFor="PRIVATE_MEDICAL_CARE"> PRIVATE_MEDICAL_CARE</label>
          </div>
         <br/>
           <div className="form-check">
            <input className="form-check-input" type="checkbox" id="MULTISPORT" checked={data.benefit.includes("MULTISPORT")}
            onChange={(e) => {
                if(e.target.checked){
                    setData({...data,benefit : [...data.benefit,"MULTISPORT"]});
                }else{
                    setData({...data,benefit : data.benefit.filter(mode => mode !== "MULTISPORT")});
                }
           
            }}/>
                 <label className="form-check-label" htmlFor="MULTISPORT"> PRIVATE_MEDICAL_CARE</label>
          </div>
         <br/>
               <div className="form-check">
            <input className="form-check-input" type="checkbox" id="LIFE_INSURANCE" checked={data.benefit.includes("LIFE_INSURANCE")}
            onChange={(e) => {
                if(e.target.checked){
                    setData({...data,benefit : [...data.benefit,"LIFE_INSURANCE"]});
                }else{
                    setData({...data,benefit : data.benefit.filter(mode => mode !== "LIFE_INSURANCE")});
                }
           
            }}/>
                 <label className="form-check-label" htmlFor="LIFE_INSURANCE"> LIFE_INSURANCE</label>
          </div>
         <br/>
               <div className="form-check">
            <input className="form-check-input" type="checkbox" id="REMOTE_WORK" checked={data.benefit.includes("REMOTE_WORK")}
            onChange={(e) => {
                if(e.target.checked){
                    setData({...data,benefit : [...data.benefit,"REMOTE_WORK"]});
                }else{
                    setData({...data,benefit : data.benefit.filter(mode => mode !== "REMOTE_WORK")});
                }
           
            }}/>
                 <label className="form-check-label" htmlFor="REMOTE_WORK"> REMOTE_WORK</label>
          </div>
         <br/>
                <div className="form-check">
            <input className="form-check-input" type="checkbox" id="FLEXIBLE_HOURS" checked={data.benefit.includes("FLEXIBLE_HOURS")}
            onChange={(e) => {
                if(e.target.checked){
                    setData({...data,benefit : [...data.benefit,"FLEXIBLE_HOURS"]});
                }else{
                    setData({...data,benefit : data.benefit.filter(mode => mode !== "FLEXIBLE_HOURS")});
                }
           
            }}/>
                 <label className="form-check-label" htmlFor="FLEXIBLE_HOURS"> FLEXIBLE_HOURS</label>
          </div>
         <br/>
                  <div className="form-check">
            <input className="form-check-input" type="checkbox" id="TRAINING" checked={data.benefit.includes("TRAINING")}
            onChange={(e) => {
                if(e.target.checked){
                    setData({...data,benefit : [...data.benefit,"TRAINING"]});
                }else{
                    setData({...data,benefit : data.benefit.filter(mode => mode !== "TRAINING")});
                }
           
            }}/>
                 <label className="form-check-label" htmlFor="TRAINING"> TRAINING</label>
          </div>
         <br/>
                   <div className="form-check">
            <input className="form-check-input" type="checkbox" id="COMPANY_CAR" checked={data.benefit.includes("COMPANY_CAR")}
            onChange={(e) => {
                if(e.target.checked){
                    setData({...data,benefit : [...data.benefit,"COMPANY_CAR"]});
                }else{
                    setData({...data,benefit : data.benefit.filter(mode => mode !== "COMPANY_CAR")});
                }
           
            }}/>
                 <label className="form-check-label" htmlFor="COMPANY_CAR"> COMPANY_CAR</label>
          </div>
         <br/>
                      
            <div className="form-check">
            <input className="form-check-input" type="checkbox" id="MEAL_CARD" checked={data.benefit.includes("MEAL_CARD")}
            onChange={(e) => {
                if(e.target.checked){
                    setData({...data,benefit : [...data.benefit,"MEAL_CARD"]});
                }else{
                    setData({...data,benefit : data.benefit.filter(mode => mode !== "MEAL_CARD")});
                }
           
            }}/>
                 <label className="form-check-label" htmlFor="MEAL_CARD"> MEAL_CARD</label>
          </div>
         <br/>
           <div className="form-check">
            <input className="form-check-input" type="checkbox" id="FRUIT" checked={data.benefit.includes("FRUIT")}
            onChange={(e) => {
                if(e.target.checked){
                    setData({...data,benefit : [...data.benefit,"FRUIT"]});
                }else{
                    setData({...data,benefit : data.benefit.filter(mode => mode !== "FRUIT")});
                }
           
            }}/>
                 <label className="form-check-label" htmlFor="FRUIT"> FRUIT</label>
          </div>
         <br/>
             <div className="form-check">
            <input className="form-check-input" type="checkbox" id="EMPLOYEE_DISCOUNTS" checked={data.benefit.includes("EMPLOYEE_DISCOUNTS")}
            onChange={(e) => {
                if(e.target.checked){
                    setData({...data,benefit : [...data.benefit,"EMPLOYEE_DISCOUNTS"]});
                }else{
                    setData({...data,benefit : data.benefit.filter(mode => mode !== "EMPLOYEE_DISCOUNTS")});
                }
           
            }}/>
                 <label className="form-check-label" htmlFor="EMPLOYEE_DISCOUNTS"> EMPLOYEE_DISCOUNTS</label>
          </div>
         <br/>

          <input type="text" placeholder="about Company" value={data.aboutCompany} minLength={20} maxLength={4000}
         onChange={(e) => setData({...data,aboutCompany : e.target.value })}/>
         <br/>


         <PhoneInput defaultCountry="PL" value= {data.phoneNumber}
           onChange={(value) => setData({...data,phoneNumber : value ?? null})}/>
         <br/>
 
         
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files[0])}/>
        <br/>
        {file && (
            <img src={URL.createObjectURL(file)} alt="preview" width={"200px"} height={"200px"} />
        )}
         <br/>

       

         <button type="submit" className="btn btn-success" >Create Job Offer</button>
        </div>
        </form>
    );
} 

export default CreateJobOfferPage;

  
   