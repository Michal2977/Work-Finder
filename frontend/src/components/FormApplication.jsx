import { useEffect, useRef, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";


function FormApplication(){

   

    const [application,setApplication] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [applicationAnswer,setApplicationAnswer] = useState([]);
    const [selectedFile,setSelectedFile] = useState(null);
    const [selectedCv , setSeletedCv] = useState(localStorage.getItem("selectedCv") || "")
    const {id} = useParams();
    const [message,setMessage] = useState("");
    const [user,setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){return;}

       fetch(`http://localhost:8080/api/jobs/form-application/${id}`,{
        headers : {Authorization : `Bearer ${token}`}
       }).then(response => response.json()).then(data => setApplication(data));
    },[id]);

    useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){return;}

    fetch("http://localhost:8080/api/auth/account-information",{
      headers : {Authorization : `Bearer ${token}`}
    }).then(response => response.json()).then(data => setUser(data));
    },[]);

    const selectedCvObject = user?.employeeDto?.employeeCvDto?.find(
      cv => cv.id === Number(selectedCv)
    );

    const sendApplication = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    const file = selectedFile || (() => {
        const byteCharacters = atob(selectedCvObject.cvFile);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        return new File(
            [byteArray],
            selectedCvObject.cvFileName,
            { type: "application/pdf" }
        );
    })();

    const formData = new FormData();

    const answers = [];

    application?.applicationField?.forEach((field, index) => {
        answers.push(applicationAnswer[`field-${index}`]);
    });

    application?.question?.forEach((question, index) => {
        answers.push(applicationAnswer[`question-${index}`]);
    });

    const request = {
        applicationId: application.id,
        answer: answers,
        sendCvName: selectedFile
            ? selectedFile.name
            : selectedCvObject.cvFileName
    };

    formData.append(
        "request",
        new Blob(
            [JSON.stringify(request)],
            { type: "application/json" }
        )
    );

    formData.append("file", file);

    const response = await fetch(
        "http://localhost:8080/api/jobs/send-form-application",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        }
    );

    const text = await response.json();

    if (response.ok) {
        navigate("/application-submitted");
    } else {
        setMessage(text.message);
    }
};
  
    const openCv = (base64)=> {
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);

      for(let i=0;i < bytes.length;i++){
        bytes[i] = binary.charCodeAt(i);
      }

      const blob = new Blob([bytes],{type : "application/pdf"});
      const url = URL.createObjectURL(blob);

      window.open(url, "_blank");
    }

     const handleCvChange = (e) => {
      const cvId = e.target.value;
      setSeletedCv(cvId);
      setSelectedFile(null);
      localStorage.setItem("selectedCv",cvId)
     }
    
  
    return(

      
        <div>
         <form onSubmit={sendApplication}>

          <div>
            {message && <h1>{message}</h1>}
            

             <select  value={selectedCv} onChange={(e) => { handleCvChange(e); setSelectedFile(null);  fileInputRef.current.value = "";}} >
            <option value="">Select You'r Resume</option>

             {user?.employeeDto?.employeeCvDto?.map(cv => {
              return(
              <option key={cv.id} value={cv.id}>
                {cv.cvFileName || `CV ${cv.id}`}
              </option>
          )})}
          </select>
   
            <input type="file" ref={fileInputRef} accept=".pdf,application/pdf" onChange={(e) => { setSelectedFile(e.target.files[0])
              setSeletedCv(""); localStorage.removeItem("selectedCv");
            }}/>

          {selectedCvObject && (
            <>
            <button onClick={() => openCv(selectedCvObject.cvFile)}>
              {selectedCvObject.cvFileName ? `Preview ${selectedCvObject.cvFileName}` : "Preview Cv"}
            </button>
          
            </>
          )} 
           
          </div>


           {application?.applicationField?.map((field,index) => (
            <div key={index}>
              {field === "EXPECTED_SALARY" && (
                <select value={applicationAnswer[`field-${index}`] || ""}
                 onChange={(e) => {
                  setApplicationAnswer({...applicationAnswer,[`field-${index}`] : e.target.value})
                 }} required>
                <option value="">Select your expected salary</option>
                <option value="BELOW_5000">Below  5000</option>
                <option value="FROM_5000_TO_10000">5000 - 10000</option>
                <option value="FROM_10000_TO_15000">10000 - 15000</option>
                <option value="ABOVE_15000">Above 15000</option>
                </select>
              ) }
              {field === "EXPERIENCE" && (
               <select value={applicationAnswer[`field-${index}`] || ""}
                 onChange={(e) => {
                  setApplicationAnswer({...applicationAnswer,[`field-${index}`] : e.target.value})
                 }} required>
                <option value="">Select your experience</option>
                <option value="NO_EXPERIENCE">NO EXPERIENCE</option>
                <option value="LESS_THAN_ONE_YEAR">LESS THAN ONE YEAR</option>
                <option value="ONE_TO_TWO_YEARS">ONE TO TWO YEARS</option>
                <option value="THREE_TO_FIVE_YEARS">THREE TO FIVE YEARS</option>
                 <option value="MORE_THAN_FIVE_YEARS">MORE THAN FIVE YEARS</option>
                </select>
              )}
            {field === "AVAILABILITY" && (
                <select value={applicationAnswer[`field-${index}`] || ""}
                 onChange={(e) => {
                  setApplicationAnswer({...applicationAnswer,[`field-${index}`] : e.target.value})
                 }} required>
                <option value="">Select your availability</option>
                <option value="IMMEDIATELY">IMMEDIATELY</option>
                <option value="WITHIN_ONE_WEEK">WITHIN ONE WEEK</option>
                <option value="WITHIN_TWO_WEEKS">WITHIN TWO WEEKSS</option>
                <option value="WITHIN_ONE_MONTH">WITHIN ONE MONTH</option>
                 <option value="MORE_THAN_ONE_MONTH">MORE THAN ONE MONTH</option>
                </select>
              )}
            </div>
           ))}
 {application?.question?.map((question, index) => (
    <div key={index}>
        <label>{question}</label>
        <br />
        <input
            type="text"
            value={applicationAnswer[`question-${index}`] || ""}
            required
            minLength={5}
            maxLength={255}
            onChange={(e) => {
                setApplicationAnswer({
                    ...applicationAnswer,
                    [`question-${index}`]: e.target.value
                });
            }}
        />
    </div>
))}
          <button type="submit" className="btn btn-success" >Send Application</button>
          </form>
        </div>
    );
}



export default FormApplication;
